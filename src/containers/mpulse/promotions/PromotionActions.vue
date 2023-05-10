<template>
  <div class="h-140">
    <b-btn size="sm" class="btn-success mb-2" @click="showEditModal">Edit</b-btn>
    <b-btn size="sm" class="btn-success mx-1 mb-2" @click="showViewSalesModal">View Sales</b-btn>
    <c-switch class="mx-1" color="primary" variant="3d" size="sm"
      :checked="params.data.disabled==0"
      @change="toggleDisable" />
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Switch as cSwitch } from '@coreui/vue'
  export default {
    name: 'PromotionActions',
    components: {
      cSwitch
    },
    methods: {
      toggleDisable(value) {
        let currentValue = this.params.data.disabled == 0
        if(value != currentValue) {
          this.params.context.componentParent.toggleDisable(this.params.data)
        }
      },
      showEditModal() {
        this.params.context.componentParent.showEditModal(this.params.data)
      },
      showViewSalesModal() {
        this.params.context.componentParent.showViewSales(this.params.data)
      }
    }
  }
</script>
