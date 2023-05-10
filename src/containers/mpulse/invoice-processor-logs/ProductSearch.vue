<template>
<b-form-group>
  <b-row>
    <b-col sm="9">
      <v-select @search="searchProducts" :options="productList" :filterable="false" v-model="selectedProduct" :placeholder="getPlaceHolder()"></v-select>
    </b-col>
    <b-col sm="3">
      <b-button class="float-right" sz="sm" variant="success" :disabled="!selectedProduct" @click="addProduct">Add Product</b-button>
    </b-col>
  </b-row>
</b-form-group>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'ProductSearch',
  computed: {
    productList() {
      return Vue._.map(this.$store.state.search.productBySearch, (product) => {
        return {
          label: product.productname,
          value: product
        }
      })
    }
  },
  data: () => {
    return {
      selectedProduct: null
    }
  },
  methods: {
    getPlaceHolder() {
      return 'Please input at least 3 characters to search products'
    },
    searchProducts(search, loading) {
      if (search.length >= 3) {
        let params = {
          searchTerm: search,
          searchType: 'both',
          searchLimit: 100
        }
        this.$store.dispatch('search/getProductBySearch', params)
      }
    },
    addProduct() {
      this.$emit('select', this.selectedProduct.value)
      this.selectedProduct = null
      this.$store.dispatch('search/clear')
    }
  },
  created() {
    if (this.$store.state.stores.all.length == 0) {
      this.$store.dispatch('stores/getStores')
    }
  },
};
</script>
