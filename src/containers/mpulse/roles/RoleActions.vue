<template>
  <div>
    <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showEditModal">Edit</b-btn>
    <b-btn size="sm" class="btn-success mb-2" @click="showPermissionModal">Permission</b-btn>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'RoleActions',
    methods: {
      showEditModal() {
        this.params.context.componentParent.showEditModal(this.params.data)
      },
      showPermissionModal() {
        this.params.context.componentParent.showPermissionModal(this.params.data)
      }
    }
  }
</script>
