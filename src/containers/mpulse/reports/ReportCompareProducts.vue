<template>
<div class="animated fadeIn">
  <b-card>
    <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
      <b-row>
        <b-col sm="12">
          <b-form-group label="Sub Categories" label-for="subCategories" :state="chkState('subCategories')">
            <v-select :options="$v.form.subCategories.$model.length < limitSelection ? subcatList: []" multiple v-model="$v.form.subCategories.$model" placeholder="Select Sub Categories"></v-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <b-form-group label="Store" label-for="store" :state="chkState('store')">
            <v-select :options="storeList" v-model="$v.form.store.$model" placeholder="Select Store"></v-select>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="Transaction Type" label-for="transtype" :state="chkState('transtypes')">
            <v-select :options="transtypeList" multiple v-model="$v.form.transtypes.$model" placeholder="Select Transaction Type"></v-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-form-group label="Date Range">
            <v-select :options="dateOptions" placeholder="Select Date Range" :onChange="changeDateRange"></v-select>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group label="From" :state="chkState('fromDate')">
            <v-date-picker v-model="$v.form.fromDate.$model" :input-props='{ class: "form-control" }' show-caps>
            </v-date-picker>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group label="To" :state="chkState('toDate')">
            <v-date-picker v-model="$v.form.toDate.$model" :input-props='{ class: "form-control" }' show-caps>
            </v-date-picker>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-btn type="submit" variant="success" :disabled="$v.form.$invalid">Submit</b-btn>
        </b-col>
      </b-row>
    </b-form>
  </b-card>

  <b-card v-if="compareProducts">
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="compareProducts" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>

  <b-card desk class="card-columns" v-if="labels.length">
    <b-row>
      <b-col sm="6" offset-sm="3">
        <b-card header="Total Count">
          <div class="chart-wrapper">
            <pie-chart :chartdata="totalCounts" :labels="labels" :colors="colors"></pie-chart>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-card>

</div>
</template>

<script>
import Vue from 'vue'
import {
  AgGridVue
} from "ag-grid-vue";
import {
  mapState,
  mapActions
} from 'vuex'
import {
  required
} from "vuelidate/lib/validators"
import {
  setupCalendar,
  DatePicker
} from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import PieChart from '../../charts/pie-chart'
import VueRandomColor from 'vue-randomcolor'

Vue.use(VueRandomColor)

const formShape = {
  subCategories: [],
  store: null,
  transtypes: [],
  fromDate: Vue.moment().subtract(7, 'd').toDate(),
  toDate: new Date()
}

export default {
  name: 'ReportCompareProducts',
  components: {
    AgGridVue,
    'v-date-picker': DatePicker,
    PieChart
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
    subcatList() {
      let list = []
      Vue._.forEach(this.$store.state.subCategories.global, (subCategory) => {
        list.push({
          label: subCategory.subcat_name,
          value: subCategory.subcatid
        })
      })
      return list
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
    },
    transtypeList() {
      let list = []
      Vue._.forEach(this.$store.state.transtypes.all, (transtype) => {
        list.push({
          label: transtype.transtypename,
          value: transtype.transtypeid
        })
      })
      return list
    }
  },
  data: function() {
    return {
      submitted: false,
      limitSelection: 5,
      dateOptions: [
        'Current Week',
        'Current Month',
        'Current Quarter',
        'Current Year'
      ],
      dateOptionSelected: null,
      form: Object.assign({}, formShape),
      totalCounts: [],
      labels: [],
      colors: [],
      compareProducts: null,
      gridOptions: {
        context: {
          componentParent: this
        },
        defaultColDef: {
          sortable: true,
          resizable: true,
          filter: 'agTextColumnFilter'
        },
        columnDefs: [{
            headerName: 'Subcat Name',
            field: 'subcatName',
            minWidth: 120
          },
          {
            headerName: 'Total Count',
            field: 'totalCount',
            minWidth: 80
          },
          {
            headerName: 'Total Stikcs',
            field: 'totalSticks',
            minWidth: 80
          },
          {
            headerName: 'Count Comparison %',
            field: 'percentCount',
            minWidth: 100
          },
          {
            headerName: 'Sticks Comparison %',
            field: 'percentSticks',
            minWidth: 100
          },
        ],
      },
    }
  },
  validations: {
    form: {
      subCategories: {
        required
      },
      store: {
        required
      },
      transtypes: {
        required
      },
      fromDate: {
        required
      },
      toDate: {
        required
      }
    }
  },
  methods: {
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    changeDateRange(value) {
      switch (value) {
        case 'Current Week':
          this.$v.form.fromDate.$model = this.$moment().startOf('week').toDate()
          this.$v.form.toDate.$model = this.$moment().endOf('week').toDate()
          break
        case 'Current Month':
          this.$v.form.fromDate.$model = this.$moment().startOf('month').toDate()
          this.$v.form.toDate.$model = this.$moment().endOf('month').toDate()
          break
        case 'Current Quarter':
          this.$v.form.fromDate.$model = this.$moment().startOf('quarter').toDate()
          this.$v.form.toDate.$model = this.$moment().endOf('quarter').toDate()
          break
        case 'Current Year':
          this.$v.form.fromDate.$model = this.$moment().startOf('year').toDate()
          this.$v.form.toDate.$model = this.$moment().endOf('year').toDate()
          break
      }
    },
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.labels = []
          this.totalCounts = []
          this.colors = []
          this.compareProducts = null

          let params = {
            subcatIds: _.map(this.$v.form.subCategories.$model, subCategory => subCategory.value),
            transtypeIds: _.map(this.$v.form.transtypes.$model, transtype => transtype.value),
            storeId: this.$v.form.store.$model.value,
            fromDate: this.$moment(this.$v.form.fromDate.$model).format('YYYY-MM-DD'),
            toDate: this.$moment(this.$v.form.toDate.$model).format('YYYY-MM-DD')
          }

          Vue.axios.post('/compareSubCategories', params)
            .then((response) => {
              this.compareProducts = response.data
              var sumCount = 0,
                sumSticks = 0;
              if (this.compareProducts.length > 0) {
                _.forEach(this.compareProducts, (item) => {
                  this.labels.push(item.subcatName)
                  this.totalCounts.push(item.totalCount)
                  this.colors.push(this.$randomColor())
                  sumCount += item.totalCount
                  sumSticks += item.totalSticks
                })

                _.forEach(this.compareProducts, (item) => {
                  item.percentCount = (item.totalCount / sumCount * 100).toFixed(2)
                  item.percentSticks = (item.totalSticks / sumSticks * 100).toFixed(2)
                })

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
    this.$store.dispatch('subCategories/getAllSubCategories')
    this.$store.dispatch('stores/getStores')
    this.$store.dispatch('transtypes/getTranstypes')
  }
}
</script>
