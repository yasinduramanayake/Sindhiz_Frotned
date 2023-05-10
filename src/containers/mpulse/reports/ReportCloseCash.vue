<template>
  <div class="animated fadeIn">
    <report-search-multi-stores @search="onSearch"/>

    <b-card>
      <grid-buttons v-if="currentSearch" :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="reportCloseCash"
        :pagination="true"
        :paginationPageSize="100"
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
  import ReportSearchMultiStores from './ReportSearchMultiStores'
  import {AgGridVue} from "ag-grid-vue"
  import GridButtons from '../GridButtons'

  export default {
    name: 'ReportCloseCash',
    components: {
      ReportSearchMultiStores,
      AgGridVue,
      GridButtons
    },
    computed: mapState({
      reportCloseCash: state => state.reports.closecash
    }),
    data: function () {
      return {
        currentSearch: null,
        gridOptions: {
          context: {
            componentParent: this
          },
          rowClassRules: {
            'bg-success': function(params) { return params.data.pending === 'No'}
          },
          defaultColDef: {
            sortable: true,
            resizable: true
          },
          columnDefs: [
            {headerName: 'Date', field: 'date', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Store Name', field: 'storename', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Staff Name', field: 'staffname', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Hours Worked', field: 'hours', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Shift', field: 'shiftname', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Sale System', field: 'salesystem', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Customer Count', field: 'customercount', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Other Cash', field: 'othercash', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'EFTPOS', field: 'eftpos', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Payments', field: 'payments', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Other Change', field: 'otherchange', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Difference', field: 'difference', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Voids', field: 'voids', filter: 'agTextColumnFilter', minWidth: 80},
            {headerName: 'Register Opens', field: 'register_opens', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Comments', field: 'comments', filter: 'agTextColumnFilter', minWidth: 150}
          ]
        }
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': 'MerchantPulse_ReportCloseCash_'+'_'+this.currentSearch.fromDate+'_'+this.currentSearch.toDate,
          'columnKeys': ['date', 'storename', 'staffname', 'shiftname', 'salesystem', 'customercount', 'othercash', 'eftpos', 'payments', 'otherchange', 'difference']
        }
      },
      gridReady() {
        this.gridOptions.api.sizeColumnsToFit()
      },
      onSearch(data) {
        this.currentSearch = data
        console.log(data)
        let params = {
          storeIds: _.map(data.stores, (store) => {
            return store.value
          }),
          fromDate: data.fromDate,
          toDate: data.toDate,
          transTypeId: "",
          transTypeIds: []
        }
        this.$store.dispatch('reports/getCloseCash', params)
      }
    }
  }
</script>
