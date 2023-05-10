<template>
  <div class="animated fadeIn">
    <delivery-report-search @search="onSearch"/>
    <b-card>
      <grid-buttons v-if="currentSearch" :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="deliveryData"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady">
      </ag-grid-vue>
    </b-card>
    <div>
     <b-modal ref="modalViewDelivery" title="View Delivery" hide-footer @hide="hideViewDelivery" no-enforce-focus>
        <delivery-line v-if="selectedDelivery" :deliveryid="selectedDelivery.deliveryid" />
      </b-modal>
      <b-modal ref="modalChangeDeliveryType" title="Select Delivery Type" @ok="selectDeliveryType" no-enforce-focus>
        <v-select :options="deliveryTypeList" placeholder="Select Delivery Type" v-model="selectedDeliveryType"></v-select>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  import DeliveryReportSearch from './DeliveryReportSearch'
  import {AgGridVue} from "ag-grid-vue"
  import GridButtons from '../GridButtons'
  import DeliveryActions from './DeliveryActions'
  import DeliveryLine from './DeliveryLine'
  import vSelect from 'vue-select'

  export default {
    name: 'DeliveryReport',
    components: {
      DeliveryReportSearch,
      AgGridVue,
      GridButtons,
      DeliveryActions,
      DeliveryLine,
      vSelect
    },
    computed:{
      deliveryTypeList() {
        let list = []
        Vue._.forEach(this.$store.state.deliveryTypes.all, (deliveryType) => {
          list.push({label: deliveryType.deliverytypename, value: deliveryType.deliverytypeid})
        })
        return list
      },
      ...mapState({
        deliveryTypes: state => state.deliveryTypes.all,
        deliverys: state => state.deliverys.deliverys
      }),
    },
    watch: {
      deliverys: function(value) {
        this.deliveryData=[];
        _.forEach(value, (ticket) => {
          this.deliveryData.push(Object.assign({}, ticket))
        })
      }
    },
    data: function () {
      return {
        deliveryData:[],
        currentSearch: null,
        selectedDelivery: null,
        selectedDeliveryType:null,
        selectedDeliveryTypeData:null,
        gridOptions: {
          context: {
            componentParent: this
          },
          defaultColDef: {
            sortable: true,
            resizable: true
          },
          columnDefs: [
            {headerName: 'Date/Time', field: 'createdon', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Invoice Delivery Date', field: 'deliverydate', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Invoice Amount', field: 'invoiceamount', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Distributor Name', field: 'distributorname', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Delivery Type', field: 'deliverytypeid', filter: 'agTextColumnFilter', minWidth: 100,
              cellRenderer: (params) => {
                var currentDeliveryType = _.find(this.deliveryTypes, (deliveryType) => (deliveryType.deliverytypeid == params.value))
                  return currentDeliveryType ? currentDeliveryType.deliverytypename : ''
                }
              },
            {headerName: 'Actions', field: 'productid', minWidth: 100, cellRendererFramework: 'DeliveryActions'}
          ]
        }
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': 'MerchantPulse_ReportDelivery_'+this.currentSearch.dateFrom+'_'+this.currentSearch.dateTo,
          'columnKeys': ['createdon', 'deliverytypeid', 'deliverydate', 'invoiceamount', 'distributorname'],
          'processCellCallback':function(params) {
            if (params.value && params.column.colId=="deliverytypeid") {
              return params.node.data.deliverytypename;
            } else {
              return params.value;
            }
          }
        }
      },
      gridReady() {
        this.gridOptions.api.sizeColumnsToFit()
      },
      onSearch(data) {
        this.currentSearch = data
        let params = {
          deliveryTypeId: "",
          deliveryTypeIds:[],
          fromDate: data.dateFrom,
          toDate: data.dateTo,
          storeId:data.store
        }
        this.$store.dispatch('deliverys/getDeliverys', params)
      },
      showViewDelivery(delivery) {
        this.selectedDelivery = delivery
        this.$refs.modalViewDelivery.show()
      },
      hideViewDelivery() {
        this.selectedDelivery = null
      },
      showChangeDeliveryType(data) {
        this.selectedDeliveryTypeData = data
        this.selectedDeliveryType = _.find(this.deliveryTypeList, (deliveryType) => (deliveryType.value == data.deliverytypeid))
        this.$refs.modalChangeDeliveryType.show()
      },
      selectDeliveryType() {
        if (this.selectedDeliveryType.value != this.selectedDeliveryTypeData.deliverytypeid) {
          Vue.axios.post('/saveDeliveryType', {
            deliveryTypeId: this.selectedDeliveryType.value,
            id: this.selectedDeliveryTypeData.deliveryid
          }).then(() => {
            this.selectedDeliveryTypeData.deliverytypeid = this.selectedDeliveryType.value
            this.gridOptions.api.refreshCells()
            this.showSuccessMsg()
          }).catch (error => {
            this.showErrorMsg()
          })
        }
      }
    },
    created () {
      this.$store.dispatch('stores/getStores')
      this.$store.dispatch('deliveryTypes/getDeliveryTypes')
    }
  }
</script>
