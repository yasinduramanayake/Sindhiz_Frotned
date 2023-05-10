<template>
  <div class="animated fadeIn">
    <edit-close-cash-search @search="onSearch"/>
    <b-card>
      <grid-buttons v-if="currentSearch" :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="closeShifts"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady">
      </ag-grid-vue>
    </b-card>
    <div>
     <b-modal ref="modalEditCloseCash" title="Edit Close Cash" hide-footer @hide="hideEditCloseCash" no-enforce-focus>
        <edit-close-cash-form-edit v-if="selectedEditCloseCash" :editCloseCash="selectedEditCloseCash" :store="currentSearch" @success="editCloseCashSuccess" @cancel="cancelEditCloseCash"/>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  import EditCloseCashSearch from './EditCloseCashSearch'
  import {AgGridVue} from "ag-grid-vue"
  import GridButtons from '../GridButtons'
  import EditCloseCashActions from './EditCloseCashActions'
  import EditCloseCashFormEdit from './EditCloseCashFormEdit'

  export default {
    name: 'EditCloseCash',
    components: {
      EditCloseCashSearch,
      AgGridVue,
      GridButtons,
      EditCloseCashActions,
      EditCloseCashFormEdit
    },
    computed: mapState({
      closeShifts: state => state.editClosecash.closeShifts,
      staff: state => state.staff.all
    }),
    data: function () {
      return {
        currentSearch: null,
        selectedEditCloseCash: null,
        gridOptions: {
          context: {
            componentParent: this
          },
          defaultColDef: {
            sortable: true,
            resizable: true
          },
          columnDefs: [
            {headerName: 'Date', field: 'date', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Staff', field: 'fullname', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Shift Type', field: 'shiftname', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Difference', field: 'difference', filter: 'agTextColumnFilter', minWidth: 100},
             {headerName: 'Actions', field: 'productid', minWidth: 100, cellRendererFramework: 'EditCloseCashActions'}

          ]
        }
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': 'MerchantPulse_ReportSalesByProduct_'+this.currentSearch.dateFrom+'_'+this.currentSearch.dateTo,
          'columnKeys': ['date', 'fullname', 'shiftname', 'difference']
        }
      },
      gridReady() {
        this.gridOptions.api.sizeColumnsToFit()
      },
      onSearch(data) {
        this.currentSearch = data

        let params = {
          closingStoreId: data.closingStore,
          dateFrom: data.dateFrom,
          dateTo: data.dateTo
        }
        this.$store.dispatch('editClosecash/getCloseShifts', params)
      },
      showEditModal(editCloseCash) {
          this.selectedEditCloseCash = editCloseCash
          this.$refs.modalEditCloseCash.show()
        },
        editCloseCashSuccess(data) {
          this.$refs.modalEditCloseCash.hide()
          let params = {
            closingStoreId: this.currentSearch.closingStore,
            dateFrom: this.currentSearch.dateFrom,
            dateTo: this.currentSearch.dateTo
          }
          this.$store.dispatch('editClosecash/getCloseShifts', params)
        },
        cancelEditCloseCash() {
          this.$refs.modalEditCloseCash.hide()
        },
        hideEditCloseCash() {
          this.selectedEditCloseCash = null
        },
    },
     created () {
        this.$store.dispatch('stores/getStores')
    },
  }
</script>
