<template>
  <div className="animated">
    <b-card>
      <v-client-table :columns="columns" :data="products" :options="options" :theme="theme" id="dataTable">
        <b-form-input :ref="'qty'+props.index" :key="props.row.productid" slot="quantity" slot-scope="props" :value="productQtys[props.row.productid]" v-model="productQtys[props.row.productid]" size="sm" class="col-xs-2" ></b-form-input>
      </v-client-table>
    </b-card>

    <submit-delivery v-if="loaded" :products="productQtys" @success="resetProductList"></submit-delivery>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {ClientTable, Event} from 'vue-tables-2'
  import { mapState, mapActions } from 'vuex'
  import SubmitDelivery from "./SubmitDelivery"

  Vue.use(ClientTable)

  export default {
    name: 'AddDelivery',
    components: {
      ClientTable,
      Event,
      SubmitDelivery,
    },
    computed: mapState({
      products: state => state.products.all
    }),
    watch: {
      products: function(values) {
        Vue._.forEach(values, (product) => {
          this.productQtys[product.productid] = 0
        });
        this.loaded = true
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
          uniqueKey: "productid"
        },
        theme: 'bootstrap4',
      }
    },
    methods: {
      resetProductList() {
        Vue._.forEach(this.products, (product) => {
          this.productQtys[product.productid] = 0
        });

        this.$nextTick(() => {
          _.forEach(this.$refs, (element) => {
            element.$el.value = 0
          })
        })
      }
    },
    created () {
      this.$store.dispatch('products/getAllProducts')
      this.$store.dispatch('stores/getStores')
      this.$store.dispatch('deliveryTypes/getDeliveryTypes')
    }
  };
</script>
