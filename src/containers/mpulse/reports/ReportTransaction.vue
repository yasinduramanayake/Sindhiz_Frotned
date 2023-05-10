<template>
  <div class="animated fadeIn">
    <report-search-store @search="onSearch"/>

    <b-card>
      <grid-buttons v-if="currentSearch" :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="transactions"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady">
      </ag-grid-vue>
    </b-card>

    <b-modal ref="modalViewBanked" title="View Transaction" size="lg" hide-footer @hide="hideViewTransaction" no-enforce-focus>
      <transaction-transline v-if="selectedTransaction" :transid="selectedTransaction.transid"/>
    </b-modal>

    <b-modal ref="modalChangeTransactionType" title="Select Transaction Type" @ok="selectTransactionType" no-enforce-focus>
      <v-select :options="transactionTypeList" placeholder="Select Transaction Type" v-model="selectedTransactionType"></v-select>
    </b-modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  import {AgGridVue} from "ag-grid-vue"
  import GridButtons from '../GridButtons'
  import ReportSearchStore from './ReportSearchStore'
  import ReportTransactionActions from './ReportTransactionActions'
  import TransactionTransline from '../TransactionTransline'

  export default {
    name: 'ReportTransaction',
    components: {
      AgGridVue,
      GridButtons,
      ReportSearchStore,
      ReportTransactionActions,
      TransactionTransline
    },
    computed: {
      transactionTypeList() {
        let list = []
        Vue._.forEach(this.$store.state.transtypes.all, (transType) => {
          list.push({label: transType.transtypename, value: transType.transtypeid})
        })
        return list
      },
      ...mapState({
      transactions: state => state.reports.transactions,
      transtypes: state => state.transtypes.all
      }),
    },
    data: function () {
      return {
        selectedTransaction: null,
        selectedTransactionType: null,
        selectedTransactionTypeTicket: null,
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
            {headerName: 'Date/Time', field: 'timestamp', filter: 'agTextColumnFilter', minWidth: 150},
            {headerName: 'Ticket ID', field: 'ticketid', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Total', field: 'total', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Change Transaction', field: 'transtypeid', filter: 'agTextColumnFilter', minWidth: 120, cellRenderer: function(params) {
              var index = _.findIndex(params.context.componentParent.transtypes, {transtypeid: params.value});
              return params.context.componentParent.transtypes[index].transtypename
            }},
            {headerName: 'Actions', cellRendererFramework: 'ReportTransactionActions', minWidth: 120}
          ]
        }
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': 'MerchantPulse_ReportTransaction_'+this.currentSearch.store.label+'_'+this.currentSearch.fromDate+'_'+this.currentSearch.toDate,
          'columnKeys': ['timestamp', 'ticketid', 'total', 'transtypeid']
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
        this.$store.dispatch('reports/getTransactions', params)
      },
      showViewTransaction(transaction) {
        this.selectedTransaction = transaction
        this.$refs.modalViewBanked.show()
      },
      hideViewTransaction() {
        this.selectedTransaction = null
      },
      showChangeTransactionType(data) {
        this.selectedTransactionTypeTicket = data
        this.selectedTransactionType = _.find(this.transactionTypeList, (transactionType) => (transactionType.value == data.transtypeid))
        this.$refs.modalChangeTransactionType.show()
      },
      selectTransactionType() {
        if (this.selectedTransactionType.value != this.selectedTransactionTypeTicket.transtypeid) {
          Vue.axios.post('/saveTransType', {
            transTypeId: this.selectedTransactionType.value,
            id: this.selectedTransactionTypeTicket.transid
          }).then(() => {
            this.selectedTransactionTypeTicket.transtypeid = this.selectedTransactionType.value
            this.gridOptions.api.refreshCells()
            this.showSuccessMsg()
          }).catch (error => {
            this.showErrorMsg()
          })
        }
      }
    },
    created() {
      this.$store.dispatch('transtypes/getTranstypes')
    }
  }
</script>
