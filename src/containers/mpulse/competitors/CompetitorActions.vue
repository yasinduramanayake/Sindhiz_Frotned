<template>
<div>
  <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showEditModal">Edit</b-btn>
</div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'CompetitorActions',
  methods: {
    showEditModal() {
      this.params.context.componentParent.showEditModal(this.params.data)
    }
  }
}
</script>
