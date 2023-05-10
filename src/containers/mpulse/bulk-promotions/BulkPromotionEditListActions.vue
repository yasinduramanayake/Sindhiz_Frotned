<template>
<div>
 <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showEditBulkPromotionModal">Edit</b-btn>
  <c-switch class="mx-1" color="primary" variant="3d" size="sm"
      :checked="params.data.disabled==0"
      @change="changeStatus" />
</div>
</template>

<script>
import Vue from 'vue'
import { Switch as cSwitch } from '@coreui/vue'
export default {
  name: 'BulkPromotionEditListActions',
  components: {
    cSwitch
  },
  methods: {
    changeStatus(value) {
      let currentValue = this.params.data.disabled == 0
      if(value != currentValue) {
        this.params.context.componentParent.toggleDisable(this.params.data)
      }
    },
    showEditBulkPromotionModal() {
      this.params.context.componentParent.showEditModal(this.params.data)
    },
  }
}
</script>
