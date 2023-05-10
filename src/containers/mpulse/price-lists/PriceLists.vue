<template>
  <div className="animated">
    <b-card>
      <b-button-toolbar class="pull-right">
        <b-btn variant="primary" @click="showAddPriceList">Create PriceList</b-btn>
      </b-button-toolbar>
    </b-card>
    <b-card>
      <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />

      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="priceLists"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady"
      >
      </ag-grid-vue>
    </b-card>
    <div>
      <b-modal ref="modalAddPriceList" title="Create PriceList" hide-footer @hide="hideAddPriceList" no-enforce-focus>
        <price-list-form-add v-if="canShowAddPriceList" @success="addPriceListSuccess" @cancel="cancelAddPriceList"/>
      </b-modal>
      <b-modal ref="modalEditPriceList" title="Edit PriceList" hide-footer @hide="hideEditPriceList" no-enforce-focus>
        <price-list-form-edit v-if="selectedPriceList" :priceList="selectedPriceList" @success="editPriceListSuccess" @cancel="cancelEditPriceList"/>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {AgGridVue} from "ag-grid-vue";
  import { mapState, mapActions } from 'vuex'
  import GridButtons from '../GridButtons'
  import PriceListActions from './PriceListActions'
  import PriceListFormAdd from './PriceListFormAdd'
  import PriceListFormEdit from './PriceListFormEdit'

  export default {
    name: 'PriceLists',
    components: {
      AgGridVue,
      GridButtons,
      PriceListActions,
      PriceListFormAdd,
      PriceListFormEdit,
    },
    computed: mapState({
      priceLists: state => state.marketPriceLists.all
    }),
    data: function () {
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
          columnDefs: [
            {headerName: 'Start Date', field: 'startdate'},
            {headerName: 'End Date', field: 'enddate'},
            {headerName: 'Competitor', field: 'competitorname', minWidth: 120},
            {headerName: 'Staff', field: 'staffname', minWidth: 120},
            {headerName: 'Actions', field: 'listid', minWidth: 180, cellRendererFramework: 'PriceListActions'}
          ],
        },
        canShowAddPriceList: false,
        selectedPriceList: null,
        selectedViewSales: null
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': 'MerchantPulsePriceLists_'+ this.$moment().format('YYYY-MM-DD'),
          'columnKeys': ['startdate', 'enddate', 'competitorname', 'staffname']
        }
      },
      gridReady() {
        this.gridOptions.api.sizeColumnsToFit()
      },
      showAddPriceList() {
        this.canShowAddPriceList = true
        this.$refs.modalAddPriceList.show()
      },
      cancelAddPriceList() {
        this.$refs.modalAddPriceList.hide()
      },
      addPriceListSuccess() {
        this.$refs.modalAddPriceList.hide()
        this.$store.dispatch('marketPriceLists/getPriceLists')
      },
      hideAddPriceList() {
        this.canShowAddPriceList = false
      },
      showEditModal(promotion) {
        this.selectedPriceList = promotion
        this.$refs.modalEditPriceList.show()
      },
      editPriceListSuccess() {
        this.$refs.modalEditPriceList.hide()
        this.$store.dispatch('marketPriceLists/getPriceLists')
      },
      cancelEditPriceList() {
        this.$refs.modalEditPriceList.hide()
      },
      hideEditPriceList() {
        this.selectedPriceList = null
      },
      toggleActive(priceList) {
        this.$store.dispatch('marketPriceLists/toggleActive', {listid: priceList.listid, isActive: !priceList.isactive})
          .then(() => {
            this.showMsgSuccess()
          }).catch(() => {
            this.showMsgError()
          })
      },
      setPrice(priceList) {
        this.$router.push({name: 'Manage Price List Subcats', params: { listid: priceList.listid }})
      }
    },
    created () {
      this.$store.dispatch('marketPriceLists/getPriceLists')
      this.$store.dispatch('competitors/getCompetitors')
      this.$store.dispatch('stores/getStores')
    },
    beforeMount() {
    },
    notifications: {
      showMsgSuccess: {
        type: 'success',
        message: 'Success'
      },
      showMsgError: {
        type: 'error',
        message: 'Error'
      }
    }
  };
</script>
