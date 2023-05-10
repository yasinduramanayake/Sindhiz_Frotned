<template>
  <div>
    <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showViewPayrollModal">View Payroll</b-btn>
    <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showDeleteConfirmModal">Delete</b-btn>
  </div>
</template>

<script>
  export default {
    name: 'PayrollListActions',
    methods: {
      showViewPayrollModal() {
        this.params.context.componentParent.showViewPayrollModal(this.params.data)
      },
      showDeleteConfirmModal() {
        this.params.context.componentParent.showDeleteConfirmModal(this.params.data)
      }
    }
  }
</script>
