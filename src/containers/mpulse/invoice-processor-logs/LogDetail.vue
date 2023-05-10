<template>
<div>
  <table class="table">
    <tr>
      <td>Log ID</td>
      <td>{{processorLog.logid}}</td>
    </tr>
    <tr>
      <td>Invoice #</td>
      <td>{{processorLog.invoicenumber}}</td>
    </tr>
    <tr>
      <td>Store</td>
      <td>{{processorLog.storename}}</td>
    </tr>
    <tr>
      <td>Exception Type</td>
      <td>{{processorLog.exception_type}}</td>
    </tr>
    <tr>
      <td>Exception Data</td>
      <td>
        <vue-json-pretty :data="exceptionData"></vue-json-pretty>
      </td>
    </tr>
    <tr>
      <td>Captured Files</td>
      <td>
        <li v-for="(file, index) in files">
          <b-link :href="file" target="_blank">File {{ index + 1 }}</b-link>
        </li>
      </td>
    </tr>
    <tr>
      <td>Known Products</td>
      <td>{{processorLog.known_products}}</td>
    </tr>
    <tr>
      <td>Skipped Products</td>
      <td>{{processorLog.skipped_products}}</td>
    </tr>
    <tr>
      <td>Unknown Products</td>
      <td>{{processorLog.unknown_products}}</td>
    </tr>
    <tr>
      <td>Total Products</td>
      <td>{{processorLog.total_products}}</td>
    </tr>
  </table>

  <b-card sub-title="Current Delivery Lines">
    <delivery-line v-if="processorLog.invoicenumber && processorLog.distributorid" :invoiceNumber="processorLog.invoicenumber" :distributorId="processorLog.distributorid"></delivery-line>
  </b-card>

  <b-card sub-title="Product Select">
    <product-list v-if="processorLog.invoicenumber && processorLog.storeid" :invoiceNumber="processorLog.invoicenumber" :storeId="processorLog.storeid"></product-list>
  </b-card>


  <b-form-group label="Comments" label-for="barcode">
    <b-form-input type="text" v-model="comments" placeholder="Comments" autofocus />
  </b-form-group>

  <b-form-group>
    <b-form-checkbox id="isReview" v-model="isReview" unchecked-value=false>
      Reviewed
    </b-form-checkbox>
  </b-form-group>

  <b-form-group>
    <b-button variant="primary" :disabled="!comments" @click="onSubmit">Submit</b-button>
    <b-button class="ml-1" type="reset" @click="onCancel">Cancel</b-button>
  </b-form-group>
</div>
</template>

<script>
import Vue from 'vue'
import VueJsonPretty from 'vue-json-pretty'
import DeliveryLine from './DeliveryLine'
import ProductList from './ProductList'


export default {
  name: 'LogDetail',
  props: {
    processorLog: Object
  },
  components: {
    VueJsonPretty,
    DeliveryLine,
    ProductList
  },
  data: function() {
    return {
      files: [],
      comments: null,
      isReview: false,
      exceptionData: null
    }
  },
  methods: {
    onSubmit() {
      let params = {
        logId: this.processorLog.logid,
        comments: this.comments,
        isReview: this.isReview
      }

      Vue.axios.post('/reviewInvoiceProcessLog', params)
        .then(response => {
          this.$emit('success')
        })
    },
    onCancel() {
      this.$emit('cancel')
    }
  },
  beforeMount() {
    this.comments = this.processorLog.comments
    this.isReview = this.processorLog.reviewed
    // this.files = this.processorLog.capture_files ? JSON.parse(this.processorLog.capture_files) : []
    Vue.axios
      .post("getInvoiceLogFiles", {logId: this.processorLog.logid})
      .then(response => {
        this.files = response.data;
        this.showSuccessMsg();
      })
      .catch(error => {
        this.showErrorMsg();
      });
    try {
      this.exceptionData = JSON.parse(this.processorLog.exception_data)
    } catch (e) {
      this.exceptionData = this.processorLog.exception_data
    }
  }
}
</script>
