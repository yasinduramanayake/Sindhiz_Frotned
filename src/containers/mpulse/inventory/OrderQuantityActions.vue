<template>
  <div class="h-140">
    <b-btn size="sm" class="btn-success" @click="showOrderQuantityModal">View Order</b-btn>
  </div>
</template>

<script>
export default {
  name: "OrderQuantityActions",
  components: {},
  methods: {
    showOrderQuantityModal() {
      this.params.context.componentParent.showOrderQuantityModal(this.params.data);
    },
  },
};
</script>
