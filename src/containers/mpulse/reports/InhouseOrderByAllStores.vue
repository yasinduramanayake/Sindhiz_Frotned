<template>
<div class="animated fadeIn">
  <b-card>
    <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
      <b-row>
        <b-col>
          <b-form-group label="Store" label-cols-sm="4" label-cols-lg="2">
            <store-select v-model="$v.form.selectedStores.$model" multiple onlyStaff></store-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col >
          <b-form-group label="From" :state="chkState('fromDate')">
            <v-date-picker v-model="$v.form.fromDate.$model" :input-props='{ class: "form-control" }' show-caps>
            </v-date-picker>
          </b-form-group>
        </b-col>
        <b-col >
          <b-form-group label="To" :state="chkState('toDate')">
            <v-date-picker v-model="$v.form.toDate.$model" :input-props='{ class: "form-control" }' show-caps>
            </v-date-picker>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Extra by Percent" :state="chkState('extraPercent')">
              <v-select :options="percentOPtions" v-model="$v.form.extraPercent.$model" placeholder="Select Percentage"></v-select>
            </b-form-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-checkbox @change="selectAllStores" class="pull-right mr-2 mt-2">
            Select All Stores
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-btn type="submit" variant="success" :disabled="$v.form.$invalid">Submit</b-btn>
        </b-col>
      </b-row>
    </b-form>
  </b-card>

  <b-card v-if="storeOrders!=null && storeOrders.length > 0">
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="storeOrders" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
</div>
</template>

<script>
import Vue from 'vue'
import {
  AgGridVue
} from "ag-grid-vue";
import GridButtons from '../GridButtons'
import {
  mapState,
  mapActions
} from 'vuex'
import {
  required, requiredIf
} from "vuelidate/lib/validators"
import {
  setupCalendar,
  DatePicker
} from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
const formShape = {
  fromDate: Vue.moment().subtract(7, 'd').toDate(),
  toDate: new Date(),
  extraPercent: {"label": "30%", "value":130},
  selectedStores: null
}

export default {
  name: 'InhouseOrderByAllStores',
  components: {
    AgGridVue,
    GridButtons,
    'v-date-picker': DatePicker
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
    percentOPtions() {
      let list = []

      list.push({
          label: '30%',
          value: 130
        })
        list.push({
            label: '40%',
            value: 140
          })
          list.push({
              label: '50%',
              value: 150
            })
            list.push({
                label: '60%',
                value: 160
              })
              list.push({
                  label: '70%',
                  value: 170
                })
                list.push({
                    label: '80%',
                    value: 180
                  })
                  list.push({
                      label: '90%',
                      value: 190
                    })
                    list.push({
                        label: '100%',
                        value: 200
                      })

      return list
    },
  },
  data: function() {
    return {
      submitted: false,
      limitSelection: 5,
      form: Object.assign({}, formShape),
      storeOrders: null,
      gridOptions: {
        context: {
          componentParent: this
        },
        defaultColDef: {
          sortable: true,
          resizable: true,
          filter: 'agTextColumnFilter'
        },
        columnDefs: [
          {
            headerName: 'Barcode',
            field: 'barcode',
            minWidth: 50
          },
          {
            headerName: 'Product',
            field: 'productname',
            minWidth: 100
          },
          {
            headerName: 'Sale',
            field: 'avgsale',
            minWidth: 120
          },
          {
            headerName: 'Extra',
            field: 'extraPercent',
            minWidth: 80
          },
          {
            headerName: 'Total',
            field: 'total',
            minWidth: 80
          },
          {
            headerName: 'Supplier',
            field: 'supplier',
            minWidth: 80
          },
          {
            headerName: 'Category',
            field: 'cat',
            minWidth: 80
          },
        ],
      },
    }
  },
  validations: {
    form: {
      fromDate: {
        required
      },
      toDate: {
        required
      },
      extraPercent: {
        required
      },
      selectedStores:{
        required
      }
    }
  },
  methods: {
    selectAllStores(value) {
      this.form.selectedStores = value ? Vue._.map(this.$store.state.stores.all, (store) => {
        return {
          label: store.storename,
          value: store.storeid
        }
      }) : []
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    exportParams() {
      return {
        fileName:
          "MerchantPulse_InhouseOrderAllStores_" +
          this.form.fromDate +
          "_" +
          this.form.toDate,
        columnKeys: ["barcode", 'productname', "avgsale", "extraPercent","total","supplier","cat"],
      };
    },
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {

          this.storeOrders = null

          let params = {
            startDate: this.$moment(this.$v.form.fromDate.$model).format('YYYY-MM-DD'),
            endDate: this.$moment(this.$v.form.toDate.$model).format('YYYY-MM-DD'),
            extraPercent: this.$v.form.extraPercent.$model.value,
            stores: _.map(this.form.selectedStores, (store) => { return store.value}),
          }
          Vue.axios.post('/inhouseOrderByAllStores', params)
            .then((response) => {
              this.storeOrders = response.data
              if (this.storeOrders.length > 0) {
                this.showSuccessMsg()
              } else {

                this.showInfoMsg({message: "No data found"})
              }

            })
            .catch((error) => {
              this.showErrorMsg()
            })
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
  }
}
</script>
