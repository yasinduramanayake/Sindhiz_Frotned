<template>
  <div>
    <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showDetailModal">Details</b-btn>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'StoreStatusActions',
    methods: {
      showDetailModal() {
        this.params.context.componentParent.showDetailModal(this.params.data)
      }
    }
  }
</script>
