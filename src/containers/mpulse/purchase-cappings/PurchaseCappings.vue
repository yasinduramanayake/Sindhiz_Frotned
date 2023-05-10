<template>
  <div className="animated">
    <b-card>
      <b-form-group label="Store" label-cols-sm="4" label-cols-lg="3">
          <v-select :options="storeList" :onChange="changeStore" placeholder="Select Store" ></v-select>
      </b-form-group>

      <b-button-toolbar class="pull-right">
      <b-button variant="primary" class="mr-1" @click="showAddPurchaseCapping">Add Capping</b-button>
      </b-button-toolbar>
    </b-card>

    <b-card>
      <grid-buttons v-if="selectedStore" :gridOptions="gridOptions" :exportParams="exportParams" />

      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="purchaseCappings"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady"
      >
      </ag-grid-vue>
    </b-card>
    <div>
      <b-modal ref="modalAddPurchaseCapping" title="Add Purchase Capping" hide-footer no-enforce-focus>
        <purchase-capping-form-add v-if="canShowAddPurchaseCapping" @success="addPurchaseCappingSuccess" @cancel="cancelAddPurchaseCapping"/>
      </b-modal>
      <b-modal ref="modalEditPurchaseCapping" title="Edit Purchase Capping" hide-footer no-enforce-focus>
        <purchase-capping-form-edit :purchaseCapping="selectedPurchaseCapping" v-if="selectedPurchaseCapping" @success="editPurchaseCappingSuccess" @cancel="cancelEditPurchaseCapping"/>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import vSelect from 'vue-select'
  import {AgGridVue} from "ag-grid-vue"
  import { mapState, mapActions } from 'vuex'
  import GridButtons from '../GridButtons'
  import PurchaseCappingFormAdd from './PurchaseCappingFormAdd'
  import PurchaseCappingFormEdit from './PurchaseCappingFormEdit'
  import PurchaseCappingActions from './PurchaseCappingActions'

  export default {
    name: 'PurchaseCappings',
    components: {
      vSelect,
      AgGridVue,
      PurchaseCappingFormAdd,
      PurchaseCappingFormEdit,
      PurchaseCappingActions,
      GridButtons
    },
    computed: mapState({
      stores: state => state.stores.all,
      purchaseCappings: state => state.purchaseCappings.all
    }),
    watch: {
      stores: function(values) {
        this.storeList = []
        Vue._.forEach(values, (store) => {
          this.storeList.push({label: store.storename, value: store.storeid})
        });
      }
    },
    data: function () {
      return {
        storeList: [],
        selectedStore: null,
        canShowAddPurchaseCapping: false,
        selectedPurchaseCapping: null,
        gridOptions: {
          context: {
            componentParent: this
          },
          rowClassRules: {
            'bg-success': function(params) { return params.data.pending === 'No'}
          },
          defaultColDef: {
            sortable: true,
            resizable: true,
            filter: 'agTextColumnFilter'
          },
          columnDefs: [
            {headerName: 'PurchaseCapping #', field: 'purchase_capping_id' , minWidth: 100},
            {headerName: 'Supplier', field: 'supplier.suppliername', minWidth: 120},
            {headerName: 'Subcat Name', field: 'sub_cat.subcat_name', minWidth: 120},
            {headerName: 'Subcat', field: 'subcat', minWidth: 100},
            {headerName: 'Capping', field: 'capping', minWidth: 100},
            {headerName: 'Actions', field: 'isactive', minWidth: 100, cellRendererFramework: 'PurchaseCappingActions', filter: null}
          ]
        }
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': this.selectedStore ? 'MerchantPulse_PurchaseCapping_'+ this.$moment().format('YYYY-MM-DD')+'_'+this.selectedStore.label : '',
          'columnKeys': ['purchase_capping_id', 'sub_cat.subcat_name', 'subcat', 'capping', 'isactive']
        }
      },
      gridReady() {
        this.gridOptions.api.sizeColumnsToFit()
      },
      changeStore(store) {
        this.selectedStore = store
        if (store) {
          this.$store.dispatch('purchaseCappings/getPurchaseCappings', {storeId: store.value})
        } else {
          this.$store.dispatch('purchaseCappings/clear')
        }
      },
      showAddPurchaseCapping() {
        this.canShowAddPurchaseCapping = true
        this.$refs.modalAddPurchaseCapping.show()
      },
      cancelAddPurchaseCapping() {
        this.canShowAddPurchaseCapping = false
        this.$refs.modalAddPurchaseCapping.hide()
      },
      addPurchaseCappingSuccess() {
        this.canShowAddPurchaseCapping = false
        this.$refs.modalAddPurchaseCapping.hide()
        if (this.selectedStore) {
          this.$store.dispatch('purchaseCappings/getPurchaseCappings', {storeId: this.selectedStore.value})
        }
      },
      showEditModal(purchaseCapping) {
        this.selectedPurchaseCapping = purchaseCapping
        this.$refs.modalEditPurchaseCapping.show()
      },
      editPurchaseCappingSuccess() {
        this.$refs.modalEditPurchaseCapping.hide()
        if (this.selectedStore) {
          this.$store.dispatch('purchaseCappings/getPurchaseCappings', {storeId: this.selectedStore.value})
        }
      },
      cancelEditPurchaseCapping() {
        this.$refs.modalEditPurchaseCapping.hide()
      },
      hideEditPurchaseCapping() {
        this.selectedPurchaseCapping = null
      },
      changePurchaseCappingStatus(node) {
        this.$store.dispatch('purchaseCappings/changeStatus', {
          purchaseCappingId: node.data.purchase_capping_id,
          isActive: node.data.isactive ? false : true
        })
        .then((data) => {
          data.isactive = node.data.isactive
          node.setData(data)
          this.$nextTick(() => {
            this.gridOptions.api.refreshCells()
          })
          this.changeStatusSuccess()
        })
        .catch(() => {
          this.changeStatusFaield()
        })
      }
    },
    created () {
      this.$store.dispatch('stores/getStores')
      this.$store.dispatch('suppliers/getGlobalSuppliers')
    },
    beforeMount() {
      this.$store.dispatch('purchaseCappings/clear')
    },
    notifications: {
      changeStatusSuccess: {
        type: 'success',
        message: 'Changed status successfully'
      },
      changeStatusFaield: {
        type: 'error',
        message: 'Changing status failed'
      }
    }
  };
</script>
