<template>
<div className="animated">
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="deliveryBuffers" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalDiscardConfirm" title="Discard SKU" @ok="discardSKU" @cancel="cancelDiscard" no-enforce-focus>
      <div v-if="selectedSKU" class="d-block text-center">
        <h4>Are you sure you want to discard this SKUID {{ selectedSKU.skuid }}</h4>
      </div>
    </b-modal>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import {
  AgGridVue
} from "ag-grid-vue";
import {
  mapState
} from 'vuex'
import GridButtons from '../GridButtons'
import DeliveryBufferActions from './DeliveryBufferActions'

export default {
  name: 'DeliveryBuffer',
  components: {
    AgGridVue,
    GridButtons,
    DeliveryBufferActions
  },
  computed: mapState({
    deliveryBuffers: state => state.deliveryBuffer.all
  }),
  data: function() {
    return {
      gridOptions: {
        context: {
          componentParent: this
        },
        defaultColDef: {
          sortable: true,
          resizable: true,
          filter: 'agTextColumnFilter',
        },
        columnDefs: [{
            headerName: 'SKUID',
            field: 'skuid',
            minWidth: 80,
            maxWidth: 120
          },
          {
            headerName: 'SKU Name',
            field: 'skuname',
            minWidth: 80,
            maxWidth: 150
          },
          {
            headerName: 'Distributor Name',
            field: 'distributor',
            minWidth: 100,
            maxWidth: 150
          },
          {
            headerName: 'Associated Invoices',
            field: 'invoices',
            minWidth: 80,
            maxWidth: 150,
            cellRenderer: function(params) {
              return params.value.length
            }
          },
          {
            headerName: 'Actions',
            cellRendererFramework: 'DeliveryBufferActions',
            filter: false,
            minWidth: 120
          }
        ],
      },
      selectedSKU: null
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulseDeliveryBuffer_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': ['skuid', 'skuname', 'distributor', 'invoices', 'duedates'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showDiscardSKU(selected) {
      this.selectedSKU = selected
      this.$refs.modalDiscardConfirm.show()
    },
    discardSKU() {
      Vue.axios.post('discardSKU', {
        skuid: this.selectedSKU.skuid,
        deliveryids: this.selectedSKU.deliveryids
      })
      .then((response) => {
        this.showSuccessMsg()
        this.$store.dispatch('deliveryBuffer/getDeliveryBuffers')
      })
      .catch((error) => {
        this.showErrorMsg()
      })
    },
    cancelDiscard() {
      this.selectedSKU = null
    }

  },
  created() {
    this.$store.dispatch('deliveryBuffer/getDeliveryBuffers')
  }
};
</script>
