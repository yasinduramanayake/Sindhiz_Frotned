<template>
  <div>
    <b-card header="Please view following training and acknowledge">
      <b-table :items="pendingTrainings" :fields="fields" hover bordered table-responsive >
        <template v-slot:cell(#)="data">
          {{ data.index + 1 }}
        </template>

        <template v-slot:cell(action)="data">
          <b-btn variant="primary" :to="{name: 'Training Detail', params: {id: data.item.id}}" tag="button">View</b-btn>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'PendingTrainings',
    computed: mapState({
      pendingTrainings: state => state.trainings.pendingTrainings
    }),
    data: () => {
      return {
        fields: [
          '#',
          {key: 'name', label: 'Training Name', sortable: true},
          'action'
        ],
      }
    },
    beforeDestroy() {
      this.$store.dispatch('trainings/clear')
    },
    created() {
      this.$store.dispatch('trainings/getPendingTrainings')
    }
  }
</script>
