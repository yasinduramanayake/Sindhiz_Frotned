<template>
  <div>
    <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showChangeTransactionTypeModal">Change Transaction Type</b-btn>
    <b-btn size="sm" class="btn-success mb-2" @click="showViewTransactionModal">View Transaction</b-btn>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'ReportBankingActions',
    methods: {
      showViewTransactionModal() {
        this.params.context.componentParent.showViewTransaction(this.params.data)
      },
      showChangeTransactionTypeModal() {
        this.params.context.componentParent.showChangeTransactionType(this.params.data)
      }
    }
  }
</script>
