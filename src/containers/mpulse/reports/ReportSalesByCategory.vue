<template>
  <div class="animated fadeIn">
    <report-search-transtype @search="onSearch"/>

    <b-card>
      <grid-buttons v-if="currentSearch" :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="productByCategory"
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
    name: 'ReportSalesByCategory',
    components: {
      ReportSearchTranstype,
      AgGridVue,
      GridButtons
    },
    computed: mapState({
      productByCategory: state => state.reports.productByCategory
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
            {headerName: 'Category Name', field: 'categoryname', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Total Qty', field: 'qty', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Total Amount', field: 'amount', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Store', field: 'storename', filter: 'agTextColumnFilter', minWidth: 120}
          ]
        }
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': 'MerchantPulse_ReportSalesByCategory_'+this.currentSearch.fromDate+'_'+this.currentSearch.toDate,
          'columnKeys': ['categoryname', 'qty', 'amount', 'storename']
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
        this.$store.dispatch('reports/getProductByCategory', params)
      }
    }
  }
</script>
