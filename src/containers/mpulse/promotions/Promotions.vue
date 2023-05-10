<template>
  <div className="animated">
    <b-card>
      <b-button-toolbar class="pull-right">
        <b-btn variant="primary" @click="showAddPromotion">Add Promotion</b-btn>
      </b-button-toolbar>
    </b-card>
    <b-card>
      <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />

      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="promotions"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady"
      >
      </ag-grid-vue>
    </b-card>
    <div>
      <b-modal ref="modalAddPromotion" title="Add Promotion" hide-footer @hide="hideAddPromotion" no-enforce-focus>
        <promotion-form-add v-if="canShowAddPromotion" @success="addPromotionSuccess" @cancel="cancelAddPromotion"/>
      </b-modal>
      <b-modal ref="modalEditPromotion" title="Edit Promotion" hide-footer @hide="hideEditPromotion" no-enforce-focus>
        <promotion-form-edit v-if="selectedPromotion" :promotion="selectedPromotion" @success="editPromotionSuccess" @cancel="cancelEditPromotion"/>
      </b-modal>
      <b-modal ref="modalViewSales" title="View Sales" hide-footer size="lg" @hide="hideViewSales" no-enforce-focus>
        <promotion-sales v-if="selectedViewSales" :promotion="selectedViewSales"/>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {AgGridVue} from "ag-grid-vue";
  import { mapState, mapActions } from 'vuex'
  import GridButtons from '../GridButtons'
  import PromotionActions from './PromotionActions'
  import PromotionFormAdd from './PromotionFormAdd'
  import PromotionFormEdit from './PromotionFormEdit'
  import PromotionSales from './PromotionSales'

  export default {
    name: 'Promotions',
    components: {
      AgGridVue,
      GridButtons,
      PromotionActions,
      PromotionFormAdd,
      PromotionFormEdit,
      PromotionSales
    },
    computed: mapState({
      promotions: state => state.promotions.all
    }),
    data: function () {
      return {
        gridOptions: {
          context: {
            componentParent: this
          },
          defaultColDef: {
            sortable: true,
            resizable: true
          },
          columnDefs: [
            {headerName: 'Subcat', field: 'subcat', filter: 'agTextColumnFilter', minWidth: 80},
            {headerName: 'Promotion Name', field: 'promoname', filter: 'agTextColumnFilter', minWidth: 150},
            {headerName: 'Product Name', field: 'subcat_name', filter: 'agTextColumnFilter', minWidth: 150},
            {headerName: 'Start Date', field: 'startdate', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'End Date', field: 'enddate', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Amount', field: 'amount', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'C T N Acount', field: 'ctnamount', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Available To', field: 'availableTo', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Modified By', field: 'staffname', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Actions', field: 'promoid', minWidth: 180, cellRendererFramework: 'PromotionActions'}
          ],
        },
        canShowAddPromotion: false,
        selectedPromotion: null,
        selectedViewSales: null
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': 'MerchantPulsePromotions_'+ this.$moment().format('YYYY-MM-DD'),
          'columnKeys': ['subcat', 'promoname', 'subcat_name', 'startdate', 'enddate', 'amount', 'ctnamount', 'availableTo', 'staffname']
        }
      },
      gridReady() {
        this.gridOptions.api.sizeColumnsToFit()
      },
      showAddPromotion() {
        this.canShowAddPromotion = true
        this.$refs.modalAddPromotion.show()
      },
      cancelAddPromotion() {
        this.$refs.modalAddPromotion.hide()
      },
      addPromotionSuccess() {
        this.$refs.modalAddPromotion.hide()
        this.$store.dispatch('promotions/getPromotions')
      },
      hideAddPromotion() {
        this.canShowAddPromotion = false
      },
      showEditModal(promotion) {
        this.selectedPromotion = promotion
        this.$refs.modalEditPromotion.show()
      },
      editPromotionSuccess() {
        this.$refs.modalEditPromotion.hide()
        this.$store.dispatch('promotions/getPromotions')
      },
      cancelEditPromotion() {
        this.$refs.modalEditPromotion.hide()
      },
      hideEditPromotion() {
        this.selectedPromotion = null
      },
      showViewSales(promotion) {
        this.selectedViewSales = promotion
        this.$refs.modalViewSales.show()
      },
      hideViewSales() {
        this.selectedViewSales = null
      },
      toggleDisable(promotion) {
        this.$store.dispatch('promotions/toggleDisable', {promoid: promotion.promoid, disable: !promotion.disabled})
          .then(() => {
            this.toggleDisableSuccess()
            this.$store.dispatch('promotions/getPromotions')
          }).catch(() => {
            this.toggleDisableFailed()
          })
      }
    },
    created () {
      this.$store.dispatch('promotions/getPromotions')
      this.$store.dispatch('stores/getStores')
    },
    beforeMount() {
      this.$store.dispatch('promotions/clear')
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
