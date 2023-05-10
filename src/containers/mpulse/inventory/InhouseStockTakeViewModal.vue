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
  name: "InhouseStockTakeViewModal",
  props: {
    stocktake: Object,
  },
  computed: mapState({
    products: (state) => state.stockTakes.inhousedetail,
  }),
  data: () => {
    return {
      fields: [
        { key: "index", label: "#" },
        { key: "productname", label: "Product" },
        { key: "qty", label: "Quantity" },
      ],
    };
  },
  beforeMount() {
    this.$store.dispatch("stockTakes/getInhouseStockTakeDetail", {
      stocktakehash: this.stocktake.stocktakehash
    }).then(() => {
      this.showSuccessMsg()
    });
  },
  beforeDestroy() {
    this.$store.dispatch("stockTakes/clearInhouseDetail");
  },
};
</script>
