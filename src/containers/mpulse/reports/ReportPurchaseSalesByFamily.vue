<template>
  <div class="animated fadeIn">
    <report-search-transtype @search="onSearch"/>

    <b-card>
      <grid-buttons v-if="currentSearch" :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="purchaseSaleBySubcat"
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
    name: 'ReportPurchaseSalesByFamily',
    components: {
      ReportSearchTranstype,
      AgGridVue,
      GridButtons
    },
    computed: mapState({
      purchaseSaleBySubcat: state => state.reports.purchaseSaleBySubcat
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
            {headerName: 'Sub Category', field: 'subcatName', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Supplier Name', field: 'supplierName', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Total Purchase Count', field: 'totalPurchaseCount', filter: 'agTextColumnFilter', minWidth: 140},
            {headerName: 'Total Purchase Sticks', field: 'totalPurchaseSticks', filter: 'agTextColumnFilter', minWidth: 140},
            {headerName: 'Total Sale Count', field: 'totalSaleCount', filter: 'agTextColumnFilter', minWidth: 140},
            {headerName: 'Total Sale Sticks', field: 'totalSaleSticks', filter: 'agTextColumnFilter', minWidth: 140},
            {headerName: 'Store', field: 'storeName', filter: 'agTextColumnFilter', minWidth: 120}
          ]
        }
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': 'MerchantPulse_ReportSalesPurchasesByFamily_'+this.currentSearch.fromDate+'_'+this.currentSearch.toDate,
          'columnKeys': ['subcatName', 'supplierName', 'totalPurchaseCount', 'totalPurchaseSticks', 'totalSaleCount', 'totalSaleSticks', 'storeName']
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
        this.$store.dispatch('reports/getPurchaseSaleBySubcat', params)
      }
    }
  }
</script>
