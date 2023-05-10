<template>
<div className="animated">
  <b-card>
    <b-button-toolbar class="pull-right">
      <b-btn variant="primary" @click="showAddAccount">Add Account</b-btn>
    </b-button-toolbar>
  </b-card>
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="accounts" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalAddAccount" title="Add Account" hide-footer @hide="hideAddAccount" no-enforce-focus>
      <Account-form-add v-if="canShowAddAccount" @success="addAccountSuccess" @cancel="cancelAddAccount" />
    </b-modal>
    <b-modal ref="modalEditAccount" title="Edit Account" hide-footer @hide="hideEditAccount" no-enforce-focus>
      <Account-form-edit v-if="selectedAccount" :account="selectedAccount" @success="editAccountSuccess" @cancel="cancelEditAccount" />
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
import AccountActions from './AccountActions'
import AccountFormAdd from './AccountFormAdd'
import AccountFormEdit from './AccountFormEdit'

export default {
  name: 'Accounts',
  components: {
    AgGridVue,
    GridButtons,
    AccountActions,
    AccountFormAdd,
    AccountFormEdit
  },
  computed: mapState({
    accounts: state => state.accounts.all
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
        columnDefs: [
          {
            headerName: 'Account Name',
            field: 'accountname',
            minWidth: 120
          },
          {
            headerName: 'Tax',
            field: 'tax.taxname',
            minWidth: 120
          },
          {
            headerName: 'Account Type',
            field: 'account_type.account_type',
            minWidth: 120
          },
          {
            headerName: 'Updated By',
            field: 'staff.staffname',
            minWidth: 120
          },
          {
            headerName: 'Actions',
            cellRendererFramework: 'AccountActions',
            filter: null
          }
        ],
      },
      canShowAddAccount: false,
      selectedAccount: null,
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulseAccounts_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': [ 'accountname', 'tax.taxname', 'balance', 'account_type.account_type', 'store.storename', 'staff.staffname'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showAddAccount() {
      this.canShowAddAccount = true
      this.$refs.modalAddAccount.show()
    },
    cancelAddAccount() {
      this.$refs.modalAddAccount.hide()
    },
    addAccountSuccess() {
      this.$refs.modalAddAccount.hide()
      this.$store.dispatch('accounts/getAccounts')
    },
    hideAddAccount() {
      this.canShowAddAccount = false
    },
    showEditModal(Account) {
      this.selectedAccount = Account
      this.$refs.modalEditAccount.show()
    },
    editAccountSuccess() {
      this.$refs.modalEditAccount.hide()
      this.$store.dispatch('accounts/getAccounts')
    },
    cancelEditAccount() {
      this.$refs.modalEditAccount.hide()
    },
    hideEditAccount() {
      this.selectedAccount= null
    },
  },
  created() {
    this.$store.dispatch('accounts/getAccounts')
  }
};
</script>
