<template>
  <div class="animated fadeIn">
    <b-card v-if="payrollData">
      <b-row>
        <b-col>
          <grid-buttons
            :gridOptions="gridOptions"
            :exportParams="exportParams"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <ag-grid-vue
            class="ag-theme-balham"
            :gridOptions="gridOptions"
            :rowData="payrollData"
            :pagination="true"
            :paginationPageSize="20"
            :floatingFilter="true"
            :suppressNoRowsOverlay="true"
            @gridReady="gridReady"
          ></ag-grid-vue>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import GridButtons from "../GridButtons";

export default {
  name: "PayrollDetail",
  props: {
    payroll: Object
  },
  components: {
    AgGridVue,
    GridButtons
  },
  data: function() {
    return {
      payrollData: null,
      selectedStaffCloseCash: null,
      viewDetailTitle: null,
      gridOptions: {
        context: {
          componentParent: this
        },
        defaultColDef: {
          sortable: true,
          resizable: true
        },
        columnDefs: [
          {
            headerName: "Staff Name",
            field: "staffname",
            filter: "agTextColumnFilter",
            minWidth: 120
          },
          {
            headerName: "Store Name",
            field: "storename",
            filter: "agTextColumnFilter",
            minWidth: 120
          },
          {
            headerName: "Regular Hrs",
            field: "regular_hours",
            minWidth: 100
          },
          {
            headerName: "Saturday Hrs",
            field: "sat_hours",
            minWidth: 100
          },
          {
            headerName: "Sunday Hrs",
            field: "sun_hours",
            minWidth: 100
          },
          {
            headerName: "PH Hrs",
            field: "ph_hours",
            minWidth: 100
          },
          {
            headerName: "Total Amount",
            field: "total_amount",
            minWidth: 100
          },
          {
            headerName: "Total Super",
            field: "total_super",
            minWidth: 100
          }
        ]
      }
    };
  },
  methods: {
    exportParams() {
      return {
        fileName: "MerchantPulse_PayrollDetails_" + this.payroll.payrollid,
        columnKeys: [
          "staffname",
          "storename",
          "regular_hours",
          "sat_hours",
          "sun_hours",
          "ph_hours",
          "total_amount",
          "total_super"
        ]
      };
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    }
  },
  created() {
    Vue.axios
      .get("payroll/getPayroll/" + this.payroll.payrollid)
      .then(response => {
        this.showSuccessMsg();
        this.payrollData = response.data;
      })
      .catch(error => {
        if (error.response.status == 400) {
          this.showErrorMsg({
            message: error.response.data.message
          });
        } else {
          this.showErrorMsg();
        }
      });
  }
};
</script>
