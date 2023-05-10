<template>
  <div>
    <b-table :items="deliverylines" hover bordered :fields="fields">
      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'Deliveryline',
    props: {
      deliveryid: Number
    },
    computed: mapState({
      deliverylines: state => state.deliveryLines.all
    }),
    data: () => {
      return {
        fields: [
          {key: 'index', label: '#'},
          {key: 'productname', label: 'Product'},
          {key: 'qty', label: 'Quantity'},
        ],
      }
    },
    beforeMount() {
      this.$store.dispatch('deliveryLines/getDeliveryLines', this.deliveryid)
    },
    beforeDestroy() {
      this.$store.dispatch('deliveryLines/clear')
    }
  }
</script>
