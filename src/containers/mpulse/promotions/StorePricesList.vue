<template>
  <div className="animated">
    <b-card>
      <b-form-group label="Store" label-cols-sm="4" label-cols-lg="3">
        <v-select :options="storeList" :onChange="changeStore" placeholder="Select Store"></v-select>
      </b-form-group>
    </b-card>
    <b-card>
      <grid-buttons v-if="selectedStore" :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="storePricesList"
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
  import Vue from 'vue'
  import vSelect from 'vue-select'
  import {AgGridVue} from "ag-grid-vue"
  import { mapState, mapActions } from 'vuex'
  import GridButtons from '../GridButtons'
  
  export default {
    name: 'StorePricesList',
    components: {
      vSelect,
      AgGridVue,
      GridButtons
    },
    computed: mapState({
      stores: state => state.stores.all,
      storePricesList: state => state.storePricesList.all
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
            {headerName: 'Pocket Price', field: 'packet_price', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Carton Price', field: 'carton_price', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Date', field: 'created_at', filter: 'agTextColumnFilter', minWidth: 120},
            
          ]
        }
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': this.selectedStore ? 'MerchantPulse_StorePriceList'+ this.$moment().format('YYYY-MM-DD')+'_'+this.selectedStore.label : '',
          'columnKeys': ['productname', 'packet_price', 'carton_price','created_at']
        }
      },
      gridReady() {
        this.gridOptions.api.sizeColumnsToFit()
      },
      changeStore(store) {
        this.selectedStore = store
        if (store) {
          this.$store.dispatch('storePricesList/getStorePrices', {storeId: store.value})
        } else {
          this.$store.dispatch('storePricesList/clear')
        }
      },
    },
    beforeMount() {
      this.$store.dispatch('storePricesList/clear')
    },
    created () {
      this.$store.dispatch('stores/getStores')
    },
  };
</script>
