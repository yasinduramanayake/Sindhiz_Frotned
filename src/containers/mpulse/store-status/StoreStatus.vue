<template>
<div className="animated">
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="storesStatus" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalStoreStatusDetail" title="Store Status Details" hide-footer size="lg" no-enforce-focus>
      <store-status-detail v-if="selectedStoreStatus" :storeStatus="selectedStoreStatus" />
    </b-modal>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import {
  AgGridVue
} from "ag-grid-vue";
import {
  mapState,
  mapActions
} from 'vuex'
import GridButtons from '../GridButtons'
import StoreStatusActions from './StoreStatusActions'
import StoreStatusDetail from './StoreStatusDetail'

export default {
  name: 'StoreStatus',
  components: {
    AgGridVue,
    GridButtons,
    StoreStatusActions,
    StoreStatusDetail
  },
  data: function() {
    return {
      storesStatus: null,
      selectedStoreStatus: null,
      gridOptions: {
        context: {
          componentParent: this
        },
        defaultColDef: {
          sortable: true,
          resizable: true,
          filter: 'agTextColumnFilter',
        },
        columnDefs: [
          {
            headerName: 'Company Name',
            field: 'company.companyname',
            minWidth: 120
          },
          {
            headerName: 'Store Name',
            field: 'storename',
            minWidth: 120
          },
          {
            headerName: 'Last Online',
            field: 'last_online',
            minWidth: 120
          },
          {
            headerName: 'Sync Status',
            field: 'current_head',
            minWidth: 50,
            cellRenderer: function(params) {
              return params.data.current_head == params.data.remote_deployment.current_head ? '<span class="button-circle-wrapper"><button type="button" class="text-center btn btn-success btn-circle"><i class="fa fa-check mb-1"></i></button></span>' : '<span class="button-circle-wrapper"><button type="button" class="text-center btn btn-danger btn-circle"><i class="fa fa-remove mb-1"></i></button></span>'
            }
          },
          {
            headerName: 'Actions',
            cellRendererFramework: 'StoreStatusActions',
            filter: false,
            minWidth: 100
          }
        ],
      },
      canShowAddStoreProfile: false,
      selectedStoreProfile: null,
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulseStoreStatus_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': ['storename', 'changelimit', 'hoursop', 'staffname', 'ctnperc', 'pktperc', 'tobacperc', 'cigarperc'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showDetailModal(storeStatus) {
      this.selectedStoreStatus = storeStatus
      this.$refs.modalStoreStatusDetail.show()
    }

  },
  created() {
    Vue.axios.get('stores/status').then(response => (this.storesStatus = response.data));
  }
};
</script>

<style lang="scss">
.button-circle-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-circle {
  width: 25px;
  height: 25px;
  padding: 0 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 15px;
}
</style>
