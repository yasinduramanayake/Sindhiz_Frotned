<template>
  <div class="animated fadeIn">
    <b-card>
      <b-row>
        <b-col sm="6">
          <b-form-group label="From">
            <v-date-picker
              v-model="startDate"
              :input-props="{ class: 'form-control' }"
              show-caps
            >
            </v-date-picker>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="To">
            <v-date-picker
              v-model="endDate"
              :input-props="{ class: 'form-control' }"
              show-caps
            >
            </v-date-picker>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-btn
            class="pull-right"
            type="submit"
            variant="success"
            :disabled="!startDate || !endDate"
            @click="runReport"
            >Run Report</b-btn
          >
        </b-col>
      </b-row>
    </b-card>

    <b-card v-if="staffCloseCashData">
      <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="staffCloseCashData"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady"
      >
      </ag-grid-vue>
    </b-card>

    <div>
      <b-modal
        ref="modalViewDetail"
        :title="viewDetailTitle"
        hide-footer
        size="lg"
        @hide="hideViewDetail"
        no-enforce-focus
      >
        <payroll-report-detail
          v-if="selectedStaffCloseCash"
          :staffCloseCash="selectedStaffCloseCash"
          :startDate="startDate"
          :endDate="endDate"
        />
      </b-modal>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import GridButtons from "../GridButtons";
import PayrollReportActions from "./PayrollReportActions";
import PayrollReportDetail from "./PayrollReportDetail";

export default {
  name: "PayrollReport",
  components: {
    AgGridVue,
    GridButtons,
    PayrollReportActions,
    PayrollReportDetail
  },
  data: function() {
    return {
      startDate: this.$moment()
        .subtract(14, "days")
        .toDate(),
      endDate: new Date(),
      staffCloseCashData: null,
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
            headerName: "Regular Hrs",
            field: "wage.regular_hours.hours",
            minWidth: 100
          },
          {
            headerName: "Saturday Hrs",
            field: "wage.sat_hours.hours",
            minWidth: 100
          },
          {
            headerName: "Sunday Hrs",
            field: "wage.sun_hours.hours",
            minWidth: 100
          },
          {
            headerName: "PH Hrs",
            field: "wage.ph_hours.hours",
            minWidth: 100
          },
          {
            headerName: "Total Hrs",
            field: "total.hours",
            minWidth: 100
          },
          {
            headerName: "Total Amount",
            field: "total.amount",
            minWidth: 100
          },
          {
            headerName: "Actions",
            cellRendererFramework: "PayrollReportActions",
            minWidth: 100
          }
        ]
      }
    };
  },
  methods: {
    exportParams() {
      return {
        fileName:
          "MerchantPulse_PayrollReport_" +
          "_" +
          this.$moment(this.startDate).format("YYYY-MM-DD") +
          "_" +
          this.$moment(this.endDate).format("YYYY-MM-DD"),
        columnKeys: [
          "staffname",
          "wage.regular_hours.hours",
          "wage.sat_hours.hours",
          "wage.sun_hours.hours",
          "wage.ph_hours.hours",
          "total.hours",
          "total.amount"
        ]
      };
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    },
    runReport() {
      Vue.axios
        .post("payroll/runReport", {
          startDate: this.$moment(this.startDate).format("YYYY-MM-DD"),
          endDate: this.$moment(this.endDate).format("YYYY-MM-DD")
        })
        .then(response => {
          this.staffCloseCashData = response.data;
          this.showSuccessMsg();
        })
        .catch(error => {
          this.showErrorMsg();
        });
    },
    showDetailModal(staffCloseCash) {
      this.selectedStaffCloseCash = staffCloseCash;
      this.viewDetailTitle = "Payroll report of " + staffCloseCash.staffname;
      this.$refs.modalViewDetail.show();
    },
    hideViewDetail() {
      this.selectedStaffCloseCash = null;
    }
  }
};
</script>
