<template>
  <div>
    <b-table :items="storeAccounts" hover bordered :fields="fields">
      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'StoreAccountList',
    props: {
      storeId: Number
    },
    computed: mapState({
      storeAccounts: state => state.storeAccounts.all
    }),
    data: () => {
      return {
        fields: [
          {key: 'index', label: '#'},
          {key: 'distributor.distributorname', label: 'Distributor Name'},
          {key: 'customerno', label: 'Customer Number'}
        ],
      }
    },
    beforeMount() {
      this.$store.dispatch('storeAccounts/getStoreAccounts', {storeId: this.storeId})
    },
    beforeDestroy() {
      this.$store.dispatch('storeAccounts/clear')
    }
  }
</script>
