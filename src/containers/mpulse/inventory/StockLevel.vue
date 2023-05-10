<template>
  <div className="animated">
    <b-card>
      <b-form-group label="Store" label-cols-sm="4" label-cols-lg="3">
          <v-select :options="storeList" :onChange="changeStore" placeholder="Select Store"></v-select>
      </b-form-group>
      <b-button-toolbar class="pull-right">
        <b-button variant="danger" class="mr-1" @click="showResetStockLevel">Reset Stock Level</b-button>
      </b-button-toolbar>
    </b-card>
    <b-card>
      <grid-buttons v-if="selectedStore" :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="stocks"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady"
      >
      </ag-grid-vue>
    </b-card>
      <b-modal ref="modalResetStockLevel" title="Reset Stock Level" hide-footer no-enforce-focus>
        <stock-level-form-reset v-if="canShowResetStockLevel" @success="resetStockLevelSuccess" @cancel="cancelResetStockLevel"/>
      </b-modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  import vSelect from 'vue-select'
  import {AgGridVue} from "ag-grid-vue"
  import { mapState, mapActions } from 'vuex'
  import GridButtons from '../GridButtons'
  import StockLevelFormReset from './StockLevelFormReset'
  export default {
    name: 'StockLevel',
    components: {
      vSelect,
      AgGridVue,
      GridButtons,
      StockLevelFormReset
    },
    computed: mapState({
      stores: state => state.stores.all,
      stocks: state => state.stockLevels.all
      }),
    watch: {
      stores: function(values) {
        this.storeList = []
        Vue._.forEach(values, (store) => {
          this.storeList.push({label: store.storename, value: store.storeid})
        });
      }
    },
    data: function () {
      return {
        storeList: [],
        selectedStore: null,
        canShowResetStockLevel: false,
        gridOptions: {
          context: {
            componentParent: this
          },
          defaultColDef: {
            sortable: true,
            resizable: true
          },
          columnDefs: [
            {headerName: 'Product Name', field: 'productname', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Stock Ctns', field: 'ctns', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Stock Packs', field: 'packs', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Supplier', field: 'suppliername', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Last Updated', field: 'lastupdated', filter: 'agTextColumnFilter', minWidth: 100},
          ]
        }
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': this.selectedStore ? 'MerchantPulse_StockLevel'+ this.$moment().format('YYYY-MM-DD')+'_'+this.selectedStore.label : '',
          'columnKeys': ['productname', 'ctns', 'packs', 'suppliername', 'lastupdated']
        }
      },
      gridReady() {
        this.gridOptions.api.sizeColumnsToFit()
      },
      changeStore(store) {
        this.selectedStore = store
        if (store) {
          this.$store.dispatch('stockLevels/getStockLevels', {storeId: store.value})
        } else {
          this.$store.dispatch('stockLevels/clear')
        }
      },
      showResetStockLevel() {
        this.canShowResetStockLevel = true
        this.$refs.modalResetStockLevel.show()
      },
      cancelResetStockLevel() {
        this.canShowResetStockLevel = false
        this.$refs.modalResetStockLevel.hide()
      },
      resetStockLevelSuccess() {
        this.canShowResetStockLevel = false
        this.$refs.modalResetStockLevel.hide()

      },

    },
    created () {
      this.$store.dispatch('stores/getStores')
    },
    beforeMount() {
      this.$store.dispatch('stockLevels/clear')
    },
  };
</script>
