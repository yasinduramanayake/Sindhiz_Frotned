<template>
  <div>
    <b-btn
      size="sm"
      variant="primary"
      class="mb-2 mr-1"
      :to="{
        name: 'SKU Update',
        params: { skuid: params.data.skuid, skuname: params.data.skuname ? params.data.skuname : ' '}
      }"
      >Update SKU</b-btn>
    <b-btn size="sm" class="btn-success mb-2 mr-1" @click="showDiscardSKU"
      >Discard SKU</b-btn
    >
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "DeliveryBufferActions",
  methods: {
    showDiscardSKU() {
      this.params.context.componentParent.showDiscardSKU(this.params.data);
    }
  }
};
</script>
