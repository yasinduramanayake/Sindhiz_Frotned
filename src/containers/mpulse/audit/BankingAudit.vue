<template>
  <div className="animated">

    <b-card>
      <v-client-table :columns="columns" :data="bankingVerification" :options="options" :theme="theme" id="dataTable">
        <b-form-checkbox slot="action" slot-scope="props" v-model="selectedBanking" :value="props.row" class="text-center"></b-form-checkbox>
      </v-client-table>
    </b-card>

    <b-card>
      <b-card-body>
        <b-form-group label="Amount:" label-for="total-amount" label-cols-sm="4" label-cols-lg="3">
            <b-form-input type="number" id="total-amount" v-model="totalAmount"></b-form-input>
        </b-form-group>
        <div slot="footer">
          <b-button :disabled="selectedBanking.length == 0" type="submit" variant="primary" @click="submitBanking"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
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
    name: 'BankingAudit',
    components: {
      ClientTable,
      Event
    },
    computed: mapState({
      bankingVerification: state => state.bankingVerification.all
    }),
    watch: {
      selectedBanking: function(values) {
        this.totalAmount = 0;
        _.forEach(values, (banking) => {
          this.totalAmount += banking.amount
        })
      }
    },
    data: function () {
      return {
        totalAmount: 0,
        selectedBanking: [],
        columns: ['date', 'amount', 'fullname', 'storename', 'action'],
        options: {
          headings: {
            date: 'Date',
            amount: 'Amount',
            fullname: 'Banked By',
            storename: 'Store',
            action: 'Action'
          },
          sortable: [],
          filterable: ['date', 'amount', 'fullname', 'storename'],
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
      submitBanking() {
        let closeCashIds = Vue._.map(this.selectedBanking, (closecash) => {
          return closecash.closecashid
        })
        Vue.axios
          .post("/submitBankingVerification", {
            amount: this.totalAmount,
            bankingIds: _.map(this.selectedBanking, banking => banking.bankingid)
          })
          .then(response => {
            this.$store.dispatch('bankingVerification/getBankingVerification')
            this.showSuccessMsg()
            this.resetForm()
          })
          .catch((error) => {
            this.showErrorMsg()
          })
      },
      resetForm() {
        this.totalAmount = 0
        this.selectedBanking = []
      }
    },
    created () {
      this.$store.dispatch('bankingVerification/getBankingVerification')
    }
  };
</script>
