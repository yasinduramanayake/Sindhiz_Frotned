<template>
  <div>
    <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showEditModal"
      >Edit</b-btn
    >
    <b-btn size="sm" class="btn-success mb-2" @click="showTrainingReportModal"
      >View Report</b-btn
    >
    <b-btn size="sm" class="btn-danger mb-2 mx-1" @click="showDeleteModal"
      >Delete</b-btn
    >
  </div>
</template>

<script>
export default {
  name: "TrainingActions",
  methods: {
    showTrainingReportModal() {
      this.params.context.componentParent.showViewTrainingReport(
        this.params.data
      );
    },
    showEditModal() {
      this.params.context.componentParent.showEditModal(this.params.data);
    },
    showDeleteModal() {
      this.params.context.componentParent.showDeleteModal(this.params.data);
    }
  }
};
</script>
