<template>
<div className="animated">
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="promotions" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalEditBulkPromotionEdit" title="Edit Bulk Promotion Edit" hide-footer @hide="hideEditBulkPromotionEdit" no-enforce-focus>
      <bulk-promotion-form-edit-promotion v-if="selectedBulkPromotionEdit" :bulkPromotionEdit="selectedBulkPromotionEdit" @success="editBulkPromotionEditSuccess" @cancel="cancelEditBulkPromotionEdit" />
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
import BulkPromotionEditListActions from './BulkPromotionEditListActions'
import BulkPromotionFormEditPromotion from './BulkPromotionFormEditPromotion'

export default {
  name: 'BulkPromotionEditList',
  components: {
    AgGridVue,
    GridButtons,
    BulkPromotionEditListActions,
    BulkPromotionFormEditPromotion
  },
  computed: mapState({
    promotions: state => state.bulkPromotions.bulkPromotionList
  }),
  props: {
    bulkPromotion: Object
  },
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
            headerName: 'Subcat Name',
            field: 'subcat_name',
            minWidth: 120
          },
          {
            headerName: 'Amount',
            field: 'amount',
            minWidth: 120
          },
          {
            headerName: 'CTN Amount',
            field: 'ctnamount'
          },
          {
            headerName: 'Disabled',
            field: 'disabled',
            cellRenderer: function(params) {
              return params.data.disabled ? 'Yes' : 'No'
            }
          },
          {
            headerName: 'Actions',
            cellRendererFramework: 'BulkPromotionEditListActions',
            filter: null
          }
        ],
      },
      selectedBulkPromotionEdit: null,
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulseBulkPromotionEdit_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': ['subcat_name', 'amount', 'ctnamount', 'disabled'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    toggleDisable(promotion) {
        this.$store.dispatch('bulkPromotions/toggleDisableBulkEdit', {promoid: promotion.promoid, disable: !promotion.disabled})
          .then(() => {
            this.toggleDisableSuccess()
            this.$store.dispatch('bulkPromotions/getBulkPromotionEditList', this.bulkPromotion.bulkpromoid)
          }).catch((e) => {
            this.toggleDisableFailed()
          })
      },
    showEditModal(bulkPromotionEdit) {
      this.selectedBulkPromotionEdit = bulkPromotionEdit
      this.$refs.modalEditBulkPromotionEdit.show()
    },
    editBulkPromotionEditSuccess() {
      this.$refs.modalEditBulkPromotionEdit.hide()
      this.$store.dispatch('bulkPromotions/getBulkPromotionEditList', this.bulkPromotion.bulkpromoid)
    },
    cancelEditBulkPromotionEdit() {
      this.$refs.modalEditBulkPromotionEdit.hide()
    },
    hideEditBulkPromotionEdit() {
      this.selectedBulkPromotionEdit = null
    },

  },
  created() {
    this.$store.dispatch('bulkPromotions/getBulkPromotionEditList', this.bulkPromotion.bulkpromoid)
  },
  notifications: {
    toggleDisableSuccess: {
      type: 'success',
      message: 'Toggle disabled successfully'
    },
    toggleDisableFailed: {
      type: 'error',
      message: 'Toggle disabled failed'
    }
  }
};
</script>
