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
    <b-card v-if="senderStore != null">
      <b-button-toolbar class="pull-right">
        <b-btn align = "right" variant="primary" @click="showAddProduct">Add Product</b-btn>
      </b-button-toolbar>
    </b-card>
    <div v-if="products !=  null && products.length > 0 && senderStore != null"  class="animated fadeIn">
      <b-card >
        <b-row >
          <b-col>
            <b-form-checkbox v-model="showAllProducts"  @change="toggleProducts" size="lg">Show All Products</b-form-checkbox>
          </b-col>
        </b-row>

        <v-client-table :columns="columns" :data="products" :options="options" :theme="theme" id="dataTable" ref="dataTable">
          <template slot="actions" slot-scope="data">
            <b-btn v-if="data.row.isdisable == false" size="sm" variant="outline-primary" @click="deleteProduct(data.row, true)" class="mr-1">Disable</b-btn>
            <b-btn v-if="data.row.isdisable == true" size="sm" variant="outline-primary" @click="deleteProduct(data.row, false)" class="mr-1">Enable</b-btn>
          </template>
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
          <b-btn align = "center" variant="primary" @click="updateQuantity">Update Quantity</b-btn>
        </b-button-toolbar>
      </b-card>
    </div>
    <div v-if="senderStore != null">
      <b-modal ref="modalEditProduct" title="Edit Product" hide-footer @hide="hideEditProduct">
        <in-house-product-edit v-if="selectedProduct"  :selectedProduct="selectedProduct" @success="editProductSuccess" @cancel="cancelEditProduct" />
      </b-modal>
    </div>
    <div  v-if="senderStore != null">
      <b-modal ref="modalAddProduct" title="Add Product" hide-footer >
        <in-house-product-add :storeid="senderStore.value"  @success="addProductSuccess" @cancel="cancelAddProduct" />
      </b-modal>
    </div>
</div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import Vue from 'vue'
  import InHouseProductEdit from './InHouseProductEdit'
  import InHouseProductAdd from './InHouseProductAdd'
  import filter from 'lodash/filter'


  export default {
    name: 'InHouseProductList',

    components: {
      InHouseProductEdit,
      InHouseProductAdd
    },

    data: function() {
      return {
        showAllProducts: false,
        storePrds: [],
        senderStore: {label: "Warehouse NSW", value: 46},
        selectedProduct: Object,
        columns: ['product.barcode', 'product.productname','qty', 'addqty', 'actions'],
        options: {
          headings: {
            'product.barcode': 'Barcode',
            'product.productname': 'Product Name',
            qty: 'Stock in Hand',
            addqty: 'Add Quantiy'
          },
          sortable: ['product.productname', 'product.barcode','qty'],
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
        if(this.showAllProducts == true){
          this.storePrds =  JSON.parse(JSON.stringify(this.$store.state.products.inhouseproducts));

        }
        else{
          this.storePrds =  JSON.parse(JSON.stringify(this.$store.state.products.inhouseproducts)).filter(prd =>{
            return prd.isdisable == 0
          })
        }
        return this.storePrds;
      },

    },
    methods: {
      toggleProducts(){

      },
      updateQuantity(){
        let prds = this.products.filter(p => p.addqty > 0);
        let updateProducts = prds
          ? prds.map(prd => {
              return {
                productid: prd.productid,
                qty: prd.addqty,
                id: prd.id
              };
            })
          : [];
          console.log(updateProducts);
        if(updateProducts.length > 0){
          this.$nextTick(() => {
            let params = {
              products: updateProducts,
              storeid: this.senderStore.value
            }
            this.$store
            .dispatch('products/updateInhouseProductsQty', params)
            .then(response => {
              if (response.data.success == false) {
                this.showErrorMsg({
                  message: response.data.error
                })
              }
              else{
                this.showSuccessMsg({
                  message: 'Record updated successfully.'
                });
                this.$store.dispatch('products/getInhouseProducts', this.senderStore.value);
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
      },
      showAddProduct(){
        this.$refs.modalAddProduct.show();
      },
      cancelAddProduct() {
        this.$refs.modalAddProduct.hide()
      },
      addProductSuccess(device) {
        this.$refs.modalAddProduct.hide();
        this.$store.dispatch('products/getInhouseProducts', this.senderStore.value)
      },
      showEditProduct(product) {
        this.selectedProduct = product
        this.$refs.modalEditProduct.show()
      },
      deleteProduct(product, disable){
        this.$nextTick(() => {
          let params = {
            productid: product.productid,
            storeid: this.senderStore.value,
            id: product.id,
            isdisable: disable
          }
          this.$store
          .dispatch('products/deleteInhouseProduct', params)
          .then(response => {
            if (response.data.success == false) {
              this.showErrorMsg({
                message: response.data.error
              })
            }
            else{
              this.showSuccessMsg({
                message: 'Record Enabled/Disabled successfully.'
              });
              this.$store.dispatch('products/getInhouseProducts', this.senderStore.value);
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
          })

        });

      },
      cancelEditProduct() {
        this.$refs.modalEditProduct.hide();
      },
      editProductSuccess() {
        this.$refs.modalEditProduct.hide();
        this.$store.dispatch('products/getInhouseProducts', this.senderStore.value)
      },
      hideEditProduct() {
        this.selectedProduct = null
      },
      searchProducts(){
        if(this.senderStore != null){
          this.$store.dispatch('products/getInhouseProducts', this.senderStore.value);
        }
        else{
          this.showErrorMsg({
            message: 'Please select store before searching products'
          })
        }
      }
    },
    created() {

      if (this.$store.state.products.inhouseproducts == 0 && this.senderStore != null) {
        this.$store.dispatch('products/getInhouseProducts', this.senderStore.value);
      }
    }
  }
</script>

<style lang="css">
</style>
