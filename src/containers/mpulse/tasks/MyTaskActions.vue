<template>
<div>
  <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showDetailsModal">Details</b-btn>
  <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showResolveModal">Update</b-btn>
</div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'MyTaskActions',
  methods: {
    showDetailsModal() {
      this.params.context.componentParent.showDetailsModal(this.params.data)
    },
    showResolveModal() {
      this.params.context.componentParent.showResolveModal(this.params.data)
    }
  }
}
</script>
