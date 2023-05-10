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
        :rowData="inventories"
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
        ref="modalInventory"
        title="View Inventory"
        hide-footer
        size="lg"
        @hide="hideInventory"
        no-enforce-focus
      >
        <inventory-view-modal
          v-if="selectedInventory"
          :inventory="selectedInventory"
          @success="fixedAll"
        />
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DeliveryReportSearch from "./DeliveryReportSearch";
import { AgGridVue } from "ag-grid-vue";
import GridButtons from "../GridButtons";
import InventoryActions from "./InventoryActions";
import InventoryViewModal from "./InventoryViewModal";

export default {
  name: "InventoryView",
  components: {
    DeliveryReportSearch,
    AgGridVue,
    GridButtons,
    InventoryActions,
    InventoryViewModal
  },
  computed: {
    ...mapState({
      inventories: state => state.inventories.all
    })
  },
  data: function() {
    return {
      currentSearch: null,
      selectedInventory: null,
      selectedInventoryType: null,
      selectedInventoryTypeData: null,
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
            headerName: "Store Name",
            field: "storename",
            filter: "agTextColumnFilter",
            minWidth: 100
          },
          {
            headerName: "No of Products",
            field: "noofprods",
            filter: "agTextColumnFilter",
            minWidth: 100
          },
          {
            headerName: "Staff Name",
            field: "staffname",
            filter: "agTextColumnFilter",
            minWidth: 100
          },
          {
            headerName: "Supplier",
            field: "suppliername",
            filter: "agTextColumnFilter",
            minWidth: 100
          },
          {
            headerName: "Date",
            field: "created_at",
            filter: "agTextColumnFilter",
            minWidth: 100
          },
          {
            headerName: "Actions",
            field: "stocktakehash",
            minWidth: 100,
            cellRendererFramework: "InventoryActions"
          }
        ]
      }
    };
  },
  methods: {
    exportParams() {
      return {
        fileName:
          "MerchantPulse_ReportViewInventory_" +
          this.currentSearch.dateFrom +
          "_" +
          this.currentSearch.dateTo,
        columnKeys: ["storename", "noofprods", "staffname", "created_at"]
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
        storeId: data.store
      };
      this.$store.dispatch("inventories/getInventories", params);
    },
    showInventoryModal(stocktake) {
      this.selectedInventory = stocktake;
      this.$refs.modalInventory.show();
    },
    hideInventory() {
      this.selectedInventory = null;
    },
    fixedAll() {
      this.$refs.modalInventory.hide();
    }
  },
  created() {
    this.$store.dispatch("stores/getStores");
  }
};
</script>
