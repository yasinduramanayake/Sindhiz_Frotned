<template lang="html">
  <div>
    <b-card>
      <b-row>
        <b-col>
            <store-select  v-model="senderStore" ></store-select>
        </b-col>
        <b-col >
            <b-btn type="submit" variant="success" @click="searchProducts"
              >Submit</b-btn
            >
        </b-col>
      </b-row>
    </b-card>
    <div v-if="products !=  null && products.length > 0 && senderStore != null"  class="animated fadeIn">
      <b-card >
        <v-client-table :columns="columns" :data="products" :options="options" :theme="theme" id="dataTable" ref="dataTable">
          <template slot="addqty" slot-scope="data">
              <b-form-input
                :ref="`spin-${data.index-1}`"
                type="text"
                v-model.lazy.trim="products[data.index -1].addqty"
                aria-describedby="liveFeedbackName"
              />
        </template>
        </v-client-table>
        <b-button-toolbar class="pull-middle">
          <b-btn :disabled="senderStore.value == null" align = "center" variant="primary" @click="updateQuantity">Submit Stock Take</b-btn>
        </b-button-toolbar>
      </b-card>
    </div>
</div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import Vue from 'vue'
  import filter from 'lodash/filter'


  export default {
    name: 'InHouseProductStockTake',

    components: {

    },

    data: function() {
      return {
        storePrds: [],
        senderStore: {},
        selectedProduct: Object,
        columns: ['barcode', 'productname', 'addqty'],
        options: {
          headings: {
            'barcode': 'Barcode',
            'productname': 'Product Name',
            addqty: 'Stock In Hand'
          },
          sortable: ['product.productname', 'product.barcode'],
          filterable: ['product.productname', 'product.barcode'],
          sortIcon: {
            base: 'fa',
            up: 'fa-sort-asc',
            down: 'fa-sort-desc',
            is: 'fa-sort'
          },
          pagination: {
            chunk: 5,
            edge: true,
            nav: 'scroll'
          },
          perPageValues: [25, 50, 100, 500],
          perPage: 500,

        },
        useVuex: false,
        theme: 'bootstrap4',
        template: 'default',
      }
    },
    computed: {
      products(){
        this.storePrds =  JSON.parse(JSON.stringify(this.$store.state.products.inhousestproducts));
        return this.storePrds;
      },
    },
    methods: {
      updateQuantity(){

        if(this.senderStore.value == null){
          this.showErrorMsg({
            message: 'Please select store before submiting stock take.'
          });
          return;
        }
        let prds = this.products.filter(p => p.addqty > 0);
        let stProducts = prds
          ? prds.map(prd => {
              return {
                productid: prd.productid,
                qty: prd.addqty,
                productname: prd.productname
              };
            })
          : [];
        if(stProducts.length > 0){
          this.$nextTick(() => {
            let params = {
              products: stProducts,
              storeid: this.senderStore.value
            }
            this.$store
            .dispatch('products/storeInhouseStockTakeProducts', params)
            .then(response => {
              if (response.data.success == false) {
                this.showErrorMsg({
                  message: response.data.error
                })
              }
              else{
                this.showSuccessMsg({
                  message: 'Records updated successfully.'
                });
                this.$store.dispatch('products/getInhouseStockTakeProducts', this.senderStore.value);
                this.storePrds.foreach(p => p.addqty = 0);
              }
            })
            .catch(error => {

              if (error.response.status == 400) {
                this.showErrorMsg({
                  message: error.response.data.message
                })
              } else if (error.response.status == 422) {
                this.showErrorMsg({
                  message: error.response.data.message
                })
              } else {
                this.showErrorMsg({ message: 'Something went wrong. Please contact administrator.' })
              }
              this.submitted = false;
            })

          });
        }
        else{
          this.showErrorMsg({
            message: "Stock take quantity must be greater than 0 for at least one record."
          })
        }
      },


      searchProducts(){
        if(this.senderStore != null){
          this.$store.dispatch('products/getInhouseStockTakeProducts', this.senderStore.value);
        }
        else{
          this.showErrorMsg({
            message: 'Please select store before searching products'
          })
        }
      }
    },
    created() {
      this.storePrds = [];
    },
    mounted(){
      this.storePrds = [];
    }
  }
</script>

<style lang="css">
</style>
