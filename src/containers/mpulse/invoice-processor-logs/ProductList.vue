<template>
<div>
  <product-search @select="selectProduct"></product-search>
  <b-table v-if="products.length > 0" :items="products" hover bordered :fields="fields" ref="productTable">
    <template v-slot:cell(index)="data">
      {{ data.index + 1 }}
    </template>

    <template v-slot:cell(qty)="data">
      <b-form-input type="number" v-model="productQtys[data.item.productid]"></b-form-input>
    </template>

    <template v-slot:cell(action)="data">
      <b-button variant="danger" @click="removeProduct(data.item.productid)"><i class="fa fa-remove"></i></b-button>
    </template>
  </b-table>

</div>
</template>

<script>
import Vue from 'vue'
import {
  mapState,
} from 'vuex'
import ProductSearch from './ProductSearch'

export default {
  name: 'ProductList',
  components: {
    ProductSearch
  },
  props: {
    storeId: Number,
    invoiceNumber: String
  },
  computed: mapState({}),
  data: () => {
    return {
      products: [],
      productQtys: {},
      fields: [
        {key: 'index', label: '#'},
        {key: 'productname', label: 'Product'},
        {key: 'skuid', label: 'SKUID'},
        {key: 'barcode', label: 'Barcode'},
        {key: 'qty', label: 'Quantity'},
        {key: 'action', label: 'Action'},
      ],
    }
  },
  methods: {
    selectProduct(product) {
      this.productQtys[product.productid] = 0
      this.products.push({
        productid: product.productid,
        productname: product.productname,
        skuid: product.skuid,
        barcode: product.barcode,
        qty: 0
      })
    },
    removeProduct(productid) {
      delete this.productQtys[productid]
      _.remove(this.products, (product) => {
        return product.productid == productid
      })
      this.$refs.productTable.refresh()
    }
  },
  beforeMount() {
    let params = {
      storeId: this.storeId,
      invoiceNumber: this.invoiceNumber
    }
    Vue.axios.post('/getDeliveryBufferProducts', params)
    .then((response) => {
      this.products = response.data
      _.each(this.products, (product) => {
        this.productQtys[product.productid] = product.qty
      })

    })
    .catch((error) => {
      this.showErrorMsg()
    })
  }
}
</script>
