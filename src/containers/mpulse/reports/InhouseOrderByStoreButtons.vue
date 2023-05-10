<template>
  <div>
    <b-button @click="showInhouseOrderByStoreModal()">Details</b-button>
    &nbsp;
    <b-button @click="printInhouseStoreOrder()">Print</b-button>
  </div>
</template>

<script>
export default {
  name: "InhouseOrderByStoreButtons",
  components: {},
  methods: {
    showInhouseOrderByStoreModal() {
      this.params.context.componentParent.showInHouseModal(this.params.data);
    },
    printInhouseStoreOrder() {
      this.params.context.componentParent.printInhouseOrder(this.params.data);
    },
  },
};
</script>
