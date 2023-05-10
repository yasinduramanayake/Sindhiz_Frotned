<template>
  <div class="animated fadeIn">
    <report-search-transtype @search="onSearch" />

    <b-card>
      <grid-buttons
        v-if="currentSearch"
        :gridOptions="gridOptions"
        :exportParams="exportParams"
      />
      <ag-grid-vue
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="salesData"
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
import ReportSearchTranstype from './ReportSearchTranstype'
import {AgGridVue} from "ag-grid-vue"
import GridButtons from '../GridButtons'

export default {
  name: 'SalesByFamilyReport',
  components: {
    ReportSearchTranstype,
    AgGridVue,
    GridButtons
  },
  data: function () {
    return {
      currentSearch: null,
      salesData: [],
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
          {headerName: 'Category', field: 'categoryName', filter: 'agTextColumnFilter', minWidth: 120},
          {headerName: 'Total Count', field: 'totalSaleCount', filter: 'agTextColumnFilter', minWidth: 120},
          {headerName: 'Total Sticks', field: 'totalSaleSticks', filter: 'agTextColumnFilter', minWidth: 120},
          {headerName: 'Store', field: 'storeName', filter: 'agTextColumnFilter', minWidth: 120},
          {headerName: 'Supplier Name', field: 'supplierName', filter: 'agTextColumnFilter', minWidth: 120}
        ]
      }
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulse_ReportSalesByFamily_'+this.currentSearch.fromDate+'_'+this.currentSearch.toDate,
        'columnKeys': ['subcatName', 'categoryName', 'totalSaleCount', 'totalSaleSticks', 'storeName', 'supplierName']
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
      this.$store.dispatch('reports/getProductBySubcat', params)
      this.axios.post('getSalesByFamilyReport', params)
      .then((response) => {
        this.salesData = response.data
      }).catch (() => this.showErrorMsg())
    }
  }
}
</script>
