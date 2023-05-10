<template>
  <div class="animated fadeIn">
    <b-card>
      <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
        <b-row>
          <b-col sm="4">
            <b-form-group label="Transaction Type" :state="chkState('transtypes')" >
              <v-select :options="transtypeList" multiple v-model="$v.form.transtypes.$model" placeholder="Select Transaction Type"></v-select>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group label="Report By" :state="chkState('reportType')" >
              <v-select :options="reportTypeList" v-model="$v.form.reportType.$model" placeholder="Select Report Type"></v-select>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group label="Year" :state="chkState('year')" >
              <v-select :options="yearList" v-model="$v.form.year.$model" placeholder="Select Year" :disabled="form.reportType == 'Yearly'"></v-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="">
            <b-btn type="submit" variant="success" :disabled="$v.form.$invalid">Submit</b-btn>
          </b-col>
        </b-row>
      </b-form>
    </b-card>

    <b-card v-if="salesOverview">
      <sales-overview-table :data="salesOverview"></sales-overview-table>
    </b-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { required } from "vuelidate/lib/validators"
  import SalesOverviewTable from './SalesOverviewTable'

  const formShape = {
    transtypes: [],
    reportType: null,
    year: null,
    category: null
  }

  export default {
    name: 'ReportSalePurchaseOverview',
    components: {
      SalesOverviewTable
    },
    computed: {
      isValid() { return !this.$v.form.$anyError },
      isDirty() { return this.$v.form.$anyDirty },
      yearList() {
        var list = []
        for (var i=2018; i<=Vue.moment().year(); i++) {
          list.push(i.toString())
        }
        return list
      },
      ... mapState({
        transtypes: state => state.transtypes.all
      })
    },
    watch: {
      transtypes: function(values) {
        this.transtypeList = []
        Vue._.forEach(values, (transtype) => {
          this.transtypeList.push({label: transtype.transtypename, value: transtype.transtypeid})
        });
      }
    },
    data: function () {
      return {
        form: Object.assign({}, formShape),
        transtypeList: [],
        reportTypeList: ['Weekly', 'Monthly', 'Yearly'],
        salesOverview: null,
      }
    },
    validations: {
      form: {
        transtypes: {
          required
        },
        reportType: {
          required
        },
        year: {},
      }
    },
    methods: {
      onSubmit() {
        if (this.validate()) {
          this.$nextTick(() => {
            this.salesOverview = null
            let params = {
              transTypeIds: _.map(this.$v.form.transtypes.$model, transtype => transtype.value),
              reportType: this.$v.form.reportType.$model,
              year: this.$v.form.year.$model,
            }
            Vue.axios.post('/salesOverview', params)
              .then(response => {
                this.salesOverview = response.data
                this.showSuccessMsg()
              })
              .catch(() => {
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
    created () {
      this.$store.dispatch('transtypes/getTranstypes')
    }
  }
</script>
