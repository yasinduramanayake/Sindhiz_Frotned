<template>
  <div class="h-100">
    <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showDetailModal">Details</b-btn>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Switch as cSwitch } from '@coreui/vue'
  export default {
    name: 'LogActions',
    components: {
      cSwitch
    },
    methods: {
      showDetailModal() {
        this.params.context.componentParent.showDetailModal(this.params.data)
      }
    }
  }
</script>
