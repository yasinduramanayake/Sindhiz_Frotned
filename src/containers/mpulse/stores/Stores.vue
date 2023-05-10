<template>
<div className="animated">
  <b-card>
    <b-button-toolbar class="pull-right">
      <b-btn variant="primary" @click="showAddStore">Add Store</b-btn>
    </b-button-toolbar>
  </b-card>
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="stores" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalAddStore" title="Add Store" hide-footer @hide="hideAddStore" no-enforce-focus>
      <store-form-add v-if="canShowAddStore" @success="addStoreSuccess" @cancel="cancelAddStore" />
    </b-modal>
    <b-modal ref="modalEditStore" title="Edit Store" hide-footer @hide="hideEditStore" no-enforce-focus>
      <store-form-edit v-if="selectedStore" :store="selectedStore" @success="editStoreSuccess" @cancel="cancelEditStore" />
    </b-modal>
  </div>
</div>
</template>

<script>
import {
  AgGridVue
} from "ag-grid-vue";
import {
  mapState
} from 'vuex'
import GridButtons from '../GridButtons'
import StoreActions from './StoreActions'
import StoreFormAdd from './StoreFormAdd'
import StoreFormEdit from './StoreFormEdit'

export default {
  name: 'Stores',
  components: {
    AgGridVue,
    GridButtons,
    StoreActions,
    StoreFormAdd,
    StoreFormEdit
  },
  computed: mapState({
    stores: state => state.stores.companystores
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
          minWidth: 100
        },
        columnDefs: [{
            headerName: 'Store ID',
            field: 'storeid',
            minWidth: 40
          },
          {
            headerName: 'Store Name',
            field: 'storename',
            minWidth: 120
          },
          {
            headerName: 'Store Email',
            field: 'storeemail',
            minWidth: 120
          },
          {
            headerName: 'Store Manager',
            field: 'manager.staffname',
            minWidth: 120
          },
          {
            headerName: 'Company',
            field: 'company.companyname',
            minWidth: 120
          }
        ],
      },
      canShowAddStore: false,
      selectedStore: null,
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulseStores_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': ['storeid', 'storename', 'storeemail', 'storeaccounts', 'isactive'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showAddStore() {
      this.canShowAddStore = true
      this.$refs.modalAddStore.show()
    },
    cancelAddStore() {
      this.$refs.modalAddStore.hide()
    },
    addStoreSuccess() {
      this.$refs.modalAddStore.hide()
      this.$store.dispatch('stores/getCompanyStores')
    },
    hideAddStore() {
      this.canShowAddStore = false
    },
    showEditModal(store) {
      this.selectedStore = store
      this.$refs.modalEditStore.show()
    },
    editStoreSuccess() {
      this.$refs.modalEditStore.hide()
      this.$store.dispatch('stores/getCompanyStores')
    },
    cancelEditStore() {
      this.$refs.modalEditStore.hide()
    },
    hideEditStore() {
      this.selectedStore = null
    },
    showPermissionModal(store) {
      this.selectedStorePermissions = store
      this.$refs.modalStorePermission.show()
    },
  },
  created() {
    this.$store.dispatch('stores/getCompanyStores')
  }
};
</script>
