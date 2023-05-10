<template>
  <div v-if="items.length > 0">
    <v-client-table :columns="columns" :data="items" :options="options" :theme="theme" id="dataTable">
      <template v-for="year in years" :slot="year" slot-scope="props">
        <div class="text-center">
          <span class="pull-left">{{ props.row[year] }}</span>
          <b-button v-if="props.row[year] && props.row.name != 'Total'" size="sm" variant="success" class="pull-right" @click="showTakingDetails(props.row.staffid, year)"><i class="cui-magnifying-glass icons"></i> </b-button>
        </div>
      </template>
    </v-client-table>
    <b-modal ref="modalTakingDetails" title="Owners Taking Details" @hide="hideTakingDetails" hide-footer no-enforce-focus>
      <b-table v-if="selectedDetails":items="selectedDetails" hover bordered :fields="fields">
      </b-table>
    </b-modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'TakingSummary',
    props: {
      transid: String
    },

    data: () => {
      return {
        items: [],
        columns: [],
        years: [],
        details: {},
        selectedDetails: null,
        options: {
          headings: {
            name: 'Staff',
          },
          sortable: [],
          filterable: [],
          sortIcon: {
            base: 'fa',
            up: 'fa-sort-asc',
            down: 'fa-sort-desc',
            is: 'fa-sort'
          },
          pagination: {
            chunk: 5,
            edge: false,
            nav: 'scroll'
          }
        },
        useVuex: false,
        theme: 'bootstrap4',
        template: 'default',
        fields: ['date', 'amount', 'cheque', 'comments']
      }
    },
    methods: {
      refresh() {
        Vue.axios
          .get("/getOwnersTakingSummary")
          .then(response => {
            this.items = response.data.items
            this.years = response.data.years
            this.details = response.data.details
            this.columns = ['name'].concat(response.data.years)
          })
          .catch((error) => {
            this.showErrorMsg()
          })
      },
      showTakingDetails(staffid, year) {
        this.selectedDetails = this.details[staffid][year]
        this.$refs.modalTakingDetails.show()
      },
      hideTakingDetails() {
        this.selectedDetails = null
      }
    },
    created() {
      this.refresh()
    },
  }
</script>
