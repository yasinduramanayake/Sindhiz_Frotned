<template>
  <div class="h-140">
    <b-btn size="sm" class="btn-success" @click="showInventoryModal"
      >View Inventory</b-btn
    >
  </div>
</template>

<script>
export default {
  name: "StockTakeActions",
  components: {},
  methods: {
    showInventoryModal() {
      this.params.context.componentParent.showInventoryModal(this.params.data);
    }
  }
};
</script>
