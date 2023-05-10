<template>
  <div class="h-140">
    <b-btn size="sm" class="btn-success mb-2" @click="showEditModal">Edit</b-btn>
    <b-btn size="sm" class="btn-success mx-1 mb-2" @click="showSetStorePriceModal">Set Store Price</b-btn>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Switch as cSwitch } from '@coreui/vue'
  export default {
    name: 'ProductActions',
    components: {
      cSwitch
    },
    methods: {
      showEditModal() {
        this.params.context.componentParent.showEditModal(this.params.data)
      },
      showSetStorePriceModal() {
        this.params.context.componentParent.showSetStorePriceModal(this.params.data)
      }
    } 
  }
</script>
