<template>
  <div className="animated">
    <b-card>
      <b-row>
        <b-col
          ><v-select
            :options="supplierList"
            placeholder="Select a supplier"
            :onChange="onSupplierChange"
          ></v-select
        ></b-col>
      </b-row>
    </b-card>

    <b-card>
      <v-client-table
        :columns="columns"
        :data="products"
        :options="options"
        :theme="theme"
        id="dataTable"
      >
        <div slot="stores" slot-scope="props">
          <b-btn variant="success" @click="showSetStores(props.row)">Set Stores</b-btn>
        </div>
      </v-client-table>
    </b-card>

    <div>
      <b-modal
        ref="modalSetStores"
        title="Set Stores"
        hide-footer
        size="lg"
        @hide="hideSetStores"
        no-enforce-focus
      >
        <disable-order-product-stores
          v-if="selectedProduct"
          :product="selectedProduct"
          :supplier="selectedSupplier"
        />
      </b-modal>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import DisableOrderProductStores from './DisableOrderProductStores';

export default {
  name: "DisableOrderProducts",
  components: {
    DisableOrderProductStores
  },
  computed: mapState({
    products: state => state.products.stocktake,
    suppliers: state => state.suppliers.disableOrder
  }),
  watch: {
    suppliers: function(values) {
      this.supplierList = [];
      Vue._.forEach(values, supplier => {
        this.supplierList.push({
          label: supplier.suppliername,
          value: supplier.supplierid
        });
      });
    },
    products: function(values) {
      Vue._.forEach(values, product => {
        this.productDisables[product.productid] = product.isdisable ? true : false;
        this.productDisablesUpdated[product.productid] = this.productDisables[product.productid]
      });
      this.isReady = values.length ? true : false;
    }
  },
  data: function() {
    return {
      selectedSupplier: null,
      selectedProduct: null,
      supplierList: [],
      productDisables: {},
      productDisablesUpdated: {},
      columns: ["barcode", "productname", "categoryname", "stores"],
      options: {
        headings: {
          barcode: "Barcode",
          productname: "Product Name",
          categoryname: "Category Name",
          stores: "Stores"
        },
        sortable: [],
        filterable: ["barcode", "productname", "categoryname"],
        sortIcon: {
          base: "fa",
          up: "fa-sort-asc",
          down: "fa-sort-desc",
          is: "fa-sort"
        },
        pagination: {
          chunk: 5,
          edge: true,
          nav: "scroll"
        },
        perPage: 25,
        uniqueKey: "productid"
      },
      theme: "bootstrap4"
    };
  },
  methods: {
    onSupplierChange(supplier) {
      this.selectedSupplier = supplier;
      if (supplier) {
        this.$store.dispatch("products/getStockTakeProducts", {
          supplierId: supplier.value,
        });
      }
    },
    showSetStores(product) {
      this.selectedProduct = product;
      this.$refs.modalSetStores.show();
    },
    hideSetStores() {
      this.selectedProduct = null;
    },
    changeStore(store) {
      this.selectedStore = store;
      this.clearData();
    },
  },
  created() {
    this.$store.dispatch("suppliers/getDisableOrderSuppliers");
  }
};
</script>
