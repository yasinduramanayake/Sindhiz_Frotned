<template>
  <div class="animated fadeIn">
    <invoice-amounts-search @search="onSearch" multiple />

    <b-card>
      <grid-buttons
        v-if="currentSearch"
        :gridOptions="gridOptions"
        :exportParams="exportParams"
      />
      <ag-grid-vue
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="invoiceAmounts"
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
import { mapState } from "vuex";
import { AgGridVue } from "ag-grid-vue";
import GridButtons from "../GridButtons";
import InvoiceAmountsSearch from "./InvoiceAmountsSearch";

export default {
  name: "InvoiceAmounts",
  components: {
    AgGridVue,
    GridButtons,
    InvoiceAmountsSearch,
  },
  computed: mapState({
    invoiceAmounts: (state) => state.reports.invoiceAmounts,
  }),
  watch: {
    invoiceAmounts: function (values) {
      let total = 0;
      Vue._.forEach(values, (row) => {
        total += parseFloat(row.invamount);
      });
      this.gridOptions.api.setPinnedBottomRowData([
        { distributorname: "Total", storename: "", invamount: total.toFixed(2) },
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
            headerName: "Distributor",
            field: "distributorname",
            filter: "agTextColumnFilter",
            minWidth: 150,
            pinnedRowCellRenderer: function(params) {
              return '<b>'+ params.data.distributorname + '</b>'
            }
          },
          {
            headerName: "Store",
            field: "storename",
            filter: "agTextColumnFilter",
            minWidth: 150,
            pinnedRowCellRenderer: function(params) {
              return '<b>'+ params.data.storename + '</b>'
            }
          },
          {
            headerName: "Amount",
            field: "invamount",
            filter: "agTextColumnFilter",
            minWidth: 100,
            pinnedRowCellRenderer: function(params) {
              return '<b>'+ params.data.invamount + '</b>'
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
          "MerchantPulse_InvoiceAmounts_" +
          this.currentSearch.store.label +
          "_" +
          this.currentSearch.fromDate +
          "_" +
          this.currentSearch.toDate,
        columnKeys: ["distributorname", 'storename', "invamount"],
      };
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    },
    onSearch(data) {
      this.currentSearch = data;
      let params = {
        storeIds: Vue._.map(data.stores, store => { return store.value }),
        fromDate: data.fromDate,
        toDate: data.toDate,
      };
      this.$store.dispatch("reports/getInvoiceAmounts", params);
    },
  },
};
</script>
