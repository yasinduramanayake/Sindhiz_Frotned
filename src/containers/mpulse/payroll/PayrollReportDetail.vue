<template>
<div>
  <b-row>
    <b-col>
      <b-table :items="closecashes" hover bordered :fields="fields">
      </b-table>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <download-csv v-if="closecashes.length > 0" :data="closecashes" class="btn btn-success" :name="exportFileName" :labels="exportLabels" :fields="exportFields">
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
  name: 'PayrollReportDetail',
  props: {
    staffCloseCash: Object,
    startDate: Date,
    endDate: Date
  },
  data: () => {
    return {
      closecashes: [],
      fields: [{
          key: 'date',
          label: 'Date',
          sortable: true
        },
        {
          key: 'hours',
          label: 'Hours',
          sortable: true
        },
        {
          key: 'storename',
          label: 'Store Name',
          sortable: true
        }
      ],
      exportFileName: 'CloseCash.csv',
      exportFields: ['date', 'hours', 'storename'],
      exportLabels: {
        'date': 'Date',
        'hours': 'Hours',
        'storename': 'Store Name',
      }
    }
  },
  beforeMount() {
    _.forEach (this.staffCloseCash.closecash, (dates, key) => {
      this.closecashes = _.concat(this.closecashes, dates)
    })
    this.closecashes = _.sortBy(this.closecashes, ['date']);
    this.exportFileName = 'CloseCash_' + this.staffCloseCash.staffname + '_' + this.$moment(this.startDate).format('YYYY-MM-DD')+'_'+this.$moment(this.endDate).format('YYYY-MM-DD') + '.csv'
  },
  beforeDestroy() {
  }
}
</script>
