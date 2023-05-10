<template>
  <div className="animated">
    <b-card>
      <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
        <b-row>
          <b-col sm="4">
            <b-button variant="primary" :disabled="!selectedStore || !selectedSupplier" @click="submit">Submit</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <div>
      <b-modal ref="modalConfirm" title="Confirm Submission" @ok="commitSubsission" no-enforce-focus>
        <stock-take-confirmation :products="selectedProducts" />
        <div class="d-block text-center">

        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {AgGridVue} from "ag-grid-vue"
  import StockTakeConfirmation from './StockTakeConfirmation'

  export default {
    name: 'SubmitStockTake',
    components: {
      StockTakeConfirmation
    },
    props: {
      productQtys: Object,
      products: Array,
      selectedSupplier: Object,
      selectedStore: Object
    },
    computed: {
      storeList() {
        let list = []
        Vue._.forEach(this.$store.state.stores.all, (store) => {
          list.push({label: store.storename, value: store.storeid})
        })
        return list
      },
    },
    data: function () {
      return {

        selectedProducts: []
      }
    },
    methods: {
      submit() {
        this.selectedProducts = []

        _.each(this.products, product => {
          if (this.productQtys[product.productid] > 0) {
            this.selectedProducts.push({productId: product.productid, qty: this.productQtys[product.productid], productName: product.productname, isslowsale: product.isslowsale})
          }
        });

        if (this.selectedProducts.length == 0) {
          this.showWarnMsg({message: 'Please update the quantity of products'})
          return
        }

        this.$refs.modalConfirm.show()

      },
      commitSubsission() {
        let productData = []
        let productsTemp = this.products

        _.forOwn(this.productQtys, function(value, key) {
          if (value > 0) {
            var __FOUND = productsTemp.find(function(prd, index) {


            	if(prd.productid == key)
            		return true;
            });
          
            if (__FOUND === undefined){
                productData.push({productId: key, qty: value, isslowsale: false})
            }
            else{
              productData.push({productId: key, qty: value, isslowsale: __FOUND.isslowsale == 1 ? true : false})
            }
          }
        }, this);

        let params = {
          productData: productData,
          storeId: this.selectedStore.value,
          supplierId: this.selectedSupplier.value
        }

        axios
          .post("/stocktakes", params)
          .then(response => {
            this.selectedStore = null
            this.$emit('success')
            this.showSuccessMsg({message: "Stock Take Submitted Successfully", timeout: 30000})
          })
          .catch (error => {
            this.showErrorMsg()
          })
      }
    }
  };
</script>
