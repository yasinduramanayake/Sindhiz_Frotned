<template>
  <div class="h-100">
    <b-btn size="sm" class="btn-success mb-2" @click="showEditModal">Edit</b-btn>
    <c-switch class="mx-1" color="primary" variant="3d" size="sm"
      :checked="params.node.data.isactive ? true: false"
      @change="changeStatus" />
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Switch as cSwitch } from '@coreui/vue'
  export default {
    name: 'PurchaseCappingActions',
    components: {
      cSwitch
    },
    methods: {
      showEditModal() {
        this.params.context.componentParent.showEditModal(this.params.data)
      },
      changeStatus(value) {
        if(value != this.params.node.data.isactive) {
          this.params.context.componentParent.changePurchaseCappingStatus(this.params.node)
        }
      }
    }
  }
</script>
