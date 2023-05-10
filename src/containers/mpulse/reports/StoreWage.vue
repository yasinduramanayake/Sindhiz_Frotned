<template>
  <div class="animated fadeIn">
    <store-wage-search @search="onSearch" multiple />

    <b-card>
      <grid-buttons
        v-if="currentSearch"
        :gridOptions="gridOptions"
        :exportParams="exportParams"
      />
      <ag-grid-vue
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="storeWage"
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
import { mapState, mapActions } from "vuex";
import { AgGridVue } from "ag-grid-vue";
import GridButtons from "../GridButtons";
import StoreWageSearch from "./StoreWageSearch";

export default {
  name: "StoreWage",
  components: {
    AgGridVue,
    GridButtons,
    StoreWageSearch,
  },
  computed: mapState({
    storeWage: (state) => state.reports.storeWage,
  }),
  watch: {
    storeWage: function (values) {
      let total = 0;
      Vue._.forEach(values, (row) => {
        total += parseFloat(row.sal);
      });
      this.gridOptions.api.setPinnedBottomRowData([
        { staffname: "Total", sal: total.toFixed(2) },
      ]);
    },
  },
  data: function () {
    return {
      selectedTransaction: null,
      selectedTransactionType: null,
      selectedTransactionTypeTicket: null,
      currentSearch: null,
      gridOptions: {
        context: {
          componentParent: this,
        },
        defaultColDef: {
          sortable: true,
          resizable: true,
        },
        columnDefs: [
          {
            headerName: "Staff Name",
            field: "staffname",
            filter: "agTextColumnFilter",
            minWidth: 150,
            pinnedRowCellRenderer: function(params) {
              return '<b>'+ params.data.staffname + '</b>'
            }
          },
          {
            headerName: "Store",
            field: "store",
            filter: "agTextColumnFilter",
            minWidth: 100,
          },
          {
            headerName: "Regular Hours",
            field: "reghours",
            filter: "agTextColumnFilter",
            minWidth: 100,
          },
          {
            headerName: "Saturday Hours",
            field: "sathours",
            filter: "agTextColumnFilter",
            minWidth: 100,
          },
          {
            headerName: "Sunday Hours",
            field: "sunhours",
            filter: "agTextColumnFilter",
            minWidth: 100,
          },
          {
            headerName: "Public Holiday Hours",
            field: "phhours",
            filter: "agTextColumnFilter",
            minWidth: 100,
          },
          {
            headerName: "Salary Amount",
            field: "sal",
            filter: "agTextColumnFilter",
            minWidth: 100,
            pinnedRowCellRenderer: function(params) {
              return '<b>'+ params.data.sal + '</b>'
            }
          },
        ],
      },
    };
  },
  methods: {
    exportParams() {
      return {
        fileName:
          "MerchantPulse_StoreWage_" +
          this.currentSearch.payroll.label,
        columnKeys: ["staffname", "store", "reghours", "sathours", "sunhours", "phhours", "sal"],
      };
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    },
    onSearch(data) {
      this.currentSearch = data;
      let stores = Vue._.map(data.stores, store => { return store.value })
      let params = {
        storeIds: stores,
        payrollId: data.payroll.value
      };
      this.$store.dispatch("reports/getStoreWage", params);
    },
  },
};
</script>
