<template>
<div className="animated">
  <b-card>
    <b-button-toolbar class="pull-right">
      <b-btn variant="primary" @click="showAddPrice">Add Price</b-btn>
    </b-button-toolbar>
  </b-card>
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />

    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="priceListSubcats" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalAddPrice" title="Add Price" hide-footer @hide="hideAddPrice" no-enforce-focus>
      <price-list-subcat-form-add v-if="canShowAddPrice" :priceListSubcat="selectedPriceListSubcat" @success="addPriceListSuccess" @cancel="cancelAddPrice" />
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
import PriceListSubcatActions from './PriceListSubcatActions'
import PriceListSubcatFormAdd from './PriceListSubcatFormAdd'

export default {
  name: 'PriceListSubcats',
  components: {
    AgGridVue,
    GridButtons,
    PriceListSubcatActions,
    PriceListSubcatFormAdd,
  },
  computed: mapState({
    priceListSubcats: state => state.marketPriceListSubcats.all
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
            headerName: 'Subcat',
            field: 'subcat'
          },
          {
            headerName: 'Subcat Name',
            field: 'subcat_name',
            minWidth: 120
          },
          {
            headerName: 'Parket Price',
            field: 'packet_price',
            editable: true,
            valueSetter: (params) => {
              this.$store.dispatch('marketPriceListSubcats/addPrice', {
                listid: this.$route.params.listid,
                subcat: params.data.subcat,
                packetPrice: params.newValue,
                cartonPrice: params.data.carton_price
              }).then((response) => {
                this.gridOptions.api.refreshCells()
                this.showSuccessMsg()
              }).catch((error) => {
                this.showErrorMsg()
              })
            }
          },
          {
            headerName: 'Carton Price',
            field: 'carton_price',
            editable: true,
            valueSetter: (params) => {
              this.$store.dispatch('marketPriceListSubcats/addPrice', {
                listid: this.$route.params.listid,
                subcat: params.data.subcat,
                packetPrice: params.data.packet_price,
                cartonPrice: params.newValue
              }).then((response) => {
                this.gridOptions.api.refreshCells()
                this.showSuccessMsg()
              }).catch((error) => {
                this.showErrorMsg()
              })
            }
          },
          {
            headerName: 'Actions',
            field: 'listid',
            minWidth: 180,
            cellRendererFramework: 'PriceListSubcatActions',
            filter: null
          }
        ],
      },
      canShowAddPrice: false,
      selectedPriceListSubcat: null
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulsePriceListSubcats_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': ['listid', 'subcat', 'subcat_name', 'packet_price', 'carton_price']
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showAddPrice() {
      this.canShowAddPrice = true
      this.$refs.modalAddPrice.show()
    },
    cancelAddPrice() {
      this.$refs.modalAddPrice.hide()
    },
    addPriceListSuccess() {
      this.$refs.modalAddPrice.hide()
      this.$store.dispatch('marketPriceListSubcats/getPriceListSubcats', {
        listid: this.$route.params.listid
      })
    },
    hideAddPrice() {
      this.canShowAddPrice = false
      this.selectedPriceListSubcat = null
    },
    showEditModal(priceListSubcat) {
      this.selectedPriceListSubcat = priceListSubcat
      this.showAddPrice()
    }
  },
  created() {
    this.$store.dispatch('marketPriceListSubcats/getPriceListSubcats', {
      listid: this.$route.params.listid
    })
    this.$store.dispatch('subCategories/getSubCategories')
  }
};
</script>
