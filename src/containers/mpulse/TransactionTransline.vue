<template>
  <div>
    <b-table :items="translines" hover bordered :fields="fields">
      <template slot="index" slot-scope="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'ReportTransactionTransline',
    props: {
      transid: String
    },
    computed: mapState({
      translines: state => state.translines.all
    }),
    data: () => {
      return {
        fields: [
          {key: 'index', label: '#'},
          {key: 'productname', label: 'Product'},
          {key: 'qty', label: 'Quantity'},
          {key: 'price', label: 'Price'}
        ],
      }
    },
    beforeMount() {
      this.$store.dispatch('translines/getTranslines', this.transid)
    },
    beforeDestroy() {
      this.$store.dispatch('translines/clear')
    }
  }
</script>
