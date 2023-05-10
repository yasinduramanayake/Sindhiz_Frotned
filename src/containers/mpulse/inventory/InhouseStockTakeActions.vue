<template>
  <div class="h-140">
    <b-btn size="sm" class="btn-success" @click="showInhouseStockTakeModal">View Inhouse Stock Take</b-btn>
  </div>
</template>

<script>
export default {
  name: "InhouseStockTakeActions",
  components: {},
  methods: {
    showInhouseStockTakeModal() {
      this.params.context.componentParent.showInhouseStockTakeModal(this.params.data);
    },
  },
};
</script>
