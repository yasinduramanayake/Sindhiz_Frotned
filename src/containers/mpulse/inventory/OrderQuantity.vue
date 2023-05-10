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
        :title="title"
        hide-footer
        @hide="hideStockTake"
        no-enforce-focus
        size="lg"
      >
        <order-quantity-view-modal
          v-if="selectedStockTake"
          :stocktake="selectedStockTake"
          :storeId="currentSearch.store"
        />
      </b-modal>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import DeliveryReportSearch from "./DeliveryReportSearch";
import { AgGridVue } from "ag-grid-vue";
import GridButtons from "../GridButtons";
import OrderQuantityActions from "./OrderQuantityActions";
import OrderQuantityViewModal from "./OrderQuantityViewModal";

export default {
  name: "OrderQuantity",
  components: {
    DeliveryReportSearch,
    AgGridVue,
    GridButtons,
    OrderQuantityActions,
    OrderQuantityViewModal,
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
      title: "",
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
            cellRendererFramework: "OrderQuantityActions",
          },
        ],
      },
    };
  },
  methods: {
    exportParams() {
      return {
        fileName:
          "MerchantPulse_OrderQuantity_" +
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
    showOrderQuantityModal(stocktake) {
      this.selectedStockTake = stocktake;
      this.title = this.selectedStockTake.suppliername + " order for " + this.currentSearch.storeName
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
