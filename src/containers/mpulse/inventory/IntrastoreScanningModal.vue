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
import Vue from 'vue'
import { mapState } from "vuex";
export default {
  name: "IntrastoreScanningModal",
  props: {
    products: Array
  },
  computed: mapState({
  }),
  data: () => {
    return {
      fields: [
        { key: "index", label: "#" },
        { key: "productname", label: "Product" },
        { key: "quantity", label: "Quantity" },
      ],
    };
  },
  
};
</script>
