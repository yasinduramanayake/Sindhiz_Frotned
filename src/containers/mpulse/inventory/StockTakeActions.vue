<template>
  <div class="h-140">
    <b-btn size="sm" class="btn-success" @click="showStockTakeModal">View Stock Take</b-btn>
  </div>
</template>

<script>
export default {
  name: "StockTakeActions",
  components: {},
  methods: {
    showStockTakeModal() {
      this.params.context.componentParent.showStockTakeModal(this.params.data);
    },
  },
};
</script>
