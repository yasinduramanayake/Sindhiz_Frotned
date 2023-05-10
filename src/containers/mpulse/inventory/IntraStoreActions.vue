<template>
  <div class="h-140">
    <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showChangeReceiverModal">Change Receiver</b-btn>
    <b-btn size="sm" class="btn-success mb-2" @click="showTransactionModal">View Transactions</b-btn>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'IntraStoreActions',
    components: {
    },
    methods: {
      showTransactionModal() {
        this.params.context.componentParent.showViewTransactions(this.params.data)
      },
      showChangeReceiverModal() {
        this.params.context.componentParent.showChangeReceiver(this.params.data)
      }
    }
  }
</script>
