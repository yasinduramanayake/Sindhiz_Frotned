<template>
<div className="animated">
  <b-card>
    <b-button-toolbar class="pull-right">
      <b-btn variant="primary" @click="showAddCompany">Add Company</b-btn>
    </b-button-toolbar>
  </b-card>
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="companies" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalAddCompany" title="Add Company" hide-footer @hide="hideAddCompany" no-enforce-focus>
      <company-form-add v-if="canShowAddCompany" @success="addCompanySuccess" @cancel="cancelAddCompany" />
    </b-modal>
    <b-modal ref="modalEditCompany" title="Edit Company" hide-footer @hide="hideEditCompany" no-enforce-focus>
      <company-form-edit v-if="selectedCompany" :company="selectedCompany" @success="editCompanySuccess" @cancel="cancelEditCompany" />
    </b-modal>
  </div>
</div>
</template>

<script>
import {
  AgGridVue
} from "ag-grid-vue";
import {
  mapState
} from 'vuex'
import GridButtons from '../GridButtons'
import CompanyActions from './CompanyActions'
import CompanyFormAdd from './CompanyFormAdd'
import CompanyFormEdit from './CompanyFormEdit'

export default {
  name: 'Companies',
  components: {
    AgGridVue,
    GridButtons,
    CompanyActions,
    CompanyFormAdd,
    CompanyFormEdit
  },
  computed: mapState({
    companies: state => state.companies.all
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
            headerName: 'Company ID',
            field: 'companyid',
            minWidth: 120
          },
          {
            headerName: 'Company Name',
            field: 'companyname',
            minWidth: 120
          },
          {
            headerName: 'Company Email',
            field: 'companyemail',
            minWidth: 120
          },
          {
            headerName: 'Company Accounts',
            field: 'companyaccounts',
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
            cellRendererFramework: 'CompanyActions',
            filter: null
          }
        ],
      },
      canShowAddCompany: false,
      selectedCompany: null,
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulseCompanies_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': ['companyid', 'companyname', 'companyemail', 'companyaccounts', 'isactive'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showAddCompany() {
      this.canShowAddCompany = true
      this.$refs.modalAddCompany.show()
    },
    cancelAddCompany() {
      this.$refs.modalAddCompany.hide()
    },
    addCompanySuccess() {
      this.$refs.modalAddCompany.hide()
      this.$store.dispatch('companies/getAllCompanies')
    },
    hideAddCompany() {
      this.canShowAddCompany = false
    },
    showEditModal(company) {
      this.selectedCompany = company
      this.$refs.modalEditCompany.show()
    },
    editCompanySuccess() {
      this.$refs.modalEditCompany.hide()
      this.$store.dispatch('companies/getAllCompanies')
    },
    cancelEditCompany() {
      this.$refs.modalEditCompany.hide()
    },
    hideEditCompany() {
      this.selectedCompany = null
    },
    showPermissionModal(company) {
      this.selectedCompanyPermissions = company
      this.$refs.modalCompanyPermission.show()
    },
  },
  created() {
    this.$store.dispatch('companies/getAllCompanies')
  }
};
</script>
