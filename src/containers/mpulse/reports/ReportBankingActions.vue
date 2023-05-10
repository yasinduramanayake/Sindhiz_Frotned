<template>
  <div>
    <b-btn size="sm" class="btn-success mb-2" @click="showViewBankedModal">View Banked</b-btn>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'ReportBankingActions',
    methods: {
      showViewBankedModal() {
        this.params.context.componentParent.showViewBanked(this.params.data)
      }
    }
  }
</script>
