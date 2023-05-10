<template>
  <div>
    <b-table :items="trainingReports" hover bordered  :fields="fields" :tbody-tr-class="rowClass">
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
      trainingid: Number
    },
    computed: mapState({
      trainingReports: state => state.trainings.trainingReports
    }),
    data: () => {
      return {
        fields: [
          {key: 'index', label: '#'},
          {key: 'staffname', label: 'Staff Name'},
          {key: 'email', label: 'Email'},
          {key: 'Completed', label: 'Completed'}
        ],
      }
    },
    methods: {
      rowClass(item, type) {
        if (!item) return
        if (item.Completed === 'No') return 'table-danger'
      }
    },
    beforeMount() {
      this.$store.dispatch('trainings/getTrainingReport', this.trainingid)
    },
  }
</script>
