<template>
<div class="animated fadeIn">
  <b-card>
    <v-client-table :columns="columns" :data="comparingData" :options="options" :theme="theme" id="dataTable">
      <b-form-input :ref="'amount'+props.index" :key="props.row.subcat" slot="amount" slot-scope="props" :value="promoAmounts[props.row.subcat]" v-model="promoAmounts[props.row.subcat]" size="sm" class="col-xs-2" ></b-form-input>
      <b-form-input :ref="'ctnAmount'+props.index" :key="props.row.subcat" slot="ctnAmount" slot-scope="props" :value="promoCtnAmounts[props.row.subcat]" v-model="promoCtnAmounts[props.row.subcat]" size="sm" class="col-xs-2" ></b-form-input>
    </v-client-table>
  </b-card>

  <b-card>
    <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
      <b-row>
        <b-col sm="12">
          <b-form-group label="Store" label-for="store" :state="chkState('stores')">
            <v-select :options="storeList" v-model="$v.form.stores.$model" multiple placeholder="Select Stores"></v-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <b-form-group label="Start Date" :state="chkState('startDate')">
            <v-date-picker
              v-model="$v.form.startDate.$model"
              :input-props='{ class: "form-control" }'
              show-caps>
            </v-date-picker>
            <b-form-invalid-feedback id="liveFeedbackStartDate">
              This is a required fieldcheckSotre
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="End Date" label-for="endDate" :state="chkState('endDate')">
            <v-date-picker
              v-model="$v.form.endDate.$model"
              :input-props='{ class: "form-control" }'
              show-caps>
            </v-date-picker>
            <b-form-invalid-feedback id="liveFeedbackEndDate">
              This is a required fieldcheckSotre
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="4">
          <b-btn type="submit" variant="success" :disabled="$v.form.$invalid">Submit Bulk Promotions</b-btn>
        </b-col>
      </b-row>
    </b-form>
  </b-card>

</div>
</template>

<script>
import Vue from 'vue'
import {
  mapState,
  mapActions
} from 'vuex'
import {
  required
} from "vuelidate/lib/validators"
import {ClientTable, Event} from 'vue-tables-2'
Vue.use(ClientTable)

const formShape = {
  stores: null,
  startDate: new Date(),
  endDate: new Date()
}

export default {
  name: 'BulkPromotionsForm',
  props: {
    comparingData: Array
  },
  data: function() {
    return {
      promoAmounts: {},
      promoCtnAmounts: {},
      form: Object.assign({}, formShape),
      columns: ['subcat', 'subcat_name', 'mpls_carton_price', 'sp_carton_price', 'mpls_packet_price', 'sp_packet_price', 'ctnAmount', 'amount'],
      options: {
        headings: {
          subcat: 'Subcat',
          subcat_name: 'Subcat Name',
          mpls_carton_price: 'Competitor Ctn Price',
          sp_carton_price: 'Store Ctn Price',
          mpls_packet_price: 'Competitor Pkt Price',
          sp_packet_price: 'Store Pkt Price',
          ctnAmount: 'Crtn Promo ',
          amount: ' Pkt Promo',
        },
        sortable: [],
        filterable: [],
        sortIcon: { base:'fa', up:'fa-sort-asc', down:'fa-sort-desc', is:'fa-sort' },
        pagination: {
          chunk: 5,
          edge: true,
          nav: 'scroll'
        },
        uniqueKey: "productid"
      },
      theme: 'bootstrap4',
    }
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
    storeList() {
      let list = []
      Vue._.forEach(this.$store.state.stores.all, (store) => {
        list.push({
          label: store.storename,
          value: store.storeid
        })
      })
      return list
    }
  },
  validations: {
    form: {
      stores: {
        required
      },
      startDate: {
        required
      },
      endDate: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          let promos = []
          _.forOwn(this.promoAmounts, (value, key) => {
            if (value != 0 || this.promoCtnAmounts[key] != 0) {
              promos.push({subcat: key, amount: value, ctnAmount: this.promoCtnAmounts[key]})
            }
          });
          if (promos.length == 0) {
            this.showWarnMsg({message: 'Nothing to submit'})
          } else {
            let params = {
              startDate: this.$moment(this.$v.form.startDate.$model).format('YYYY-MM-DD'),
              endDate: this.$moment(this.$v.form.endDate.$model).format('YYYY-MM-DD'),
              stores: _.map(this.$v.form.stores.$model, (store) => { return store.value }),
              promos: promos
            }

            Vue.axios.post('/addBulkPromotions', params)
              .then((response) => {
                this.$emit('success')
                this.showSuccessMsg({type: 'success', message: response.data.message})
              })
              .catch((error) => {
                console.log(error)
                this.showErrorMsg()
              })
          }
        })
      }
    },
    onReset() {
      this.form = formShape
      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    chkState(val) {
      const field = this.$v.form[val]
      return field.$dirty ? !field.$invalid : null
    },
    findFirstError(component = this) {
      if (component.state === false) {
        if (component.$refs.input) {
          component.$refs.input.focus()
          return true
        }
        if (component.$refs.check) {
          component.$refs.check.focus()
          return true
        }
      }
      let focused = false
      component.$children.some((child) => {
        focused = this.findFirstError(child)
        return focused
      })

      return focused
    },
    validate() {
      this.$v.$touch()
      this.$nextTick(() => this.findFirstError())
      return this.isValid
    }
  },
  created() {
    this.form.endDate = this.$moment().add('6', 'd').toDate()
    Vue._.forEach(this.comparingData, (item) => {
      this.promoAmounts[item.subcat] = item.promo_pkt
      this.promoCtnAmounts[item.subcat] = item.promo_ctn
    });
  }
}
</script>
