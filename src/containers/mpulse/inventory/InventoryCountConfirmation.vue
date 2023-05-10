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
  name: "InventoryCountConfirmation",
  props: {
    products: Array
  },
  computed: mapState({}),
  data: () => {
    return {
      fields: [
        { key: "index", label: "#" },
        { key: "productName", label: "Product Name" },
        { key: "cartonQty", label: "Carton Quantity" },
        { key: "packetQty", label: "Packet Quantity" }
      ]
    };
  }
};
</script>
