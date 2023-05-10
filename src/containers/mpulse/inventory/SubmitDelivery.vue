<template>
  <div className="animated">
    <b-card>
      <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
        <b-row>
          <b-col sm="4">
            <b-form-group label="Store" label-for="store" >
              <v-select :options="storeList" placeholder="Select Store" v-model="selectedStore"></v-select>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group label="Delivery Type" label-for="store" >
              <v-select :options="deliveryTypeList" placeholder="Select Delivery Type" v-model="selectedDeliveryType"></v-select>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group label="Bind Invoice (Optional)" label-for="invoice" >
              <v-select :options="invoiceList" v-model="selectedInvoice" placeholder="Select Invoice" :disabled="!selectedStore"></v-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <b-button variant="success" class="my-1" @click="showAddInvoice">Add Invoice</b-button>
          </b-col>
          <b-col sm="4">
            <b-button variant="primary" :disabled="!selectedStore || !selectedDeliveryType" @click="submit">Submit</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-modal ref="modalAddInvoice" title="Add Invoice" hide-footer no-enforce-focus>
      <invoice-form-add v-if="canShowAddInvoice" @success="addInvoiceSuccess" @cancel="cancelAddInvoice"/>
    </b-modal>

  </div>
</template>

<script>
  import Vue from 'vue'
  import vSelect from 'vue-select'
  import {AgGridVue} from "ag-grid-vue"
  import { mapState, mapActions } from 'vuex'
  import InvoiceFormAdd from '../invoices/InvoiceFormAdd'

  export default {
    name: 'SubmitDelivery',
    components: {
      vSelect,
      InvoiceFormAdd
    },
    props: {
      products: Object
    },
    computed: {
      storeList() {
        let list = []
        Vue._.forEach(this.$store.state.stores.all, (store) => {
          list.push({label: store.storename, value: store.storeid})
        })
        return list
      },
      deliveryTypeList() {
        let list = []
        Vue._.forEach(this.$store.state.deliveryTypes.all, (deliveryType) => {
          list.push({label: deliveryType.deliverytypename, value: deliveryType.deliverytypeid})
        })
        return list
      },
      invoiceList() {
        let list = []
        Vue._.forEach(this.$store.state.invoices.all, (invoice) => {
          list.push({label: invoice.invoicenumber, value: invoice.invoiceid})
        })
        return list
      }
    },
    watch: {
      selectedStore: function(store) {
        if (store) {
          this.$store.dispatch('invoices/getInvoices', {storeId: store.value})
        } else {
          this.$store.dispatch('invoices/clear')
        }
      }
    },
    data: function () {
      return {
        selectedStore: null,
        selectedDeliveryType: null,
        selectedInvoice: null,
        canShowAddInvoice: false,
        selectedInvoice: null,
      }
    },
    methods: {
      submit() {
        let productData = []
        _.forOwn(this.products, function(value, key) {
          if (value > 0) {
            productData.push({productId: key, qty: value})
          }
         });

        let params = {
          deliveryTypeId: this.selectedDeliveryType.value,
          invoiceId: this.selectedInvoice ? this.selectedInvoice.value : null,
          productData: productData,
          storeId: this.selectedStore.value
        }

        axios
          .post("/submitDelivery", params)
          .then(response => {
            this.selectedStore = null
            this.selectedDeliveryType = null
            this.selectedInvoice = null
            this.$store.dispatch('invoices/clear')
            this.$emit('success')
            this.showSuccessMsg()
          })
          .catch (error => {
            this.showErrorMsg()
          })
      },
      showAddInvoice() {
        this.canShowAddInvoice = true
        this.$refs.modalAddInvoice.show()
      },
      cancelAddInvoice() {
        this.canShowAddInvoice = false
        this.$refs.modalAddInvoice.hide()
      },
      addInvoiceSuccess() {
        this.canShowAddInvoice = false
        this.$refs.modalAddInvoice.hide()
        if (this.selectedStore) {
          this.$store.dispatch('invoices/getInvoices', {storeId: this.selectedStore.value})
        }
      },
    },
    beforeMount() {
      this.$store.dispatch('invoices/clear')
    }
  };
</script>
