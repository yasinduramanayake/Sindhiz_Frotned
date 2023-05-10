<template>
  <div className="animated">
    <b-card v-if="bankFeed">
      <b-row>
        <b-col>
          Store: {{ bankFeed.store.storename }}
        </b-col>
        <b-col>
          Date From: {{ bankFeed.datefrom }}
        </b-col>
        <b-col>
          Date To: {{ bankFeed.dateto }}
        </b-col>
        <b-col>
          <v-select :options="bankFeedTypes" @change="changeBankFeedType" v-model="selectedBankFeedType" placeholder="Select Bank Feed Type"></v-select>
        </b-col>
      </b-row>
      <hr/>
      <b-row>

        <b-col>
          <b-button
            class="pull-left"
            variant="success"
            @click="applyAllRules"
            >Apply all rules</b-button
          >
        </b-col>
      </b-row>
    </b-card>

    <b-card v-if="bankFeed">
      <grid-buttons
        :gridOptions="gridOptions"
        :exportParams="exportParams"
      />

      <ag-grid-vue
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="bankFeed.lines"
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
        ref="modalBankFeedUpdate"
        title="Bank Feed Line Update"
        hide-footer
        no-enforce-focus
        size="xl"
        @hide="hideBankFeedUpdate"
      >
        <bank-feed-detail-update v-if="selectedBankFeedLine" :bankFeedLine="selectedBankFeedLine" @cancel="cancelBankFeedUpdate" @success="successBankFeedUpdate"/>
      </b-modal>
      <b-modal
        ref="modalCreateRule"
        title="Account Rule Create"
        hide-footer
        no-enforce-focus
        size="xl"
        @hide="hideCreateRule"
      >
        <create-rule v-if="selectedBankFeedLine" :bankFeedLine="selectedBankFeedLine" @cancel="cancelCreateRule" @success="successCreateRule"/>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import { mapState } from "vuex";
import GridButtons from "../GridButtons";
import BankFeedDetailActions from "./BankFeedDetailActions";
import BankFeedDetailUpdate from "./BankFeedDetailUpdate";
import CreateRule from "../accounts/CreateRule";

export default {
  name: "BankFeedDetail",
  components: {
    AgGridVue,
    BankFeedDetailActions,
    BankFeedDetailUpdate,
    CreateRule,
    GridButtons
  },
  computed: mapState({
    bankFeed: state => state.bankFeeds.detail
  }),
  watch: {
    bankFeed: function(value) {
      if (value) {
        let params = {
          stores: [value.store.storeid],
          fromDate: value.datefrom,
          toDate: value.dateto
        };
        this.$store.dispatch("invoices/getStoresInvoices", params);
      }
    }
  },
  data: function() {
    return {
      bankFeedTypes: ['All', 'Allocated', 'Unallocated'],
      selectedBankFeedType: 'All',
      selectedBankFeedLine: null,
      gridOptions: {
        context: {
          componentParent: this
        },
        defaultColDef: {
          sortable: true,
          resizable: true
        },
        columnDefs: [
          {
            headerName: "ID",
            field: "bankfeedlineid",
            filter: "agTextColumnFilter",
            minWidth: 80
          },
          {
            headerName: "Transaction Date",
            field: "transdate",
            filter: "agTextColumnFilter",
            minWidth: 100
          },
          {
            headerName: "Description",
            field: "description",
            filter: "agTextColumnFilter",
            minWidth: 120
          },
          {
            headerName: "Distributor",
            field: "distributor.distributorname",
            filter: "agTextColumnFilter",
            minWidth: 100
          },
          {
            headerName: "Amount",
            field: "amount",
            filter: "agTextColumnFilter",
            minWidth: 80
          },
          {
            headerName: "Allocated Account",
            field: "account.accountname",
            filter: "agTextColumnFilter",
            minWidth: 100
          },
          {
            headerName: "Invoice",
            field: "invoice.invoicenumber",
            minWidth: 100,
            filter: "agTextColumnFilter"
          },
          {
            headerName: "Invoice Amount",
            field: "invoice.invoiceamount",
            filter: "agTextColumnFilter",
            minWidth: 80
          },
          {
            headerName: "Actions",
            field: "bankfeedid",
            minWidth: 150,
            cellRendererFramework: "BankFeedDetailActions"
          }
        ]
      }
    };
  },
  methods: {
    exportParams() {
      return {
        fileName: this.selectedStore
          ? "MerchantPulse_BankFeedDetail" +
            this.$moment().format("YYYY-MM-DD") +
            "_" +
            this.bankFeed.store.storename
          : "",
        columnKeys: [
          "bankfeedlineid",
          "transdate",
          "description",
          "distributor.distributorname",
          "amount",
          "account.accountname",
          "invoice.invoicenumber",
          "invoice.invoiceamount"
        ]
      };
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    },
    applyAllRules(){
      let params = {
        bankfeedid: this.$route.params.id,
      }
      Vue.axios
        .post("/bankfeeds/applyAllRules", params)
      .then(response => {
        if (error.response.data.success == true) {
          this.showSuccessMsg({
            message: "Rule applied successfully"
          })
          this.refresh();
        }
        else if (error.response.data.success == false) {
          this.showErrorMsg({
            message: error.response.data.error
          });
        }


      })
      .catch(error => {
        if (error.response.status == 400 || error.response.data.success == false) {
          this.showErrorMsg({
            message: error.response.data.message
          });
        }
        else if (error.response.data.success == false) {
          this.showErrorMsg({
            message: error.response.data.error
          });
        }
        else {
          this.showErrorMsg();
        }
      });
    },
    changeBankFeedType(value) {
      let type = value ? value : "All"
      this.$store.dispatch("bankFeeds/getBankFeedDetail", {
        bankFeedId: this.$route.params.id,
        type: type
      });
    },
    showUpdateModal(bankFeedLine) {
      this.selectedBankFeedLine = bankFeedLine;
      this.$refs.modalBankFeedUpdate.show();
    },
    showCreateRuleModal(bankFeedLine) {
      this.selectedBankFeedLine = bankFeedLine;
      this.$refs.modalCreateRule.show();
    },
    cancelBankFeedUpdate() {
      this.selectedBankFeedLine = null;
      this.$refs.modalBankFeedUpdate.hide();
    },
    cancelCreateRule() {
      this.selectedBankFeedLine = null;
      this.$refs.modalCreateRule.hide();
    },
    successBankFeedUpdate() {
      this.selectedBankFeedLine = null;
      this.$refs.modalBankFeedUpdate.hide();
      this.refresh();
    },
    successCreateRule() {
      this.selectedBankFeedLine = null;
      this.$refs.modalCreateRule.hide();
      this.refresh();
    },
    hideBankFeedUpdate() {
      this.selectedBankFeedLine = null;
    },
    hideCreateRule() {
      this.selectedBankFeedLine = null;
    },
    refresh() {
      this.$store.dispatch("bankFeeds/getBankFeedDetail", {
      bankFeedId: this.$route.params.id,
      type: this.selectedBankFeedType
    });
    }
  },
  created() {
    this.refresh();
  },
};
</script>
