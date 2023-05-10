<template>
<div className="animated">
  <b-card v-if="canShowPromotionList">
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="bulkPromotions" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <bulk-promotion-edit-list v-if="canShowEditPromotion" :bulkPromotion="selectedPromotion" />
    <b-modal ref="modalEditBulkPromotion" title="Edit Bulk Promotion" hide-footer @hide="hideEditBulkPromotion" no-enforce-focus>
      <bulk-promotion-form-edit v-if="selectedPromotion" :bulkPromotion="selectedPromotion" @success="editBulkPromotionSuccess" @cancel="cancelEditBulkPromotion" />
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
} from 'vuex'
import GridButtons from '../GridButtons'
import BulkPromotionListActions from './BulkPromotionListActions'
import BulkPromotionFormEdit from './BulkPromotionFormEdit'
import BulkPromotionEditList from './BulkPromotionEditList'
export default {
  name: 'Distributors',
  components: {
    AgGridVue,
    GridButtons,
    BulkPromotionListActions,
    BulkPromotionFormEdit,
    BulkPromotionEditList
  },
  computed: mapState({
    bulkPromotions: state => state.bulkPromotions.all
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
            headerName: 'Bulk Promotion ID',
            field: 'bulkpromoid',
            minWidth: 120
          },
          {
            headerName: 'Start Date',
            field: 'startdate',
            minWidth: 120
          },
          {
            headerName: 'End Date',
            field: 'enddate'
          },
          {
            headerName: 'Updated By',
            field: 'staffname'
          },
          {
            headerName: 'Store Names',
            field: 'storenames'
          },
          {
            headerName: 'Disabled',
            field: 'disabled',
            cellRenderer: function(params) {
              return params.data.disabled ? 'Yes' : 'No'
            }
          },
          {
            headerName: 'Created At',
            field: 'created_at'
          },
          {
            headerName: 'Actions',
            cellRendererFramework: 'BulkPromotionListActions',
            filter: null,
            minWidth: 250
          }
        ],
      },
      selectedPromotion: null,
      canShowEditPromotion: false,
      canShowPromotionList: true,
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulseBulkPromotons_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': ['bulkpromoid', 'startdate', 'enddate', 'staffname', 'storenames', 'disabled', 'created_at'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    changeBulkPromotionDisabled(bulkPromotion) {
      this.$store.dispatch('bulkPromotions/changeStatus', {
          bulkPromoId: bulkPromotion.bulkpromoid,
          disable: !bulkPromotion.disabled
        })
        .then((data) => {
          this.changeStatusSuccess()
          // this.$store.dispatch('bulkPromotions/getBulkPromotionList')
          this.gridOptions.api.refreshCells()
        })
        .catch(() => {
          this.changeStatusFaield()
        })
    },
    showEditModal(bulkPromotion) {
      this.selectedPromotion = bulkPromotion
      this.$refs.modalEditBulkPromotion.show()
    },
    editBulkPromotionSuccess() {
      this.$refs.modalEditBulkPromotion.hide()
      this.$store.dispatch('bulkPromotions/getBulkPromotionList')
    },
    cancelEditBulkPromotion() {
      this.$refs.modalEditBulkPromotion.hide()
    },
    hideEditBulkPromotion() {
      this.selectedPromotion = null
    },
    showEditBulkPromotion(bulkPromotion) {
      this.selectedPromotion = null
      this.canShowEditPromotion = false
      this.$nextTick(() => {
        this.selectedPromotion = bulkPromotion
        this.canShowEditPromotion = true
        this.canShowPromotionList = false
      })
    }
  },
  created() {
    this.$store.dispatch('bulkPromotions/getBulkPromotionList')
  },
  notifications: {
    changeStatusSuccess: {
      type: 'success',
      message: 'Disabled status successfully'
    },
    changeStatusFaield: {
      type: 'error',
      message: 'Disabled status failed'
    },
  }
};
</script>
