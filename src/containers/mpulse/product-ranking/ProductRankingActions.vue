<template>
  <div class="h-100">
    <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showDetailModal">Details</b-btn>
    <c-switch class="mx-1" color="primary" variant="3d" size="sm"
      :checked="params.node.data.isPending"
      @change="changeStatus" />
    <b-btn class="btn-ghost-danger" @click="showModal"><i class="fa fa-times fa-lg align-middle pb-3"></i></b-btn>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Switch as cSwitch } from '@coreui/vue'
  export default {
    name: 'InvoiceActions',
    components: {
      cSwitch
    },
    methods: {
      changeStatus(value) {
        if(value != this.params.node.data.isPending) {
          this.params.context.componentParent.changeInvoiceStatus(this.params.node)
        }
      },
      showModal() {
        this.params.context.componentParent.showConfirmDeleteModal(this.params.data)
      },
      showDetailModal() {
        this.params.context.componentParent.showDetailModal(this.params.data)
      }
    }
  }
</script>
