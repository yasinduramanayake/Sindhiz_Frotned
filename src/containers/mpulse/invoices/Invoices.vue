<template>
<div className="animated">
  <b-card>
    <b-button-toolbar class="pull-right">
      <b-button variant="primary" class="mr-1" @click="showAddInvoice">Add Invoice</b-button>
      <b-button variant="warning" @click="showReportMissingDelivery">Report Missing Delivery</b-button>
    </b-button-toolbar>
  </b-card>
  <b-card>
    <b-row>
      <b-col>
        <b-form-group label="Store" label-cols-sm="4" label-cols-lg="2">
          <store-select v-model="selectedStores" multiple onlyStaff></store-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
        <b-col>
          <b-form-group label="From">
            <v-date-picker v-model="fromDate" :input-props='{ class: "form-control" }' show-caps>
            </v-date-picker>
          </b-form-group>
        </b-col>
        <b-col >
          <b-form-group label="To">
            <v-date-picker v-model="toDate" :input-props='{ class: "form-control" }' show-caps>
            </v-date-picker>
          </b-form-group>
        </b-col>
      </b-row>
    <b-row>
      <b-col>
        <b-button class="pull-right" variant="success" :disabled="selectedStores.length == 0 || fromDate == null || toDate == null" @click="getInvoices">Get Invoices</b-button>
        <b-form-checkbox @change="selectAllStores" class="pull-right mr-2 mt-2">
          Select All Stores
        </b-form-checkbox>
      </b-col>
    </b-row>
  </b-card>

  <b-card>
    <grid-buttons v-if="selectedStores" :gridOptions="gridOptions" :exportParams="exportParams" />

    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="invoices" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalAddInvoice" title="Add Invoice" hide-footer no-enforce-focus>
      <invoice-form-add v-if="canShowAddInvoice" @success="addInvoiceSuccess" @cancel="cancelAddInvoice" />
    </b-modal>
    <b-modal ref="modalConfirm" title="Delete Invoice" @ok="deleteInvoice" no-enforce-focus>
      <div v-if="selectedInvoice" class="d-block text-center">
        <h4>Are you sure you want to delete Invoice #{{selectedInvoice.invoicenumber}}</h4>
      </div>
    </b-modal>
    <b-modal ref="modalInvoiceDetail" title="Invoice Details" hide-footer no-enforce-focus>
      <invoice-detail v-if="selectedInvoice" :invoice="selectedInvoice" />
    </b-modal>
    <b-modal ref="modalMissingDelivery" title="Report Missing Delivery" hide-footer no-enforce-focus>
      <invoice-report-missing-delivery v-if="canShowReportMissingDelivery" @success="reportMissingDeliverySuccess" @cancel="cancelReportMissingDelivery" />
    </b-modal>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import {
  AgGridVue
} from "ag-grid-vue"
import {
  mapState,
  mapActions
} from 'vuex'
import GridButtons from '../GridButtons'
import InvoiceFormAdd from './InvoiceFormAdd'
import InvoiceActions from './InvoiceActions'
import InvoiceDetail from './InvoiceDetail'
import InvoiceReportMissingDelivery from './InvoiceReportMissingDelivery'

export default {
  name: 'Invoices',
  components: {
    AgGridVue,
    InvoiceFormAdd,
    InvoiceActions,
    InvoiceDetail,
    InvoiceReportMissingDelivery,
    GridButtons
  },
  computed: mapState({
    invoices: state => state.invoices.all
  }),
  data: function() {
    return {
      storeList: [],
      selectedStores: [],
      fromDate: Vue.moment().subtract(6, 'M').toDate(),
      toDate: new Date(),
      canShowAddInvoice: false,
      canShowReportMissingDelivery: false,
      selectedInvoice: null,
      gridOptions: {
        context: {
          componentParent: this
        },
        rowClassRules: {
          'bg-success': function(params) {
            return params.data.pending === 'No'
          }
        },
        defaultColDef: {
          sortable: true,
          resizable: true
        },
        columnDefs: [{
            headerName: 'Invoice #',
            field: 'invoicenumber',
            filter: 'agTextColumnFilter',
            minWidth: 120
          },
          {
            headerName: 'Delivery Date',
            field: 'deliverydate',
            filter: 'agTextColumnFilter',
            minWidth: 120
          },
          {
            headerName: 'Due Date',
            field: 'duedate',
            filter: 'agTextColumnFilter',
            minWidth: 120
          },
          {
            headerName: 'Company',
            field: 'distributorname',
            filter: 'agTextColumnFilter',
            minWidth: 120
          },
          {
            headerName: 'Amount',
            field: 'invoiceamount',
            filter: 'agTextColumnFilter',
            minWidth: 100
          },
          {
            headerName: 'Store',
            field: 'storename',
            filter: 'agTextColumnFilter',
            minWidth: 120
          },
          {
            headerName: 'Pending',
            field: 'pending',
            minWidth: 100,
            filter: 'agTextColumnFilter'
          },
          {
            headerName: 'Updated By',
            field: 'fullname',
            filter: 'agTextColumnFilter',
            minWidth: 120
          },
          {
            headerName: 'Actions',
            field: 'invoiceid',
            minWidth: 150,
            cellRendererFramework: 'InvoiceActions'
          }
        ]
      }
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': this.selectedStore ? 'MerchantPulse_' + this.$moment().format('YYYY-MM-DD') + '_' + this.selectedStore.label : '',
        'columnKeys': ['invoicenumber', 'deliverydate', 'duedate', 'distributorname', 'invoiceamount', 'storename', 'fullname']
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    selectAllStores(value) {
      this.selectedStores = value ? Vue._.map(this.$store.state.stores.all, (store) => {
        return {
          label: store.storename,
          value: store.storeid
        }
      }) : []
    },
    getInvoices() {
      let params = {
        stores: _.map(this.selectedStores, (store) => { return store.value}),
        fromDate: this.$moment(this.fromDate).format('YYYY-MM-DD'),
        toDate: this.$moment(this.toDate).format('YYYY-MM-DD')
      }
      this.$store.dispatch('invoices/getStoresInvoices', params)
    },
    showDetailModal(invoice) {
      this.selectedInvoice = invoice
      this.$refs.modalInvoiceDetail.show()
    },
    showAddInvoice() {
      this.canShowAddInvoice = true
      this.$refs.modalAddInvoice.show()
    },
    cancelAddInvoice() {
      this.canShowAddInvoice = false
      this.$refs.modalAddInvoice.hide()
    },
    addInvoiceSuccess() {
      this.canShowAddInvoice = false
      this.$refs.modalAddInvoice.hide()
      if (this.selectedStore) {
        this.$store.dispatch('invoices/getInvoices', {
          storeId: this.selectedStore.value
        })
      }
    },
    showReportMissingDelivery() {
      this.canShowReportMissingDelivery = true
      this.$refs.modalMissingDelivery.show()
    },
    reportMissingDeliverySuccess() {
      this.canShowReportMissingDelivery = false
      this.$refs.modalMissingDelivery.hide()
      if (this.selectedStore) {
        this.$store.dispatch('invoices/getInvoices', {
          storeId: this.selectedStore.value
        })
      }
    },
    cancelReportMissingDelivery() {
      this.canShowReportMissingDelivery = false
      this.$refs.modalMissingDelivery.hide()
    },
    showConfirmDeleteModal(invoice) {
      this.selectedInvoice = invoice
      this.$refs.modalConfirm.show()
    },
    deleteInvoice() {
      this.$store.dispatch('invoices/removeInvoice', {
        invoiceid: this.selectedInvoice.invoiceid
      }).then(() => {
        this.selectedInvoice = null
        this.showSuccessMsg()
      }).catch(() => {
        this.showErrorMsg()
      })
    },
    changeInvoiceStatus(node) {
      this.$store.dispatch('invoices/changeStatus', {
          invoiceid: node.data.invoiceid,
          pending: node.data.pending
        })
        .then((data) => {
          data.distributorname = node.data.distributorname
          data.storename = node.data.storename
          data.fullname = node.data.fullname
          node.setData(data)
          this.$nextTick(() => {
            this.gridOptions.api.refreshCells()
          })
          this.showSuccessMsg({message: 'Changed status successfully'})
        })
        .catch(() => {
          this.showErrorMsg('Changing status failed')
        })
    }
  },
  beforeMount() {
    this.$store.dispatch('invoices/clear')
  }
};
</script>
