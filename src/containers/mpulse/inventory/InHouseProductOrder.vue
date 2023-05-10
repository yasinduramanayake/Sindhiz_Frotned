<template lang="html">
  <div>
    <b-card>
      <b-row>
        <b-col>
            <b-form-group label="Sender Store">
              <store-select v-model="senderStore" ></store-select>
            </b-form-group>
        </b-col>
        <b-col>
            <b-form-group label="Receiver Store">
              <store-select v-model="receiverStore" ></store-select>
            </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Weeks Average">
            <v-select :options="weekList" v-model="selectedWeek"></v-select>
          </b-form-group>
       </b-col>
       <b-col>
         <b-form-group label="Extra by Percent">
             <v-select :options="percentOPtions" v-model="extraPercent" placeholder="Select Percentage"></v-select>
           </b-form-group>
         </b-form-group>
       </b-col>
      </b-row>
      <b-row>
        <b-col >
            <b-form-group label="">
              <b-btn type="submit" variant="success" @click="searchProducts">
                Submit
              </b-btn>
           </b-form-group>
        </b-col>
      </b-row>
    </b-card>
    <div v-if="products !=  null && products.length > 0 && senderStore != null && receiverStore !=null && selectedWeek != null"  class="animated fadeIn">

      <b-card>
        <v-client-table :columns="columns" :data="products" :options="options" :theme="theme" id="dataTable" ref="dataTable">
          <template slot="sendQty" slot-scope="data">
              <b-form-input
                :ref="`spin-${data.index-1}`"
                type="text"
                v-model.lazy.trim="products[data.index -1].sendQty"
                aria-describedby="liveFeedbackName"
              />
        </template>
        </v-client-table>
        <b-button-toolbar class="pull-middle">
          <b-btn align = "center" variant="primary" @click="updateQuantity">Submit</b-btn>
        </b-button-toolbar>
      </b-card>

    </div>

    <!-- <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="order"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
 
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
          <v-client-table :columns="columns" :data="products" :options="options" :theme="theme" id="dataTable" ref="dataTable">
          <template slot="sendQty" slot-scope="data">
              <b-form-input
                :ref="`spin-${data.index-1}`"
                type="text"
                v-model.lazy.trim="products[data.index -1].sendQty"
                aria-describedby="liveFeedbackName"
              />
        </template>
        </v-client-table>
        </section>
    </vue-html2pdf> -->
</div>
</template>

<script>
// import VueHtml2pdf from 'vue-html2pdf'
  import {
    mapState,
    mapActions
  } from 'vuex'
  import Vue from 'vue'
  import filter from 'lodash/filter'


  export default {
    name: 'InHouseProductOrder',

    // components: {
    //   VueHtml2pdf
    // },

    data: function() {
      return {
        weekList: [2, 4, 6, 8],
        selectedWeek: 4,
        storePrds: [],
        senderStore: {label: "Warehouse NSW", value: 46},
        receiverStore: {},
        extraPercent: {    label: '30%',value: 30},
        selectedProduct: Object,
        columns: ['productname', 'barcode','supplier', 'cat', 'avgsale','stockInHand', 'extraPercent', 'sendQty'],
        options: {
          headings: {
            sendQty: 'Order Quantity',
            avgsale: 'Store Avg Sale',
            stockInHand: 'Stock in Store',
            cat: 'Category',
            extraPercent: 'Extra Stock'
          },
          sortable: [],
          filterable: [],
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
        return this.storePrds;
      },
      percentOPtions() {
        let list = []


        list.push({
            label: '30%',
            value: 30
          })
          list.push({
              label: '40%',
              value: 40
            })
            list.push({
                label: '50%',
                value: 50
              })
              list.push({
                  label: '60%',
                  value: 60
                })
                list.push({
                    label: '70%',
                    value: 70
                  })
                  list.push({
                      label: '80%',
                      value: 80
                    })
                    list.push({
                        label: '90%',
                        value: 90
                      })
                      list.push({
                          label: '100%',
                          value: 100
                        })

        return list
      },
    },
    methods: {
      generateReport () {
            this.$refs.html2Pdf.generatePdf()
        },
      updateQuantity(){
       
        let updateProducts = this.storePrds
          ? this.storePrds.map(prd => {
              return {
                productid: prd.productid,
                qty: prd.sendQty,
              };
            })
          : [];
          console.log(updateProducts);
        if(updateProducts.length > 0){
          this.$nextTick(() => {
            let params = {
              products: updateProducts,
              senderstoreid: this.senderStore.value,
              receiverstoreid: this.receiverStore.value
            }
            this.$store
            .dispatch('products/storeInhouseProductsOrder', params)
            .then(response => {
              if (response.data.success == false) {
                this.showErrorMsg({
                  message: response.data.error
                })
              }
              else{
                this.showSuccessMsg({
                  message: 'Order created successfully.'
                });
                params = {
                  senderstoreid: this.senderStore.value,
                  receiverstoreid: this.receiverStore.value,
                  weeks: this.selectedWeek,
                  extraPercent: 130
                }
                this.$store.dispatch('products/getInhouseOrderProducts', params)
                .then(response => {
                  if (response.data.success == false) {
                    this.showErrorMsg({
                      message: response.data.error
                    })
                  }
                  else{
                    this.storePrds = response.data;
                    this.storePrds.foreach(p => p.sendQty = 0);
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

      searchProducts(){
        if(this.senderStore != null && this.receiverStore !=null && this.selectedWeek != null){
          let params = {
            senderstoreid: this.senderStore.value,
            receiverstoreid: this.receiverStore.value,
            weeks: this.selectedWeek,
            extraPercent: this.extraPercent.value

          }
          this.$store.dispatch('products/getInhouseOrderProducts', params)
          .then(response => {
            if (response.data.success == false) {
              this.showErrorMsg({
                message: response.data.error
              })
            }
            else{
              this.storePrds = response.data;
              this.storePrds.foreach(p => p.sendQty = 0);
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
        }
        else{
          this.showErrorMsg({
            message: 'Please select stores and weeks before ordering products'
          })
        }
      }
    },
    created() {
    }
  }
</script>

<style lang="css">
</style>
