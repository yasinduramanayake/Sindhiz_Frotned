<template>
  <div class="animated fadeIn">
    <b-card>
      <b-form
        v-on:submit.prevent="onSubmit"
        v-on:reset.prevent="onReset"
        novalidate
      >
        <b-row>
          <b-col sm="6">
            <b-form-group
              label="Transaction Type"
              :state="chkState('transtypes')"
            >
              <transaction-type-select
                multiple
                v-model="$v.form.transtypes.$model"
                @loaded="preselectTransactionTypes"
              ></transaction-type-select>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="Delivery Type"
              :state="chkState('deliveryTypes')"
            >
              <delivery-type-select
                multiple
                v-model="$v.form.deliveryTypes.$model"
                @loaded="preselectDeliveryTypes"
              ></delivery-type-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <b-form-group label="From" :state="chkState('fromDate')">
              <v-date-picker
                v-model="$v.form.fromDate.$model"
                :input-props="{ class: 'form-control' }"
                show-caps
              >
              </v-date-picker>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="To" :state="chkState('toDate')">
              <v-date-picker
                v-model="$v.form.toDate.$model"
                :input-props="{ class: 'form-control' }"
                show-caps
              >
              </v-date-picker>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="">
            <b-btn type="submit" variant="success" :disabled="$v.form.$invalid"
              >Submit</b-btn
            >
          </b-col>
        </b-row>
      </b-form>
    </b-card>

    <b-card header="Sales Purchase" v-if="reportData">
      <grid-buttons
        :gridOptions="gridOptions"
        :exportParams="exportParams"
      />
      <ag-grid-vue
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="reportData"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady"
      >
      </ag-grid-vue>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import { required } from "vuelidate/lib/validators";
import {AgGridVue} from "ag-grid-vue"
import GridButtons from '../GridButtons';

const formShape = {
  transtypes: [],
  deliveryTypes: [],
  fromDate: new Date(),
  toDate: new Date()
};

export default {
  name: "SalePurchaseByFamilyReport",
  components: {
    AgGridVue,
    GridButtons
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    }
  },
  data: function() {
    return {
      form: Object.assign({}, formShape),
      reportData: null,
      reportDataEx: null,
      gridOptions: {
        context: {
          componentParent: this
        },
        defaultColDef: {
          sortable: true,
          resizable: true
        },
        columnDefs: [
          {headerName: 'Sub Category', field: 'subcatName', filter: 'agTextColumnFilter', minWidth: 120},
          {headerName: 'Total Purchase Count', field: 'totalPurchaseCount', filter: 'agTextColumnFilter', minWidth: 120},
          {headerName: 'Total Purchase Sticks', field: 'totalPurchaseSticks', filter: 'agTextColumnFilter', minWidth: 120},
          {headerName: 'Total Sale Count', field: 'totalSaleCount', filter: 'agTextColumnFilter', minWidth: 120},
          {headerName: 'Total Sale Sticks', field: 'totalSaleSticks', filter: 'agTextColumnFilter', minWidth: 120},
          {headerName: 'Store', field: 'storeName', filter: 'agTextColumnFilter', minWidth: 120},
          {headerName: 'Supplier Name', field: 'supplierName', filter: 'agTextColumnFilter', minWidth: 120}
        ]
      }
    };
  },
  validations: {
    form: {
      transtypes: {
        required
      },
      deliveryTypes: {
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
    exportParams() {
      let fromDate = this.$moment(this.form.fromDate).format('YYYY-MM-DD')
      let toDate = this.$moment(this.form.toDate).format('YYYY-MM-DD')
      return {
        'fileName': 'MerchantPulse_SalesPurchaseByFamilyReport_'+fromDate+'_'+toDate,
        'columnKeys': ['subcatName', 'totalPurchaseCount', 'totalPurchaseSticks', 'totalSaleCount', 'totalSaleSticks', 'storeName', 'supplierName']
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    preselectTransactionTypes(list) {
      this.form.transtypes = list;
    },
    preselectDeliveryTypes(list) {
      this.form.deliveryTypes = list;
    },
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.salesOverview = null;
          let params = {
            transTypeIds: this._.map(
              this.$v.form.transtypes.$model,
              transtype => transtype.value
            ),
            deliveryTypeIds: this._.map(
              this.$v.form.deliveryTypes.$model,
              deliveryType => deliveryType.value
            ),
            fromDate: this.formatDate(this.$v.form.fromDate.$model),
            toDate: this.formatDate(this.$v.form.toDate.$model)
          };
          Vue.axios
            .post("/getSalesPurchaseByFamilyReport", params)
            .then(response => {
              this.reportData = response.data;
              this.showSuccessMsg();
            })
            .catch(() => {
              this.showErrorMsg();
            });
        });
      }
    },
    onReset() {
      this.form = formShape;
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    chkState(val) {
      const field = this.$v.form[val];
      return field.$dirty ? !field.$invalid : null;
    },
    findFirstError(component = this) {
      if (component.state === false) {
        if (component.$refs.input) {
          component.$refs.input.focus();
          return true;
        }
        if (component.$refs.check) {
          component.$refs.check.focus();
          return true;
        }
      }
      let focused = false;
      component.$children.some(child => {
        focused = this.findFirstError(child);
        return focused;
      });

      return focused;
    },
    validate() {
      this.$v.$touch();
      this.$nextTick(() => this.findFirstError());
      return this.isValid;
    }
  },
  created() {
  }
};
</script>
