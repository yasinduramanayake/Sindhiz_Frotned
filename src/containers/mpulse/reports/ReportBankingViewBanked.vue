<template>
  <div>
    <b-table :items="closeCash" hover bordered :fields="fields">
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
    name: 'ReportBankingViewBanked',
    props: {
      banking: Object
    },
    computed: mapState({
      closeCash: state => state.closeCash.all
    }),
    data: () => {
      return {
        fields: [
          {key: 'index', label: '#'},
          {key: 'date', label: 'Date'},
          {key: 'customercount', label: 'Customer Count'},
          {key: 'othercash', label: 'Other Cash'},
          {key: 'eftpos', label: 'EftPos'}
        ],
      }
    },
    beforeMount() {
      this.$store.dispatch('closeCash/getByBanking', this.banking)
    },
    beforeDestroy() {
      this.$store.dispatch('closeCash/clear')
    }
  }
</script>
