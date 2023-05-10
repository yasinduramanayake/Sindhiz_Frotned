<template>
  <div class="animated fadeIn">
    <b-card>
      <b-row>
        <b-col>
          <b-btn
            class="pull-right"
            type="submit"
            variant="success"
            :disabled="!startDate || !endDate"
            @click="generatePayroll"
            >Generate Payroll</b-btn
          >
        </b-col>
      </b-row>
    </b-card>

    <b-card v-if="payrolls">
      <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="payrolls"
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
        ref="modalDeleteConfirm"
        title="Delete Payroll"
        @ok="deletePayroll"
        no-enforce-focus
      >
        <div class="d-block text-center">
          <h4>
            Are you sure you want to delete this payroll?
          </h4>
        </div>
      </b-modal>
      <b-modal
        ref="modalViewPayroll"
        title="View Payroll"
        no-enforce-focus
        size="lg"
        ok-only
        @hide="hideViewPayroll"
      >
        <payroll-detail v-if="viewPayroll" :payroll="viewPayroll"></payroll-detail>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { AgGridVue } from "ag-grid-vue";
import GridButtons from "../GridButtons";
import PayrollListActions from "./PayrollListActions";
import PayrollDetail from "./PayrollDetail";

export default {
  name: "PayrollList",
  components: {
    AgGridVue,
    GridButtons,
    PayrollListActions,
    PayrollDetail
  },
  computed: mapState({
    payrolls: state => state.payrolls.all
  }),
  data: function() {
    return {
      startDate: this.$moment()
        .subtract(30, "days")
        .toDate(),
      endDate: new Date(),
      selecetedPayroll: null,
      viewPayroll: null,
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
            headerName: "Start Date",
            field: "startdate",
            minWidth: 80
          },
          {
            headerName: "End Date",
            field: "enddate",
            minWidth: 80
          },
          {
            headerName: "Total Amount",
            field: "total_amount",
            minWidth: 80
          },
          {
            headerName: "Total Super",
            field: "total_super",
            minWidth: 80
          },
          {
            headerName: "Actions",
            cellRendererFramework: "PayrollListActions",
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
        columnKeys: ["startdate", "enddate", "total_amount", "total_super"]
      };
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    },
    generatePayroll() {
      this.$router.push({ name: "Payroll Generate" });
    },
    showDeleteConfirmModal(payroll) {
      this.selectedPayroll = payroll;
      this.$refs.modalDeleteConfirm.show();
    },
    deletePayroll() {
      this.$store
        .dispatch("payrolls/deletePayroll", {
          payrollId: this.selectedPayroll.payrollid
        })
        .then(() => {
          this.$store.dispatch("payrolls/getPayrolls");
        });
    },
    hideViewPayroll() {
      this.viewPayroll = null;
    },
    showViewPayrollModal(payroll) {
      this.viewPayroll = payroll;
      this.$refs.modalViewPayroll.show();
    },
  
  },
  created() {
    this.$store.dispatch("payrolls/getPayrolls");
  }
};
</script>
