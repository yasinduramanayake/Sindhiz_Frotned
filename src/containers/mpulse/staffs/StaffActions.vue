<template>
  <div class="h-140">
    <b-btn size="sm" class="btn-success mr-1 mb-2" @click="showEditModal">Edit</b-btn>
    <b-btn size="sm" class="btn-success mr-1 mb-2" @click="showSetAttributesModal">Set Attributes</b-btn>
    <b-btn size="sm" class="btn-success mr-1 mb-2" @click="showSetStoresModal">Set Stores</b-btn>
    <b-btn size="sm" class="btn-warning mr-1 mb-2" @click="showSendActivation">Resend Activation</b-btn>
    <c-switch class="mx-1" color="primary" variant="3d" size="sm"
      :checked="params.data.isactive == 1"
      @change="toggleActive" />
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Switch as cSwitch } from '@coreui/vue'
  export default {
    name: 'StaffActions',
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
      showSetAttributesModal() {
        this.params.context.componentParent.showSetAttributes(this.params.data)
      },
      showSetStoresModal() {
        this.params.context.componentParent.showSetStores(this.params.data)
      },
      showSendActivation() {
        this.params.context.componentParent.showSendActivation(this.params.data)
      }
    }
  }
</script>
