<template>
    <div>
      <b-card>
        <table class="table table-bordered">
          <tr>
            <th>Product</th>
            <th>Barcode</th>
            <th>Quantity</th>
          </tr>
          <td>
            <div>{{ productname }}</div>
          </td>
          <td>
            <div>{{ barcode }}</div>
          </td>
          <td>
            <div>{{ quantity }}</div>
          </td>
        </table>
      </b-card>
    </div>
  </template>
  
  <script>
  import { BRow, BCol, BCard } from "bootstrap-vue";
  import inHouseApi from "@/store/modules/inHouseOrderDetails";
  export default {
    name: "InhouseOrderByStoreViewPrint",
    components: {
      BRow,
      BCol,
      BCard,
    },
    props: {
      order: Object,
    },
    data() {
      return {
        quantity: "",
        barcode: "",
        productname: this.order.productname,
      };
    },
    mounted() {
      this.getInhouseDetail();
    },
    methods: {
      async getInhouseDetail() {
        const payload = {
          id: this.order.id,
        };
        const res = await inHouseApi.GetInhouseOrderDetail(payload);
        this.quantity = res.data.data.qty;
        this.barcode = res.data.product.barcode;
      },
    },
  };
  </script>