<template>
  <div className="animated">

    <b-card>
      <v-client-table :columns="columns" :data="eftVerification" :options="options" :theme="theme" id="dataTable">
        <b-form-checkbox slot="action" slot-scope="props" v-model="selectedEft" :value="props.row" class="text-center"></b-form-checkbox>
      </v-client-table>
    </b-card>

    <b-card>
      <b-card-body>
        <div slot="footer">
          <b-button :disabled="selectedEft.length == 0" type="submit" variant="primary" @click="submitEft"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {ClientTable, Event} from 'vue-tables-2'
  import { mapState, mapActions } from 'vuex'

  Vue.use(ClientTable)

  export default {
    name: 'EftposAudit',
    components: {
      ClientTable,
      Event
    },
    computed: mapState({
      eftVerification: state => state.eftVerification.all
    }),
    data: function () {
      return {
        selectedEft: [],
        columns: ['date', 'eftpos', 'names', 'storename', 'action'],
        options: {
          headings: {
            date: 'Date',
            eftpos: 'Eftpos',
            names: 'Names',
            storename: 'Store',
            action: 'Action'
          },
          sortable: [],
          filterable: ['date', 'eftpos', 'names', 'storename'],
          sortIcon: { base:'fa', up:'fa-sort-asc', down:'fa-sort-desc', is:'fa-sort' },
          pagination: {
            chunk: 5,
            edge: false,
            nav: 'scroll'
          }
        },
        useVuex: false,
        theme: 'bootstrap4',
        template: 'default',
      }
    },
    methods: {
      submitEft() {
        let closeCashIds = Vue._.map(this.selectedEft, (eft) => {
          return eft.closecashids
        })
        Vue.axios
          .post("/submitEftVerification", {
            closecashids: closeCashIds
          })
          .then(response => {
            this.$store.dispatch('eftVerification/getEftVerification')
            this.showSuccessMsg()
            this.resetForm()
          })
          .catch((error) => {
            this.showErrorMsg()
          })
      },
      resetForm() {
        this.selectedEft = []
      }
    },
    created () {
      this.$store.dispatch('eftVerification/getEftVerification')
    }
  };
</script>
