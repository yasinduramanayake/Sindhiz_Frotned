<template>
  <div class="h-140">
    <b-btn size="sm" class="btn-success mb-2" @click="showEditModal">Edit</b-btn>
    <b-btn size="sm" class="btn-success mx-1 mb-2" @click="showPriceListSubcats">Set Prices</b-btn>
    <c-switch class="mx-1" color="primary" variant="3d" size="sm"
      :checked="params.data.isactive==1"
      @change="toggleActive" />
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Switch as cSwitch } from '@coreui/vue'
  export default {
    name: 'PriceListActions',
    components: {
      cSwitch
    },
    methods: {
      toggleActive(value) {
        let currentValue = this.params.data.isactive == 1
        if(value != currentValue) {
          this.params.context.componentParent.toggleActive(this.params.data)
        }
      },
      showEditModal() {
        this.params.context.componentParent.showEditModal(this.params.data)
      },
      showPriceListSubcats() {
        this.params.context.componentParent.setPrice(this.params.data)
      }
    }
  }
</script>
