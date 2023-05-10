<template>
<div className="animated">
  <b-card>
    <b-button-toolbar class="pull-right">
      <b-btn variant="primary" @click="showAddSupplier">Add Supplier</b-btn>
    </b-button-toolbar>
  </b-card>
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="suppliers" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalAddSupplier" title="Add Supplier" hide-footer @hide="hideAddSupplier" no-enforce-focus>
      <supplier-form-add v-if="canShowAddSupplier" @success="addSupplierSuccess" @cancel="cancelAddSupplier" />
    </b-modal>
    <b-modal ref="modalEditSupplier" title="Edit Supplier" hide-footer @hide="hideEditSupplier" no-enforce-focus>
      <supplier-form-edit v-if="selectedSupplier" :supplier="selectedSupplier" @success="editSupplierSuccess" @cancel="cancelEditSupplier" />
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
  mapState,
  mapActions
} from 'vuex'
import GridButtons from '../GridButtons'
import SupplierActions from './SupplierActions'
import SupplierFormAdd from './SupplierFormAdd'
import SupplierFormEdit from './SupplierFormEdit'

export default {
  name: 'Suppliers',
  components: {
    AgGridVue,
    GridButtons,
    SupplierActions,
    SupplierFormAdd,
    SupplierFormEdit
  },
  computed: mapState({
    suppliers: state => state.suppliers.all
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
            headerName: 'Supplier ID',
            field: 'supplierid',
            minWidth: 120
          },
          {
            headerName: 'Supplier Name',
            field: 'suppliername',
            minWidth: 120
          },
          {
            headerName: 'Is Active',
            field: 'isactive',
            cellRenderer: function(params) {
              return params.data.isactive ? 'Yes' : 'No'
            }
          },
          {
            headerName: 'Actions',
            cellRendererFramework: 'SupplierActions',
            filter: null
          }
        ],
      },
      canShowAddSupplier: false,
      selectedSupplier: null,
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulseSuppliers_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': ['supplierid', 'suppliername', 'isactive'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showAddSupplier() {
      this.canShowAddSupplier = true
      this.$refs.modalAddSupplier.show()
    },
    cancelAddSupplier() {
      this.$refs.modalAddSupplier.hide()
    },
    addSupplierSuccess() {
      this.$refs.modalAddSupplier.hide()
      this.$store.dispatch('suppliers/getAllSuppliers')
    },
    hideAddSupplier() {
      this.canShowAddSupplier = false
    },
    showEditModal(supplier) {
      this.selectedSupplier = supplier
      this.$refs.modalEditSupplier.show()
    },
    editSupplierSuccess() {
      this.$refs.modalEditSupplier.hide()
      this.$store.dispatch('suppliers/getAllSuppliers')
    },
    cancelEditSupplier() {
      this.$refs.modalEditSupplier.hide()
    },
    hideEditSupplier() {
      this.selectedSupplier = null
    },
    showPermissionModal(supplier) {
      this.selectedSupplierPermissions = supplier
      this.$refs.modalSupplierPermission.show()
    },
  },
  created() {
    this.$store.dispatch('suppliers/getAllSuppliers')
  }
};
</script>
