<template>
  <div>
    <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showDetailModal"><i class="cui-magnifying-glass"></i></b-btn>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'PayrollReportActions',
    methods: {
      showDetailModal() {
        this.params.context.componentParent.showDetailModal(this.params.data)
      }
    }
  }
</script>
