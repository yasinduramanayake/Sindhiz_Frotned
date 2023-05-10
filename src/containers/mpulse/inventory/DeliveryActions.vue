<template>
  <div class="h-140">
    <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showChangeDeliveryTypeModal">Change Delivery Type</b-btn>
    <b-btn size="sm" class="btn-success mb-2" @click="showDeliveryModal">View Delivery</b-btn>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'DeliveryActions',
    components: {
    },
    methods: {
      showDeliveryModal() {
        this.params.context.componentParent.showViewDelivery(this.params.data)
      },
      showChangeDeliveryTypeModal() {
        this.params.context.componentParent.showChangeDeliveryType(this.params.data)
      }
    }
  }
</script>
