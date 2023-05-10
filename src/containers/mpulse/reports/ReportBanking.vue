<template>
  <div class="animated fadeIn">
    <report-search-store @search="onSearch"/>

    <b-card>
      <grid-buttons v-if="currentSearch" :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="reportBanking"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady">
      </ag-grid-vue>
    </b-card>

    <b-modal ref="modalViewBanked" title="View Banked Shifts" size="lg" hide-footer @hide="hideViewBanked" no-enforce-focus>
      <report-banking-view-banked v-if="selectedBanking" :banking="selectedBanking"/>
    </b-modal>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  import {AgGridVue} from "ag-grid-vue"
  import GridButtons from '../GridButtons'
  import ReportSearchStore from './ReportSearchStore'
  import ReportBankingActions from './ReportBankingActions'
  import ReportBankingViewBanked from './ReportBankingViewBanked'

  export default {
    name: 'ReportBanking',
    components: {
      AgGridVue,
      GridButtons,
      ReportSearchStore,
      ReportBankingActions,
      ReportBankingViewBanked
    },
    computed: mapState({
      reportBanking: state => state.reports.banking
    }),
    data: function () {
      return {
        selectedBanking: null,
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
            {headerName: 'Date', field: 'date', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Amount', field: 'amount', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Cheque', field: 'cheque', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Difference', field: 'difference', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Banked By', field: 'bankedby', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Verified By', field: 'bankingverifiedby', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Actions', cellRendererFramework: 'ReportBankingActions', minWidth: 100}
          ]
        }
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': 'MerchantPulse_ReportBanking_'+this.currentSearch.store.label+'_'+this.currentSearch.fromDate+'_'+this.currentSearch.toDate,
          'columnKeys': ['date', 'amount', 'cheque', 'difference', 'bankedby', 'bankingverifiedby']
        }
      },
      gridReady() {
        this.gridOptions.api.sizeColumnsToFit()
      },
      onSearch(data) {
        this.currentSearch = data
        let params = {
          storeId: data.store.value,
          fromDate: data.fromDate,
          toDate: data.toDate,
          transTypeId: "",
          transTypeIds: []
        }
        this.$store.dispatch('reports/getBanking', params)
      },
      showViewBanked(banking) {
        this.selectedBanking = banking
        this.$refs.modalViewBanked.show()
      },
      hideViewBanked() {
        this.selectedBanking = null
      }
    }
  }
</script>
