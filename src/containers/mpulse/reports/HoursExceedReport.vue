<template>
<div class="animated fadeIn">
  <b-card>
    <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
      <b-row>
        <b-col>
          <b-form-group label="Store" label-for="store" :state="chkState('store')">
            <v-select :options="storeList" :disabled="form.allStores == true" v-model="$v.form.store.$model" placeholder="Select Store"></v-select>
          </b-form-group>
          <b-form-group :state="chkState('allStores')">
            <b-form-checkbox @change="toggleStores" id="allStores" v-model.lazy.trim="$v.form.allStores.$model" :unchecked-value="false">
              All Stores
            </b-form-checkbox>
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
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-btn type="submit" variant="success" :disabled="$v.form.$invalid">Submit</b-btn>
        </b-col>
      </b-row>
    </b-form>
  </b-card>

  <b-card v-if="hoursExceedStores!=null && hoursExceedStores.length > 0">
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="hoursExceedStores" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
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
  required, requiredIf
} from "vuelidate/lib/validators"
import {
  setupCalendar,
  DatePicker
} from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
const formShape = {
  store: null,
  fromDate: Vue.moment().subtract(7, 'd').toDate(),
  toDate: new Date(),
  allStores: false
}

export default {
  name: 'hoursExceedStores',
  components: {
    AgGridVue,
    'v-date-picker': DatePicker
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
    },
  },
  data: function() {
    return {
      submitted: false,
      limitSelection: 5,
      form: Object.assign({}, formShape),
      hoursExceedStores: null,
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
            headerName: 'Shift Date',
            field: 'shiftDate',
            minWidth: 100
          },
          {
            headerName: 'Store Name',
            field: 'storename',
            minWidth: 120
          },
          {
            headerName: 'Store Hours',
            field: 'expected_hours',
            minWidth: 80
          },
          {
            headerName: 'Recorded Hours',
            field: 'recorded_hours',
            minWidth: 80
          },
          {
            headerName: 'Hours Difference',
            field: 'difference',
            minWidth: 80
          },



        ],
      },
    }
  },
  validations: {
    form: {
      store: {
        required: requiredIf(function() {
               return this.form.allStores == false;
           })
      },
      allStores: {
        required: requiredIf(function() {
               return this.form.store == null;
           })
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
    toggleStores(){
      if(this.form.allStores == true){
        this.form.store = null;
      }


    },
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {

          this.hoursExceedStores = null

          let params = {
            startDate: this.$moment(this.$v.form.fromDate.$model).format('YYYY-MM-DD'),
            endDate: this.$moment(this.$v.form.toDate.$model).format('YYYY-MM-DD')
          }
          if(this.form.store != null){
            params['storeId'] = this.form.store.value;
          }
          else{
            params['allStores'] = true;
          }

          Vue.axios.post('/hoursExceedReport', params)
            .then((response) => {
              this.hoursExceedStores = response.data.data
              if (this.hoursExceedStores.length > 0) {
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
    this.$store.dispatch('stores/getStores')
  }
}
</script>
