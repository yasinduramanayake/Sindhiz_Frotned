<template>
  <div className="animated">
    <b-card>
      <b-button-toolbar class="pull-right">
        <b-button variant="primary" class="mr-1" @click="showAddBankFeed"
          >Add Bank Feed</b-button
        >
      </b-button-toolbar>
    </b-card>
    <b-card>
      <b-row>
        <b-col>
          <b-form-group label="Store" label-cols-sm="4" label-cols-lg="2">
            <store-select
              v-model="selectedStores"
              multiple
              onlyStaff
            ></store-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button
            class="pull-right"
            variant="success"
            :disabled="selectedStores.length == 0"
            @click="getBankFeeds"
            >Get Bank Feeds</b-button
          >
          <b-form-checkbox
            @change="selectAllStores"
            class="pull-right mr-2 mt-2"
          >
            Select All Stores
          </b-form-checkbox>
        </b-col>
      </b-row>
    </b-card>

    <b-card>
      <grid-buttons
        v-if="selectedStores"
        :gridOptions="gridOptions"
        :exportParams="exportParams"
      />

      <ag-grid-vue
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="bankFeeds"
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
        ref="modalAddBankFeed"
        title="Add Bank Feed"
        hide-footer
        no-enforce-focus
      >
        <bank-feed-form-add
          v-if="canShowAddBankFeed"
          @success="checkBankFeedSuccess"
          @cancel="cancelAddBankFeed"
        />
      </b-modal>
      <b-modal
        ref="modalBankFeedConfirm"
        title="Bank Feed Confirm"
        hide-footer
        no-enforce-focus
        size="xl"
        @hide="hideBankFeedConfirm"
      >
        <bank-feed-confirm v-if="creatingBankFeed" :bankFeed="creatingBankFeed" @cancel="cancelBankFeedConfirm" @success="successBankFeedConfirm"/>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import { mapState } from "vuex";
import GridButtons from "../GridButtons";
import BankFeedFormAdd from "./BankFeedFormAdd";
import BankFeedActions from "./BankFeedActions";
import BankFeedDetail from "./BankFeedDetail";
import BankFeedConfirm from "./BankFeedConfirm";

export default {
  name: "BankFeeds",
  components: {
    AgGridVue,
    BankFeedFormAdd,
    BankFeedActions,
    BankFeedDetail,
    BankFeedConfirm,
    GridButtons
  },
  computed: mapState({
    bankFeeds: state => state.bankFeeds.all
  }),
  data: function() {
    return {
      storeList: [],
      selectedStores: [],
      canShowAddBankFeed: false,
      selectedBankFeed: null,
      creatingBankFeed: null,
      gridOptions: {
        context: {
          componentParent: this
        },
        rowClassRules: {
          "bg-success": function(params) {
            return params.data.pending === "No";
          }
        },
        defaultColDef: {
          sortable: true,
          resizable: true
        },
        columnDefs: [
          {
            headerName: "ID",
            field: "bankfeedid",
            filter: "agTextColumnFilter",
            minWidth: 80
          },
          {
            headerName: "Store",
            field: "storename",
            filter: "agTextColumnFilter",
            minWidth: 100
          },
          {
            headerName: "Date From",
            field: "datefrom",
            filter: "agTextColumnFilter",
            minWidth: 110
          },
          {
            headerName: "Date To",
            field: "dateto",
            filter: "agTextColumnFilter",
            minWidth: 110
          },
          {
            headerName: "Total Trans",
            field: "totaltrans",
            filter: "agTextColumnFilter",
            minWidth: 80
          },
          {
            headerName: "Allocated",
            field: "allocatedtrans",
            filter: "agTextColumnFilter",
            minWidth: 80
          },
          {
            headerName: "Created",
            field: "created_at",
            minWidth: 100,
            filter: "agTextColumnFilter"
          },
          {
            headerName: "Created By",
            field: "staffname",
            filter: "agTextColumnFilter",
            minWidth: 120
          },
          {
            headerName: "Actions",
            field: "bankfeedid",
            minWidth: 150,
            cellRendererFramework: "BankFeedActions"
          }
        ]
      }
    };
  },
  methods: {
    exportParams() {
      return {
        fileName: this.selectedStore
          ? "MerchantPulse_" +
            this.$moment().format("YYYY-MM-DD") +
            "_" +
            this.selectedStore.label
          : "",
        columnKeys: [
          "invoicenumber",
          "deliverydate",
          "duedate",
          "distributorname",
          "invoiceamount",
          "storename",
          "fullname"
        ]
      };
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    },
    selectAllStores(value) {
      this.selectedStores = value
        ? Vue._.map(this.$store.state.stores.all, store => {
            return {
              label: store.storename,
              value: store.storeid
            };
          })
        : [];
    },
    getBankFeeds() {
      let params = {
        storeIds: _.map(this.selectedStores, store => {
          return store.value;
        })
      };
      this.$store.dispatch("bankFeeds/getStoresBankFeeds", params);
    },
    showDetailModal(invoice) {
      this.selectedBankFeed = invoice;
      this.$refs.modalBankFeedDetail.show();
    },
    showAddBankFeed() {
      this.canShowAddBankFeed = true;
      this.$refs.modalAddBankFeed.show();
    },
    cancelAddBankFeed() {
      this.canShowAddBankFeed = false;
      this.$refs.modalAddBankFeed.hide();
    },
    checkBankFeedSuccess(bankFeed) {
      this.canShowAddBankFeed = false;
      this.$refs.modalAddBankFeed.hide();
      this.creatingBankFeed = bankFeed;
      this.$refs.modalBankFeedConfirm.show();
    },
    cancelBankFeedConfirm() {
      this.creatingBankFeed = null;
      this.$refs.modalBankFeedConfirm.hide();
    },
    successBankFeedConfirm() {
      this.creatingBankFeed = null;
      this.$refs.modalBankFeedConfirm.hide();
    },
    hideBankFeedConfirm() {
      this.creatingBankFeed = null;
    }
  }
};
</script>
