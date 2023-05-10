<template>
  <div class="animated fadeIn">
    <InhouseOrderByStoreSearch @search="onSearch" />

    <b-card v-if="inhouseorders">
      <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="inhouseorders"
        :pagination="true"
        :paginationPageSize="500"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady"
      >
      </ag-grid-vue>
    </b-card>
    <div>
      <b-modal
        ref="modalInHouseOrders"
        title="In House Orders"
        hide-footer
        size="xl"
        @hide="hideOrderByStore"
        no-enforce-focus
      >
        <InhouseOrderByStoreViewModal
          :order="selectedOrder"
          :currentsearch="currentSearch"
        />
      </b-modal>
    </div>
    <div v-if="selectedOrder">
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="order"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="1250px"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
      >
        <section slot="pdf-content">
          <b-card>
            <center>
              <h5>
                <b>Full Invoide Cost = {{ getPrice(Math.round(sum)) }}</b>
              </h5>
            </center>
            <b-table
              striped
              hover
              responsive
              :per-page="perPage"
              :current-page="currentPage"
              :items="items"
              :fields="fields"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
            >
              <template #cell(recievername)="data">
                {{ firstLetterUpperCase(selectedOrder.receiverstore) }}
              </template>
              <template #cell(sendername)="data">
                {{ firstLetterUpperCase(selectedOrder.senderstore) }}
              </template>
              <template #cell(cost)="data">
                {{ getPrice(data.value) }}
              </template>

              <template #cell(fullcost)="data">
                {{ getPrice(data.item.qty * data.item.cost) }}
              </template>
              <!-- <template #cell(fields_sub_attribute)="data">
              {{ firstLetterUpperCase(data.value.audit_sub_attribute) }}
            </template>
            <template #cell(score)="data">
              {{ firstLetterUpperCase(data.value) }}
            </template> -->
            </b-table>
          </b-card>
        </section>
      </vue-html2pdf>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ReportSearchStore from "./ReportSearchStore";
import InhouseOrderByStoreSearch from "./InhouseOrderByStoreSearch";
import StoreApi from "@/store/modules/storedetails";
import VueHtml2pdf from "vue-html2pdf";
import { AgGridVue } from "ag-grid-vue";
import GridButtons from "../GridButtons";
import InhouseOrderByStoreButtons from "./InhouseOrderByStoreButtons";
import InhouseOrderByStoreViewModal from "./InhouseOrderByStoreViewModal";
import inHouseApi from "@/store/modules/inHouseOrderDetails";

export default {
  name: "ReportProfitLoss",
  components: {
    VueHtml2pdf,
    ReportSearchStore,
    AgGridVue,
    InhouseOrderByStoreSearch,
    InhouseOrderByStoreButtons,
    InhouseOrderByStoreViewModal,
    GridButtons,
  },
  computed: {},
  data: function () {
    return {
      pdfOptions: {
        margin: [0, 0, 0, 0],
      },
      columnApi: null,
      perPage: "1000000",
      currentPage: "1",
      items: [],
      sum: "",
      sortDesc: false,
      sortDirection: "asc",
      sortBy: "",
      selectedOrder: null,
      inhouseorders: null,
      currentSearch: null,
      fields: [
        { key: "productname", label: "Product Name", sortable: true },
        { key: "barcode", label: "Bar Code", sortable: true },
        { key: "qty", label: "Quantity", sortable: true },
        { key: "cost", label: "Product Cost", sortable: true },
        { key: "fullcost", label: "Full Cost", sortable: true },
        { key: "sendername", label: "Sender Name", sortable: true },
        { key: "recievername", label: "Receiver Name", sortable: true },
      ],
      gridOptions: {
        context: {
          componentParent: this,
        },
        defaultColDef: {
          sortable: true,
          resizable: true,
          filter: "agTextColumnFilter",
          minWidth: 120,
        },
        columnDefs: [
          {
            headerName: "Sender Store",
            field: "senderstore",
          },
          {
            headerName: "Receiver Store",
            field: "receiverstore",
          },
          {
            headerName: "Full Cost",
            field: "fullcost",
          },
          {
            headerName: "Product Count",
            field: "procount",
          },
          {
            headerName: "Actions",
            field: "actions",
            cellRendererFramework: "InhouseOrderByStoreButtons",
          },
        ],
      },
    };
  },
  methods: {
    exportParams() {
      return {
        fileName:
          "MerchantPulse_ReportInhouseOrderByStore_" +
          this.currentSearch.fromDate +
          "_" +
          this.currentSearch.toDate,
        columnKeys: ["receiverstore", "senderstore", "orderdate"],
      };
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    },
    showInHouseModal(order) {
      this.selectedOrder = order;
      this.$refs.modalInHouseOrders.show();
    },
    hideOrderByStore() {
      this.selectedOrder = null;
    },
    async printInhouseOrder(order) {
      this.selectedOrder = order;
      await this.getInhouseDetail();
      this.$refs.html2Pdf.generatePdf();
    },
    onSearch(data) {
      this.currentSearch = data;
      let params = {
        fromDate: data.fromDate,
        toDate: data.toDate,
      };
      Vue.axios
        .post("/getInhouseOrders", params)
        .then((response) => {
          this.inhouseorders = response.data;
          this.showSuccessMsg();
        })
        .catch(() => {
          this.showErrorMsg();
        });
    },
    async getInhouseDetail() {
      const payload = {
        id: this.selectedOrder.receiverstoreid,
        fromDate: this.currentSearch.fromDate,
        toDate: this.currentSearch.toDate,
      };
      const res = await inHouseApi.GetInhouseOrderDetail(payload);
      this.items = res.data.data;
      this.sum = 0;
      for (var i = 0; i < this.items.length; i++) {
        var cost = this.items[i].qty * this.items[i].cost;
        this.sum = this.sum + cost;
      }
    },
    // async getSenderStore(senderstoreid) {
    //   const payload = {
    //     id: senderstoreid,
    //   };
    //   const res = await StoreApi.GetStoreById(payload);

    //   this.senderstore = res.data.data.storename;
    // },
    // async getSReceiverStore(receiverstoreid) {
    //   const payload = {
    //     id: receiverstoreid,
    //   };
    //   const res = await StoreApi.GetStoreById(payload);

    //   this.reciverstore = res.data.data.storename;
    // },
  },
};
</script>
