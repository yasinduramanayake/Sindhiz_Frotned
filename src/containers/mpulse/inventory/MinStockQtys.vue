<template>
  
  <div className="animated">
    <b-card>
      <b-row>
        <b-col><store-select :change="changeStore" onlyStaff></store-select></b-col>
        <b-col
          ><v-select
            v-if="selectedStore"
            :options="supplierList"
            placeholder="Select a supplier"
            :onChange="onSupplierChange"
          ></v-select
        ></b-col>
      </b-row>
    </b-card>

    <b-card v-if="products.length">
      <v-client-table
        :columns="columns"
        :data="products"
        :options="options"
        :theme="theme"
        id="dataTable"
      >
        <b-form-input
          :ref="'qty' + props.index"
          :key="props.row.productid"
          slot="quantity"
          slot-scope="props"
          :value="productQtys[props.row.productid]"
          v-model="productQtys[props.row.productid]"
          size="sm"
          class="col-xs-2"
        ></b-form-input>
      </v-client-table>
      <b-button
        class="mb-1"
        type="submit"
        variant="primary"
        @click="submit"
        :disabled="!selectedStore"
        >Submit</b-button
      >
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";

export default {
  name: "MinStockQuantity",
  components: {},
  computed: mapState({
    products: state => state.products.min_stock_qty_products,
    suppliers: state => state.suppliers.minStockSuppliers,
    minStockQtys: state => state.products.min_stock
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
    minStockQtys: function(values) {
      Vue._.forEach(values, minStock => {
        this.productQtys[minStock.productid] = minStock.qty;
      });
    }
  },
  data: function() {
    return {
      selectedStore: null,
      selectedSupplier: null,
      supplierList: [],
      productQtys: {},
      columns: [
        "barcode",
        "productname",
        "categoryname",
        "suppliername",
        "quantity"
      ],
      options: {
        headings: {
          barcode: "Barcode",
          productname: "Product Name",
          categoryname: "Category Name",
          suppliername: "Supplier Name",
          quantity: "Quantity"
        },
        sortable: [],
        filterable: [
          "barcode",
          "productname",
          "categoryname",
          "suppliername"
        ],
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
        uniqueKey: "productid"
      },
      theme: "bootstrap4",
    };
  },
  methods: {
    onSupplierChange(supplier) {
      this.selectedSupplier = supplier;
      if (supplier) {
        this.$store.dispatch("products/getMinStockQtyProducts", {
          supplierId: supplier.value,
          storeId: this.selectedStore.value,
        });
      } else {
        this.$store.dispatch("products/clearMinStockQtyProducts");
      }
    },
    changeStore(store) {
      Vue._.forEach(this.products, product => {
        this.productQtys[product.productid] = 0;
      });
      if (store) {
        this.$store.dispatch("products/getMinStockQtys", {
          storeId: store.value
        });
      }
      this.selectedStore = store;
    },
    submit() {
      let productData = [];
      let minStockPrds = this.products;
      console.log(minStockPrds);
      _.forOwn(this.productQtys, function(value, key) {
        console.log(key);
        var result = minStockPrds.find(function(item, index) {
        	if(item.productid == key)
        		return true;
        });
        console.log(result);
        if(result != null && result != undefined && result.hasOwnProperty('productid')){
          productData.push({
            productId: key,
            qty: value
          });
        }
      });

      let params = {
        storeId: this.selectedStore.value,
        productData: productData
      };

      axios
        .post("/submitMinStockQtys", params)
        .then(response => {
          this.showSuccessMsg();
        })
        .catch(error => {
          this.showErrorMsg();
        });
    }
  },
  created() {
    this.$store.dispatch("suppliers/getMinStockQtySuppliers");
  }
};
</script>
