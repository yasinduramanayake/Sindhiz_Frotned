<template>
<div>
  <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showEditModal">Edit</b-btn>
  <b-btn size="sm" class="btn-danger mb-2 mx-1" @click="showDeleteModal">Delete</b-btn>
</div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'OrderDeliveryDayActions',
  methods: {
    showEditModal() {
      this.params.context.componentParent.showEditModal(this.params.data)
    },
    showDeleteModal() {
      this.params.context.componentParent.showDeleteModal(this.params.data)
    }
  }
}
</script>
