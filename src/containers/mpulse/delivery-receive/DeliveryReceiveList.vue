<template>
  <div className="animated">
    <b-card>
      <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="deliveryReceives"
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
import Vue from "vue"
import { AgGridVue } from "ag-grid-vue"
import { mapState } from "vuex"
import GridButtons from "../GridButtons"

export default {
  name: "DeliveryReceiveList",
  components: {
    AgGridVue,
    GridButtons
  },
  computed: mapState({
    deliveryReceives: (state) => state.deliveryReceives.all,
  }),
  data: function () {
    return {
      gridOptions: {
        context: {
          componentParent: this,
        },
        defaultColDef: {
          sortable: true,
          resizable: true,
          filter: "agTextColumnFilter",
          minWidth: 100,
        },
        columnDefs: [
          {
            headerName: "Store",
            field: "store.storename",
            minWidth: 100,
          },
          {
            headerName: "Distributor",
            field: "distributor.distributorname",
            minWidth: 100,
          },
          {
            headerName: "Staff",
            field: "staff.staffname",
            minWidth: 100,
          },
          {
            headerName: "Images",
            field: 'images',
            cellRenderer: function(params) {
              return params.data.images.length
            },
            minWidth: 50,
          },
          {
            headerName: "Receive Delivery Lines",
            field: 'receive_delivery_lines',
            cellRenderer: function(params) {
              return params.data.receive_delivery_lines.length
            },
            minWidth: 50,
          },
          {
            headerName: "Status",
            field: "status",
            minWidth: 50,
          },
        ],
      },
    };
  },
  methods: {
    exportParams() {
      return {
        fileName:
          "MerchantPulseDeliveryReceive_" + this.$moment().format("YYYY-MM-DD"),
        columnKeys: [
          "store.storename",
          "distributor.distributorname",
          "staff.staffname",
          "status",
        ],
        allColumns: true,
      };
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    },
  },
  created() {
    this.$store.dispatch("deliveryReceives/getDeliveryReceives");
  },
};
</script>
