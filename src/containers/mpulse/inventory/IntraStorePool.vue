<template>
  <div className="animated">
    <intra-store-search @search="onSearch" />
    <b-card v-if="currentSearch">
      <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="tickets"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady"
      >
      </ag-grid-vue>
    </b-card>
    <div>
      <b-modal ref="modalViewTransactions" title="Transactions" hide-footer size="lg" @hide="hideViewTransactions" no-enforce-focus>
        <transaction-transline v-if="selectedTicket" :transid="selectedTicket.transid"/>
      </b-modal>

      <b-modal ref="modalChangeReceiver" title="Select Receiver" @ok="selectStore" no-enforce-focus>
        <v-select :options="storeList" placeholder="Select Store" v-model="selectedStore"></v-select>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {AgGridVue} from "ag-grid-vue";
  import { mapState } from 'vuex'
  import GridButtons from '../GridButtons'
  import IntraStoreActions from './IntraStoreActions'
  import IntraStoreSearch from './IntraStoreSearch'
  import TransactionTransline from '../TransactionTransline'

  export default {
    name: 'IntraStorePool',
    components: {
      AgGridVue,
      GridButtons,
      IntraStoreActions,
      IntraStoreSearch,
      TransactionTransline
    },
    computed: {
      storeList() {
        let list = []
        Vue._.forEach(this.$store.state.stores.all, (store) => {
          list.push({label: store.storename, value: store.storeid})
        })
        return list
      },
      ...mapState({
        stores: state => state.stores.all,
        intraStoreTickets: state => state.intraStorePool.all
      })

    },
    watch: {
      intraStoreTickets: function(value) {
        _.forEach(value, (ticket) => {
          this.tickets.push(Object.assign({}, ticket))
        })
      }
    },
    data: function () {
      return {
        tickets: [],
        selectedTicket: null,
        selectedStore: null,
        selectedReceiverTicket: null,
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
            {headerName: 'Date/Time', field: 'timestamp', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Ticket ID', field: 'ticketid', filter: 'agTextColumnFilter', minWidth: 80},
            {headerName: 'Total', field: 'total', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Sender', field: 'storename', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Receiver', field: 'receiver', filter: 'agTextColumnFilter', minWidth: 100,
              cellRenderer: (params) => {
                var currentStore = _.find(this.stores, (store) => (store.storeid == params.value))
                return currentStore ? currentStore.storename : ''
              }
            },
            {headerName: 'Actions', minWidth: 150, cellRendererFramework: 'IntraStoreActions'}
          ],
        },
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': 'MerchantPulseIntraStorePool_'+this.currentSearch.dateFrom+'_'+this.currentSearch.dateTo,
          'columnKeys': ['timestamp', 'ticketid', 'total', 'storename', 'receiver', 'receiver']
        }
      },
      gridReady() {
        this.gridOptions.api.sizeColumnsToFit()
      },
      onSearch(data) {
      this.currentSearch = data;
      let params = {
        fromDate: data.dateFrom,
        toDate: data.dateTo,
        storeId: data.store
      };
      this.$store.dispatch('intraStorePool/getIntraStoreReport', params)
    },
      showViewTransactions(data) {
        this.selectedTicket = data
        this.$refs.modalViewTransactions.show()
      },
      hideViewTransactions() {
        this.selectedTicket = null
      },
      showChangeReceiver(data) {
        this.selectedReceiverTicket = data
        this.selectedStore = _.find(this.storeList, (store) => (store.value == data.receiver))
        this.$refs.modalChangeReceiver.show()
      },
      selectStore() {
        if (this.selectedStore.value != this.selectedReceiverTicket.receiver) {
          Vue.axios.post('/setStore', {
            storeId: this.selectedStore.value,
            transid: this.selectedReceiverTicket.transid
          }).then(() => {
            this.selectedReceiverTicket.receiver = this.selectedStore.value
            this.gridOptions.api.refreshCells()
            this.showSuccessMsg()
          }).catch (error => {
            this.showErrorMsg()
          })
        }
      }
    },
    created () {
      this.$store.dispatch('stores/getStores')
    }
  };
</script>
