<template>
  <div>
    <b-card>
      <b-card-title>Enter Barcode for: {{ skuid }} | {{ skuname }}</b-card-title>
      <b-input-group prepend="Barcode" class="mt-3">
        <b-form-input id="barcode" type="number" v-model="barcode" v-on:keyup.enter="search" placeholder="Barcode" autofocus />
        <b-input-group-append>
          <b-button variant="info" @click="search">Search</b-button>
        </b-input-group-append>
      </b-input-group>
      <v-client-table :columns="columns" :options="options" :data="products">
        <div slot="actions" slot-scope="props" class="text-center">
          <b-button size="sm" variant="success" @click="selectProduct(props.row)">Select</b-button>
        </div>
      </v-client-table>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "DeliveryBufferBarcode",
  props: {
    skuid: String,
    skuname: String
  },
  components: {},
  computed: mapState({
    products: (state) => state.products.byBarcode
  }),

  data() {
    return {
      barcode: null,
      columns: ["productid", "productname", 'suppliername', 'skuid', 'skuname', 'actions'],
      options: {
        headings: {
          productid: "Product ID",
          productname: "Product Name",
          'suppliername': 'Supplier'
        },
        filterable: false,
        pagination: {
          show: false,
        },
      },
    };
  },
  methods: {
    search() {
      this.$store.dispatch("products/getByBarcode", this.barcode);
    },
    selectProduct(product) {
      this.$emit('selected', product)
    }
  },
  created() {
    
  },
};
</script>
