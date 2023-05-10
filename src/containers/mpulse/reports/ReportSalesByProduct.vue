<template>
  <div class="animated fadeIn">
    <report-search-transtype @search="onSearch"/>

    <b-card>
      <grid-buttons v-if="currentSearch" :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="productByBarcode"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady">
      </ag-grid-vue>
    </b-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  import ReportSearchTranstype from './ReportSearchTranstype'
  import {AgGridVue} from "ag-grid-vue"
  import GridButtons from '../GridButtons'

  export default {
    name: 'ReportSalesByProduct',
    components: {
      ReportSearchTranstype,
      AgGridVue,
      GridButtons
    },
    computed: mapState({
      productByBarcode: state => state.reports.productByBarcode
    }),
    data: function () {
      return {
        currentSearch: null,
        gridOptions: {
          context: {
            componentParent: this
          },
          defaultColDef: {
            sortable: true,
            resizable: true
          },
          columnDefs: [
            {headerName: 'Barcode', field: 'barcode', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Product', field: 'productName', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Category Name', field: 'categoryname', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Total Qty', field: 'totalQty', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Total Amount', field: 'totalAmount', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Store', field: 'storeName', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Supplier', field: 'suppliername', filter: 'agTextColumnFilter', minWidth: 100}
          ]
        }
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': 'MerchantPulse_ReportSalesByProduct_'+this.currentSearch.fromDate+'_'+this.currentSearch.toDate,
          'columnKeys': ['barcode', 'productName', 'categoryname', 'totalQty', 'totalAmount', 'storeName', 'suppliername']
        }
      },
      gridReady() {
        this.gridOptions.api.sizeColumnsToFit()
      },
      onSearch(data) {
        this.currentSearch = data

        let params = {
          storeId: "",
          fromDate: data.fromDate,
          toDate: data.toDate,
          transTypeId: "",
          transTypeIds: _.map(data.transtypes, transtype => transtype.value)
        }
        this.$store.dispatch('reports/getProductByBarcode', params)
      }
    }
  }
</script>
