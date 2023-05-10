<template>
  <div>
    <table class="table">
      <tr>
        <td>Invoice ID</td>
        <td>{{invoice.invoiceid}}</td>
      </tr>
      <tr>
        <td>Invoice #</td>
        <td>{{invoice.invoicenumber}}</td>
      </tr>
      <tr>
        <td>Delivery Date</td>
        <td>{{invoice.deliverydate}}</td>
      </tr>
      <tr>
        <td>Due Date</td>
        <td>{{invoice.duedate}}</td>
      </tr>
      <tr>
        <td>Company</td>
        <td>{{invoice.distributorname}}</td>
      </tr>
      <tr>
        <td>Amount</td>
        <td>{{invoice.invoiceamount}}</td>
      </tr>
      <tr>
        <td>Store</td>
        <td>{{invoice.storename}}</td>
      </tr>
      <tr>
        <td>Pending</td>
        <td>{{invoice.pending}}</td>
      </tr>
      <tr>
        <td>Updated By</td>
        <td>{{invoice.fullname}}</td>
      </tr>
      <tr>
        <td>Comment</td>
        <td>{{invoice.comments}}</td>
      </tr>

      <tr v-if="files.length > 0">
        <td>Invoice Scans</td>
        <td>
          <li v-for="(file, index) in files" :key="index">
            <b-link :href="file" target="_blank">File {{ index + 1 }}</b-link>
            <b-img v-if="isImage(file)" :src="file" fluid center alt="Invoice image" />
          </li>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'InvoiceDetail',
    props: {
      invoice: Object
    },
    data: function() {
    return {
      files: []
    }},
    methods: {
      isImage(fileurl) {
        let ext = fileurl.split('.').pop();
        return ['jpg', 'jpeg', 'png'].indexOf(ext) > -1 ? true : false
      }
    },
    created() {
      Vue.axios
      .post("getInvoiceFiles", {invoiceId: this.invoice.invoiceid})
      .then(response => {
        this.files = response.data;
        this.showSuccessMsg();
      })
      .catch(error => {
        this.showErrorMsg();
      });
    }
  }
</script>
