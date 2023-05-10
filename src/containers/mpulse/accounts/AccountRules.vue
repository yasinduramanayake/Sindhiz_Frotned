<template>
  <div className="animated">
    <b-card>
      <b-button-toolbar class="pull-right">
        <b-btn variant="primary" @click="showCreateRuleModal">Create Rule</b-btn>
      </b-button-toolbar>
    </b-card>
    <b-card>
      <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />

      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="rules"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady"
      >
      </ag-grid-vue>
    </b-card>
    <div>
      <b-modal
        ref="modalCreateRule"
        title="Account Rule Create"
        hide-footer
        no-enforce-focus
        size="xl"
        @hide="hideCreateRule"
      >
        <create-rule  @cancel="cancelCreateRule" @success="successCreateRule"/>
      </b-modal>
      <b-modal
        ref="modalEditRule"
        title="Account Rule Edit"
        hide-footer
        no-enforce-focus
        size="xl"
        @hide="hideEditRule"
      >
        <edit-rule v-if="selectedAccountRule" :accountRuleId="selectedAccountRule" @cancel="cancelEditRule" @success="successEditRule"/>
      </b-modal>


    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {AgGridVue} from "ag-grid-vue";
  import { mapState, mapActions } from 'vuex'
  import GridButtons from '../GridButtons'
  import AccountRulesAction from './AccountRulesAction'
  import CreateRule from "./CreateRule";
  import EditRule from "./EditRule";

  export default {
    name: 'Roles',
    components: {
      AgGridVue,
      GridButtons,
      AccountRulesAction,
      CreateRule,
      EditRule

    },
    computed: mapState({
      rules: state => state.accounts.accountRules
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
            {headerName: 'Rule Description', field: 'description', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Distributor', field: 'distributor', filter: 'agTextColumnFilter', minWidth: 150},
            {headerName: 'Account', field: 'account', filter: 'agTextColumnFilter', minWidth: 150},
            {headerName: 'Ignore Invoice?', field: 'ignoreinvoice', filter: 'agTextColumnFilter', minWidth: 50},
            {headerName: 'Actions', cellRendererFramework: 'AccountRulesAction', minWidth: 150}
          ],
        },
        selectedAccountRule: null,
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': 'MerchantPulseAccountRules_'+ this.$moment().format('YYYY-MM-DD'),
          'columnKeys': ['description', 'distributor', 'account', 'ignoreinvoice'],
          'allColumns': true
        }
      },
      gridReady() {
        this.gridOptions.api.sizeColumnsToFit()
      },
      showCreateRuleModal(bankFeedLine) {
        this.$refs.modalCreateRule.show();
      },
      cancelCreateRule() {
        this.$refs.modalCreateRule.hide();
      },
      successCreateRule() {
        this.$refs.modalCreateRule.hide();
        this.$store.dispatch('accounts/getAccountRules')
      },
      hideCreateRule() {
        this.selectedBankFeedLine = null;
      },
      showEditRule(rule) {
        this.selectedAccountRule = rule['ruleid']
        console.log(this.selectedAccountRule)
        this.$refs.modalEditRule.show()
      },
      successEditRule() {
        this.$refs.modalEditRule.hide()
        this.$store.dispatch('accounts/getAccountRules')
      },
      cancelEditRule() {
        this.$refs.modalEditRule.hide()
      },
      hideEditRule() {
        this.selectedAccountRule = null
      },
      deleteAccountRule(rule){
        this.$store.dispatch('accounts/deleteAccountRule', rule)
        .then(response => {
          if (response.data.success == false) {
            this.showErrorMsg({
              message: response.data.message
            })
          }
          else{
            this.showSuccessMsg({
              message: 'Record Deleted successfully.'
            });
            this.$store.dispatch('accounts/getAccountRules')
          }

        })
        .catch(error => {
          console.log(error)
          this.showErrorMsg({message: error.response.data.message })
        });
      }
    },
    created () {
      this.$store.dispatch('accounts/getAccountRules')
    },
  };
</script>
