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
        :rowData="inhouseStockTakes"
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
        ref="modalInhouseStockTake"
        title="View Inhouse Stock Take"
        hide-footer
        @hide="hideInhouseStockTake"
        no-enforce-focus
      >
        <inhouse-stock-take-view-modal
          v-if="selectedInhouseStockTake"
          :stocktake="selectedInhouseStockTake"
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
import InhouseStockTakeActions from "./InhouseStockTakeActions";
import InhouseStockTakeViewModal from "./InhouseStockTakeViewModal";

export default {
  name: "InhouseStockTakeList",
  components: {
    DeliveryReportSearch,
    AgGridVue,
    GridButtons,
    InhouseStockTakeActions,
    InhouseStockTakeViewModal,
  },
  computed: {
    ...mapState({
      inhouseStockTakes: (state) => state.stockTakes.inhouseall,
    }),
  },
  data: function () {
    return {
      currentSearch: null,
      selectedInhouseStockTake: null,
      selectedInhouseStockTakeType: null,
      selectedInhouseStockTakeTypeData: null,
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
            headerName: "Date",
            field: "created_at",
            filter: "agTextColumnFilter",
            minWidth: 100,
          },
          {
            headerName: "Actions",
            field: "stocktakehash",
            minWidth: 100,
            cellRendererFramework: "InhouseStockTakeActions",
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
      this.$store.dispatch("stockTakes/getInhouseStockTakes", params);
    },
    showInhouseStockTakeModal(stocktake) {
      this.selectedInhouseStockTake = stocktake;
      this.$refs.modalInhouseStockTake.show();
    },
    hideInhouseStockTake() {
      this.selectedInhouseStockTake = null;
    },
  },
  created() {
    this.$store.dispatch("stores/getStores");
  },
};
</script>
