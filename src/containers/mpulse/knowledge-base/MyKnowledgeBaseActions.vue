<template>
  <div>
    <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showDetailsModal"
      >View</b-btn
    >
  </div>
</template>

<script>
export default {
  name: "MyKnowledgeBaseActions",
  methods: {
    showDetailsModal() {
      this.params.context.componentParent.showDetailsModal(this.params.data);
    }
  }
};
</script>
