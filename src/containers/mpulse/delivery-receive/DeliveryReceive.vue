<template>
  <div class="animated fadeIn">
    <delivery-receive-step-1 v-if="step1Data == null && !submitted" @next="toStep2"/>
    <delivery-receive-step-2 v-if="step1Data != null && !submitted" @back="toStep1" @next="submit" v-bind:numOfBoxes="step1Data.numOfBoxes"/>
    <delivery-receive-list />
    
  </div>
</template>

<script>
import Vue from "vue";
import DeliveryReceiveList from "./DeliveryReceiveList";
import DeliveryReceiveStep1 from "./DeliveryReceiveStep1";
import DeliveryReceiveStep2 from "./DeliveryReceiveStep2";

export default {
  name: "DeliveryReceive",
  components: {
    DeliveryReceiveList,
    DeliveryReceiveStep1,
    DeliveryReceiveStep2
  },
  computed: {
  },
  data: function () {
    return {
      submitted: false,
      step1Data: null,
    };
  },
  methods: {
    toStep2(data) {
      this.step1Data = data
    },
    toStep1() {
      this.step1Data = null
    },
    submit(data) {
      this.submitted = true
      let params = {
        storeId: this.step1Data.store.value,
        distributorId: this.step1Data.distributor.value,
        files: data.files
      }
      Vue.axios.post('createDeliveryReceive', params)
        .then((response) => {
          this.step1Data = null
          this.submitted = false
          this.$store.dispatch('deliveryReceives/getDeliveryReceives')
          this.showSuccessMsg()
        })
        .catch(() => {
          this.showErrorMsg()
        })
    }
  },
};
</script>
