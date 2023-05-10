<template>
  <div>
    <b-table :items="products" hover bordered :fields="fields">
      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "StockTakeViewModal",
  props: {
    stocktake: Object,
  },
  computed: mapState({
    products: (state) => state.stockTakes.detail,
  }),
  data: () => {
    return {
      fields: [
        { key: "index", label: "#" },
        { key: "productname", label: "Product" },
        { key: "suppliername", label: "Supplier" },
        { key: "qty", label: "Quantity" },
      ],
    };
  },
  beforeMount() {
    this.$store.dispatch("stockTakes/getStockTakeDetail", {
      stocktakehash: this.stocktake.stocktakehash,
      supplierId: this.stocktake.supplierid
    }).then(() => {
      this.showSuccessMsg()
    });
  },
  beforeDestroy() {
    this.$store.dispatch("stockTakes/clearDetail");
  },
};
</script>
