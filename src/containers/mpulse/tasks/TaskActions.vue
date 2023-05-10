<template>
<div>
  <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showDetailsModal">Details</b-btn>
  <b-btn size="sm" class="btn-warning mb-2 mx-1" @click="showUpdateModal" v-if="$auth.check('edit-task')">Update</b-btn>
  <b-btn size="sm" class="btn-danger mb-2 mx-1" @click="showDeleteModal">Delete</b-btn>
</div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'TaskActions',
  methods: {
    showUpdateModal() {
      this.params.context.componentParent.showUpdateModal(this.params.data)
    },
    showDetailsModal() {
      this.params.context.componentParent.showDetailsModal(this.params.data)
    },
    showDeleteModal() {
      this.params.context.componentParent.showDeleteModal(this.params.data)
    }
  }
}
</script>
