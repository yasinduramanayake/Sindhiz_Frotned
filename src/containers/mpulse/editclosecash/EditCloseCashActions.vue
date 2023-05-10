<template>
  <div class="h-120">
    <b-btn size="sm" class="btn-success mb-2" @click="showEditModal">Edit</b-btn>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Switch as cSwitch } from '@coreui/vue'
  export default {
    name: 'EditCloseCashActions',
    components: {
      cSwitch
    },
    methods: {
      showEditModal() {
        this.params.context.componentParent.showEditModal(this.params.data)
      },
    } 
  }
</script>
