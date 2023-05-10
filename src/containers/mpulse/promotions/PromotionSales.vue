<template>
<div>
  <b-row>
    <b-col>
      <b-table :items="sales" hover bordered :fields="fields">
      </b-table>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <download-csv v-if="sales.length > 0" :data="sales" class="btn btn-success" :name="exportFileName" :labels="exportLabels" :fields="exportFields">
        Export CSV
      </download-csv>
    </b-col>
  </b-row>
</div>
</template>

<script>
import Vue from 'vue'
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  name: 'PromotionSales',
  props: {
    promotion: Object
  },
  computed: mapState({
    sales: state => state.promotionSales.all
  }),
  data: () => {
    return {
      fields: [{
          key: 'subcatName',
          label: 'Subcat',
          sortable: true
        },
        {
          key: 'storeName',
          label: 'Store',
          sortable: true
        },
        {
          key: 'totalCount',
          label: 'Total Count',
          sortable: true
        },
        {
          key: 'totalSticks',
          label: 'Total Sticks',
          sortable: true
        },
        {
          key: 'value',
          label: 'Value',
          sortable: true
        }
      ],
      exportFileName: 'PromotionSales.csv',
      exportFields: ['subcatName', 'storeName', 'totalCount', 'totalSticks', 'value'],
      exportLabels: {
        'subcatName': 'Subcat',
        'storeName': 'Store',
        'totalCount': 'Total Count',
        'totalSticks': 'Total Sticks',
        'value': 'Value'
      }
    }
  },
  beforeMount() {
    var endDate = this.promotion.disabled == 1 ? this.promotion.updated_at : this.promotion.enddate
    let params = {
      amount: this.promotion.amount,
      ctnAmount: this.promotion.ctnamount,
      startDate: this.promotion.startdate,
      endDate: endDate,
      subcat: this.promotion.subcat,
      storeIds: this.promotion.storeIds
    }
    this.$store.dispatch('promotionSales/getByPromotion', params)
    this.exportFileName = 'PromotionSales_' + this.promotion.promoname + '_' + this.$moment().format('YYYY-MM-DD') + '.csv'
  },
  beforeDestroy() {
    this.$store.dispatch('promotionSales/clear')
  }
}
</script>
