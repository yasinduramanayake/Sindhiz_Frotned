<template>
  <div>
    <b-table :items="products" hover bordered :fields="fields">
      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'StockTakeConfirmation',
    props: {
      products: Array
    },
    computed: mapState({
    }),
    data: () => {
      return {
        fields: [
          {key: 'index', label: '#'},
          {key: 'productName', label: 'Product Name'},
          {key: 'qty', label: 'Quantity'}
        ],
      }
    }
  }
</script>
