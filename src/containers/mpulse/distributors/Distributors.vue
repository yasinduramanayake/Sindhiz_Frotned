<template>
<div className="animated">
  <b-card>
    <b-button-toolbar class="pull-right">
      <b-btn variant="primary" @click="showAddDistributor">Add Distributor</b-btn>
    </b-button-toolbar>
  </b-card>
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="distributors" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalAddDistributor" title="Add Supplier" hide-footer @hide="hideAddDistributor" no-enforce-focus>
      <distributor-form-add v-if="canShowAddDistributor" @success="addDistributorSuccess" @cancel="cancelAddDistributor" />
    </b-modal>
    <b-modal ref="modalEditDistributor" title="Edit Supplier" hide-footer @hide="hideEditDistributor" no-enforce-focus>
      <distributor-form-edit v-if="selectedDistributor" :distributor="selectedDistributor" @success="editDistributorSuccess" @cancel="cancelEditDistributor" />
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
import DistributorActions from './DistributorActions'
import DistributorFormAdd from './DistributorFormAdd'
import DistributorFormEdit from './DistributorFormEdit'

export default {
  name: 'Distributors',
  components: {
    AgGridVue,
    GridButtons,
    DistributorActions,
    DistributorFormAdd,
    DistributorFormEdit
  },
  computed: mapState({
    distributors: state => state.distributors.all
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
            headerName: 'Distributor Name',
            field: 'distributorname',
            minWidth: 120
          },
          {
            headerName: 'Account',
            field: 'account.accountname',
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
            cellRendererFramework: 'DistributorActions',
            filter: null
          }
        ],
      },
      canShowAddDistributor: false,
      selectedDistributor: null,
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulseDistributor_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': ['distributorname', 'account.accountname', 'isactive'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showAddDistributor() {
      this.canShowAddDistributor = true
      this.$refs.modalAddDistributor.show()
    },
    cancelAddDistributor() {
      this.$refs.modalAddDistributor.hide()
    },
    addDistributorSuccess() {
      this.$refs.modalAddDistributor.hide()
      this.$store.dispatch('distributors/getAllDistributors')
    },
    hideAddDistributor() {
      this.canShowAddDistributor = false
    },
    showEditModal(distributor) {
      this.selectedDistributor = distributor
      this.$refs.modalEditDistributor.show()
    },
    editDistributorSuccess() {
      this.$refs.modalEditDistributor.hide()
      this.$store.dispatch('distributors/getAllDistributors')
    },
    cancelEditDistributor() {
      this.$refs.modalEditDistributor.hide()
    },
    hideEditDistributor() {
      this.selectedDistributor = null
    },
  },
  created() {
    this.$store.dispatch('distributors/getAllDistributors')
  }
};
</script>
