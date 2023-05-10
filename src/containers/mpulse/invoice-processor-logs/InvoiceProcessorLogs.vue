<template>
<div className="animated">
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />

    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="invoicesProcessorLogs" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalLogDetail" title="Invoice Processor Details" hide-footer size="lg" no-enforce-focus>
      <log-detail v-if="selectedLog" :processorLog="selectedLog" @success="success" @cancel="cancel" />
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
import LogActions from './LogActions'
import LogDetail from './LogDetail'

export default {
  name: 'InvoiceProcessorLogs',
  components: {
    AgGridVue,
    LogActions,
    LogDetail,
    GridButtons
  },
  computed: mapState({
    invoicesProcessorLogs: state => state.invoicesProcessorLogs.all
  }),
  data: function() {
    return {
      selectedLog: null,
      gridOptions: {
        context: {
          componentParent: this
        },
        defaultColDef: {
          sortable: true,
          resizable: true
        },
        columnDefs: [{
            headerName: 'Invoice #',
            field: 'invoicenumber',
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
            headerName: 'Exception Type',
            field: 'exception_type',
            minWidth: 250,
            filter: 'agTextColumnFilter'
          },
          {
            headerName: 'Created At',
            field: 'created_at',
            minWidth: 150,
            filter: 'agTextColumnFilter'
          },
          {
            headerName: 'Actions',
            field: 'logid',
            minWidth: 100,
            cellRendererFramework: 'LogActions'
          }
        ]
      }
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': this.selectedStore ? 'MerchantPulse_InvoiceProcessor' + this.$moment().format('YYYY-MM-DD') + '_' + this.selectedStore.label : '',
        'columnKeys': ['invoicenumber', 'storename', 'exception_data', 'created_at']
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showDetailModal(log) {
      this.selectedLog = log
      this.$refs.modalLogDetail.show()
    },
    success() {
      this.$store.dispatch('invoicesProcessorLogs/getInvoicesProcessorLogs')
      this.$refs.modalLogDetail.hide()
      this.selectedLog = null
    },
    cancel() {
      this.$refs.modalLogDetail.hide()
      this.selectedLog = null
    }
  },
  created() {
    this.$store.dispatch('invoicesProcessorLogs/getInvoicesProcessorLogs')
  }
};
</script>
