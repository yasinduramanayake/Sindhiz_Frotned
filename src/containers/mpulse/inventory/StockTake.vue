<template>
  <div className="animated">
    <b-card>
      <b-row>
        <b-col sm="6">
          <b-form-group label="Store" label-for="store" >
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
      <v-client-table :columns="columns" :data="products" :options="options" :theme="theme" id="dataTable">
        <template slot="quantity" slot-scope="props">
          <b-row>
            <b-col>
              <b-form-input :ref="'qty'+props.index" :key="props.row.productid" slot="quantity" :value="productQtys[props.row.productid]" v-model="productQtys[props.row.productid]"  >

              </b-form-input>
              <h6 v-if="props.row.isslowsale == 1">Please enter packets qty.</h6>
            </b-col>

          </b-row>


        </template>

      </v-client-table>
    </b-card>

    <div className="animated" v-if="selectedStore && selectedSupplier && products && products.length >  0">
      <submit-stock-take
           :productQtys="productQtys"
           :products="products"
           :selectedSupplier="selectedSupplier"
           :selectedStore="selectedStore"
           @success="resetProductList">
    </submit-stock-take>
</div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {ClientTable, Event} from 'vue-tables-2'
  import { mapState } from 'vuex'
  import SubmitStockTake from "./SubmitStockTake"

  Vue.use(ClientTable)

  export default {
    name: 'StockTake',
    components: {
      ClientTable,
      Event,
      SubmitStockTake,
    },
    computed: mapState({
      products: state => state.products.stocktakebystore,
      suppliers: state => state.suppliers.stocktake
    }),
    watch: {
      suppliers: function (values) {
        this.supplierList = []
        Vue._.forEach(values, (supplier) => {
          this.supplierList.push({label: supplier.suppliername, value: supplier.supplierid})
        });
      },
      products: function (values) {
        Vue._.forEach(values, (product) => {
          this.productQtys[product.productid] = 0
        });
        this.loaded = true
      },
      selectedStore: function(values){
        this.selectedSupplier = null;
        this.onSupplierChange(null);
      }
    },
    data: function () {
      return {
        loaded: false,
        productQtys: {},
        columns: ['barcode', 'productname', 'categoryname', 'suppliername', 'quantity'],
        options: {
          headings: {
            barcode: 'Barcode',
            productname: 'Product Name',
            categoryname: 'Category Name',
            suppliername: 'Supplier Name',
            quantity: 'Quantity'
          },
          sortable: [],
          filterable: ['barcode', 'productname', 'categoryname', 'suppliername'],
          sortIcon: { base:'fa', up:'fa-sort-asc', down:'fa-sort-desc', is:'fa-sort' },
          pagination: {
            chunk: 5,
            edge: true,
            nav: 'scroll'
          },
          perPageValues: [25, 50, 100, 500],
          perPage: 500,
          uniqueKey: "productid",
          customFilters: [{
            name: 'filterSupplier',
            callback: function (row, query) {
              return row.suppliername == query;
            }
          }]
        },
        theme: 'bootstrap4',
        supplierList: [],
        selectedSupplier: null,
        selectedStore: null,
      }
    },
    methods: {
      resetProductList() {
        this.$router.push({ name: "Dashboard" });
        Vue._.forEach(this.products, (product) => {
          this.productQtys[product.productid] = 0
        });

        this.$nextTick(() => {
          _.forEach(this.$refs, (element) => {
            element.$el.value = 0
          })
        })
      },
      onSupplierChange(supplier) {
        // Event.$emit('vue-tables.filter::filterSupplier', supplier.value);
        if (supplier) {
          this.$store.dispatch("products/getStockTakeProductsByStore", {
            supplierId: supplier.value,
            storeId: this.selectedStore.value,
          });
        } else {
          this.$store.dispatch('products/clearStockTakeProducts');
        }

        this.selectedSupplier = supplier
      }
    },
    created () {
      this.$store.dispatch('suppliers/getStockTakeSuppliers')
    }
  };
</script>
