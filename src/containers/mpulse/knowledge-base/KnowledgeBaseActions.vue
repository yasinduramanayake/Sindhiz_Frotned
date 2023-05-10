<template>
<div>
  <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showDetailsModal">View</b-btn>
  <b-btn size="sm" class="btn-danger mb-2 mx-1" @click="showDeleteModal">Delete</b-btn>
</div>
</template>

<script>
export default {
  name: 'KnowledgeBaseActions',
  methods: {
    showDetailsModal() {
      this.params.context.componentParent.showDetailsModal(this.params.data)
    },
    showDeleteModal() {
      this.params.context.componentParent.showDeleteModal(this.params.data)
    }
  }
}
</script>
