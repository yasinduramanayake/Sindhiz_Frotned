<template>
<div>
   <b-card>
      <b-row>
        <b-col sm="6">
          <b-form-group label="Store" label-for="store">
            <store-select v-model="selectedStore" onlyStaff></store-select>
          </b-form-group>
        </b-col>
        <b-col sm="6" v-if="selectedStore">
          <b-form-group label="Supplier" label-for="supplier">
          <v-select
            :options="supplierList"
            placeholder="Select a supplier"
            :onChange="onSupplierChange"
            v-model="selectedSupplier"
          ></v-select>
         </b-form-group>
        </b-col>
      </b-row>
   </b-card>



    <b-card v-if="selectedStore && selectedSupplier && products && products.length >  0">
      <v-client-table
        :columns="columns"
        :data="products"
        :options="options"
        :theme="theme"
        id="dataTable"
      >
        <b-form-input
          :ref="'carton' + props.index"
          :key="props.row.productid"
          slot="cartonQty"
          slot-scope="props"
          :value="cartonQtys[props.row.productid]"
          v-model="cartonQtys[props.row.productid]"
          size="sm"
          class="col-xs-2"
        ></b-form-input>
        <b-form-input
          :ref="'packet' + props.index"
          :key="props.row.productid"
          slot="packetQty"
          slot-scope="props"
          :value="packetQtys[props.row.productid]"
          v-model="packetQtys[props.row.productid]"
          size="sm"
          class="col-xs-2"
        ></b-form-input>
      </v-client-table>
    </b-card>

    <div className="animated" v-if="selectedStore && selectedSupplier && products && products.length >  0">
      <inventory-count-submit
        :cartonQtys="cartonQtys"
        :packetQtys="packetQtys"
        :products="products"
        :selectedSupplier="selectedSupplier"
        :selectedStore="selectedStore"
        @success="resetProductList"
      />
    </div>


  </div>
</template>

<script>
import Vue from "vue";
import { ClientTable, Event } from "vue-tables-2";
import { mapState } from "vuex";
import InventoryCountSubmit from "./InventoryCountSubmit";

Vue.use(ClientTable);

export default {
  name: "InventoryCount",
  components: {
    ClientTable,
    Event,
    InventoryCountSubmit
  },
  computed: mapState({
    products: state => state.products.stocktakebystore,
    suppliers: state => state.suppliers.stocktake
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
      let subProducts = {};
      Vue._.forEach(values, product => {
        this.cartonQtys[product.productid] = 0;
        this.packetQtys[product.productid] = 0;
      });
      this.loaded = true;
    },
    selectedStore: function(values){
      this.selectedSupplier = null;
      this.onSupplierChange(null);
    }
  },
  data: function() {
    return {
      loaded: false,
      cartonQtys: {},
      packetQtys: {},
      columns: [
        "barcode",
        "productname",
        "categoryname",
        "suppliername",
        "sub_product",
        "cartonQty",
        "packetQty"
      ],
      options: {
        headings: {
          barcode: "Barcode",
          productname: "Product Name",
          categoryname: "Category Name",
          suppliername: "Supplier Name",
          sub_product: "Sub Product",
          cartonQty: "Carton Qty",
          packetQty: "Packet Qty"
        },
        sortable: [],
        filterable: ["barcode", "productname", "categoryname", "suppliername"],
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
        perPageValues: [25, 50, 100, 500],
        perPage: 500,
        uniqueKey: "productid",
        customFilters: [
          {
            name: "filterSupplier",
            callback: function(row, query) {
              return row.suppliername == query;
            }
          }
        ]
      },
      theme: "bootstrap4",
      supplierList: [],
      selectedSupplier: null,
      selectedStore: null,
    };
  },
  methods: {
    resetProductList() {
      // this.$router.push({ name: "Dashboard" });
      Vue._.forEach(this.products, product => {
        this.cartonQtys[product.productid] = 0;
        this.packetQtys[product.productid] = 0;
      });

      this.$nextTick(() => {
        _.forEach(this.$refs, element => {
          element.$el.value = 0;
        });
      });
    },
    onSupplierChange(supplier) {
      // Event.$emit('vue-tables.filter::filterSupplier', supplier.value);
      if (supplier) {
        this.$store.dispatch("products/getStockTakeProductsByStore", {
          supplierId: supplier.value,
          storeId: this.selectedStore.value,
        });
      } else {
        this.$store.dispatch("products/clearStockTakeProducts");
      }

      this.selectedSupplier = supplier;
    }
  },
  created() {
    this.$store.dispatch("stores/getStores");
    this.$store.dispatch("suppliers/getStockTakeSuppliers");
  }
};
</script>
