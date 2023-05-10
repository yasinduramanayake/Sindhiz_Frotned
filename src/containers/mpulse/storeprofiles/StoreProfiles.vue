<template>
<div className="animated">
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="storeProfiles" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal size="lg" ref="modalEditStoreProfile" title="Edit Store Profile" hide-footer @hide="hideEditStoreProfile" no-enforce-focus>
      <store-profile-form-edit v-if="selectedStoreProfile" :storeProfile="selectedStoreProfile" @success="editStoreProfileSuccess" @cancel="cancelEditStoreProfile" />
    </b-modal>
    <b-modal ref="modalMapInvoicesStoreProfile" title="Map Invoices" hide-footer @hide="hideMapInvoices" no-enforce-focus>
      <store-profile-map-invoices v-if="selectedMapInvoices" :storeProfile="selectedMapInvoices" @success="mapInvoicesSuccess" @cancel="cancelMapInvoices" />
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
import StoreProfileActions from './StoreProfileActions'
import StoreProfileFormEdit from './StoreProfileFormEdit'
import StoreProfileMapInvoices from './StoreProfileMapInvoices'

export default {
  name: 'StoreProfiles',
  components: {
    AgGridVue,
    GridButtons,
    StoreProfileActions,
    StoreProfileFormEdit,
    StoreProfileMapInvoices
  },
  computed: mapState({
    storeProfiles: state => state.storeProfiles.all
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
            headerName: 'Store Name',
            field: 'storename',
            minWidth: 100
          },
          {
            headerName: 'Manager',
            field: 'staffname',
            minWidth: 100
          },
          {
            headerName: 'State',
            field: 'state',
            minWidth: 50
          },
          {
            headerName: 'Actions',
            cellRendererFramework: 'StoreProfileActions',
            filter: false,
            minWidth: 120
          }
        ],
      },
      canShowAddStoreProfile: false,
      selectedStoreProfile: null,
      selectedMapInvoices: null
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulseStoreProfile_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': ['storename', 'changelimit', 'state', 'staffname', 'ctnperc', 'pktperc', 'tobacperc', 'cigarperc'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showEditModal(storeProfile) {
      this.selectedStoreProfile = storeProfile
      this.$refs.modalEditStoreProfile.show()
    },
    editStoreProfileSuccess() {
      this.$refs.modalEditStoreProfile.hide()
      this.$store.dispatch('storeProfiles/getStoreProfiles')
    },
    cancelEditStoreProfile() {
      this.$refs.modalEditStoreProfile.hide()
    },
    hideEditStoreProfile() {
      this.selectedStoreProfile = null
    },
    showMapInvoicesModal(storeProfile) {
      this.selectedMapInvoices = storeProfile
      this.$refs.modalMapInvoicesStoreProfile.show()
    },
    mapInvoicesSuccess() {
      this.$refs.modalMapInvoicesStoreProfile.hide()
    },
    cancelMapInvoices() {
      this.$refs.modalMapInvoicesStoreProfile.hide()
    },
    hideMapInvoices() {
      this.selectedMapInvoices = null
    },

  },
  created() {
    this.$store.dispatch('storeProfiles/getStoreProfiles')
  }
};
</script>
