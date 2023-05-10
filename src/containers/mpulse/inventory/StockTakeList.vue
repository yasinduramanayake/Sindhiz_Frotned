<template>
  <div class="animated fadeIn">
    <delivery-report-search @search="onSearch" />
    <b-card>
      <grid-buttons
        v-if="currentSearch"
        :gridOptions="gridOptions"
        :exportParams="exportParams"
      />
      <ag-grid-vue
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="stockTakes"
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
        ref="modalStockTake"
        title="View Stock Take"
        hide-footer
        @hide="hideStockTake"
        no-enforce-focus
      >
        <stock-take-view-modal
          v-if="selectedStockTake"
          :stocktake="selectedStockTake"
        />
      </b-modal>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import DeliveryReportSearch from "./DeliveryReportSearch";
import { AgGridVue } from "ag-grid-vue";
import GridButtons from "../GridButtons";
import StockTakeActions from "./StockTakeActions";
import StockTakeViewModal from "./StockTakeViewModal";

export default {
  name: "StockTakeList",
  components: {
    DeliveryReportSearch,
    AgGridVue,
    GridButtons,
    StockTakeActions,
    StockTakeViewModal,
  },
  computed: {
    ...mapState({
      stockTakes: (state) => state.stockTakes.all,
    }),
  },
  data: function () {
    return {
      currentSearch: null,
      selectedStockTake: null,
      selectedStockTakeType: null,
      selectedStockTakeTypeData: null,
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
            headerName: "Store Name",
            field: "storename",
            filter: "agTextColumnFilter",
            minWidth: 100,
          },
          {
            headerName: "No of Products",
            field: "noofprods",
            filter: "agTextColumnFilter",
            minWidth: 100,
          },
          {
            headerName: "Staff Name",
            field: "staffname",
            filter: "agTextColumnFilter",
            minWidth: 100,
          },
          {
            headerName: "Supplier",
            field: "suppliername",
            filter: "agTextColumnFilter",
            minWidth: 100,
          },
          {
            headerName: "Date",
            field: "created_at",
            filter: "agTextColumnFilter",
            minWidth: 100,
          },
          {
            headerName: "Actions",
            field: "stocktakehash",
            minWidth: 100,
            cellRendererFramework: "StockTakeActions",
          },
        ],
      },
    };
  },
  methods: {
    exportParams() {
      return {
        fileName:
          "MerchantPulse_ReportStockTakes_" +
          this.currentSearch.dateFrom +
          "_" +
          this.currentSearch.dateTo,
        columnKeys: ["storename", "noofprods", "staffname", "created_at"],
      };
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    },
    onSearch(data) {
      this.currentSearch = data;
      let params = {
        fromDate: data.dateFrom,
        toDate: data.dateTo,
        storeId: data.store,
      };
      this.$store.dispatch("stockTakes/getStockTakes", params);
    },
    showStockTakeModal(stocktake) {
      this.selectedStockTake = stocktake;
      this.$refs.modalStockTake.show();
    },
    hideStockTake() {
      this.selectedStockTake = null;
    },
  },
  created() {
    this.$store.dispatch("stores/getStores");
  },
};
</script>
