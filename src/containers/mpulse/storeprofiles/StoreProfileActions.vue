<template>
  <div>
    <b-btn size="sm" class="btn-success mb-2 mr-1" @click="showEditModal">Edit</b-btn>
    <b-btn size="sm" class="btn-success mb-2 mr-1" @click="showMapInvoicesModal">Map Invoices</b-btn>
    <b-btn size="sm" class="btn-success mb-2 mr-1" @click="showOrderDiliveryDaysModal">Order Delivery Days</b-btn>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'StoreProfileActions',
    methods: {
      showEditModal() {
        this.params.context.componentParent.showEditModal(this.params.data)
      },
      showMapInvoicesModal() {
        this.params.context.componentParent.showMapInvoicesModal(this.params.data)
      },
      showOrderDiliveryDaysModal() {
        this.$router.push({ name: "Manage Order Delivery Days" });
      }
    }
  }
</script>
