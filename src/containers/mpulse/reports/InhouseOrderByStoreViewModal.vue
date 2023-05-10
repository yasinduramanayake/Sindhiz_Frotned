<template>
  <div>
    <b-card>
      <center>
        <h5>
          <b>Full Invoide Cost = {{ getPrice(Math.round(sum)) }}</b>
        </h5>
      </center>
      <br /><br />
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
          {{ firstLetterUpperCase(order.receiverstore) }}
        </template>
        <template #cell(sendername)="data">
          {{ firstLetterUpperCase(order.senderstore) }}
        </template>
        <template #cell(cost)="data">
          {{ getPrice(data.value) }}
        </template>

        <template #cell(fullcost)="data">
          {{ getPrice(data.item.qty * data.item.cost) }}
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import { BRow, BCol, BCard, BTable } from "bootstrap-vue";
import inHouseApi from "@/store/modules/inHouseOrderDetails";
import StoreApi from "@/store/modules/storedetails";
export default {
  name: "InhouseOrderByStoreViewModal",
  components: {
    BRow,
    BTable,
    BCol,
    BCard,
  },
  props: {
    order: Object,
    currentsearch: Object,
  },
  data() {
    return {
      sum: "",
      columnApi: null,
      perPage: "1000000",
      currentPage: "1",
      sortDesc: false,
      sortDirection: "asc",
      sortBy: "",
      quantity: "",
      items: [],
      barcode: "",
      productname: this.order.productname,
      fields: [
        { key: "productname", label: "Product Name", sortable: true },
        { key: "barcode", label: "Bar Code", sortable: true },
        { key: "qty", label: "Quantity", sortable: true },
        { key: "cost", label: "Product Cost", sortable: true },
        { key: "fullcost", label: "Full Cost", sortable: true },
        { key: "updated_at", label: "Ordered Date", sortable: true },
        { key: "recievername", label: "Receiver Name", sortable: true },
      ],
    };
  },
  mounted() {
    this.getInhouseDetail();
  },
  methods: {
    async getInhouseDetail() {
      const payload = {
        id: this.order.receiverstoreid,
        fromDate: this.currentsearch.fromDate,
        toDate: this.currentsearch.toDate,
      };
      const res = await inHouseApi.GetInhouseOrderDetail(payload);
      this.items = res.data.data;
      this.sum = 0;
      for (var i = 0; i < this.items.length; i++) {
        var cost = this.items[i].qty * this.items[i].cost;
        this.sum = this.sum + cost;
      }
    },
  },
};
</script>
