<template>
<div className="animated">
  <b-card>
    <b-button-toolbar class="pull-right">
      <b-button variant="primary" @click="showAuditHistory">{{ showAll ? 'Hide Audit History' : 'Show Audit History'}}</b-button>
    </b-button-toolbar>
  </b-card>
  <b-card>
    <v-client-table :columns="columns" :data="promotionPayments" :options="options" :theme="theme" id="dataTable">
      <b-form-checkbox v-if="!props.row.audit" slot="action" slot-scope="props" v-model="selectedPromoPayments" :value="props.row" class="text-center"></b-form-checkbox>
    </v-client-table>
  </b-card>

  <b-card>
    <b-card-body>
      <div slot="footer">
        <b-button :disabled="selectedPromoPayments.length == 0" type="submit" variant="primary" @click="submitPromoPayments"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
      </div>
    </b-card-body>
  </b-card>
</div>
</template>

<script>
import Vue from 'vue'
import {
  mapState,
} from 'vuex'

export default {
  name: 'AuditPromoRebates',
  computed: mapState({
    promotionPayments: state => state.promotionPayments.all
  }),
  data: function() {
    return {
      totalAmount: 0,
      selectedPromoPayments: [],
      showAll: false,
      columns: ['promoid', 'staffname', 'system_amount', 'amount', 'payment_ref', 'comments', 'auditorname', 'updated_at', 'action'],
      options: {
        headings: {
          promoid: 'Promo ID',
          staffname: 'Staff Name',
          system_amount: 'System Amount',
          amount: 'Amount',
          payment_ref: 'Payment Ref',
          comments: 'Comments',
          auditorname: 'Audit By',
          updated_at: 'Last Updated',
          action: 'Action'
        },
        sortable: [],
        filterable: ['staffname', 'system_amount', 'amount', 'payment_ref', 'comments', 'auditorname', 'updated_at'],
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
    }
  },
  methods: {
    submitPromoPayments() {
      Vue.axios
        .post("/auditPromotionPayments", {
          promoPaymentIds: _.map(this.selectedPromoPayments, promoPayment => promoPayment.id)
        })
        .then(response => {
          this.$store.dispatch('promotionPayments/getPromotionPayments', {
            showAll: this.showAll
          })
          this.showSuccessMsg()
          this.resetForm()
        })
        .catch((error) => {
          this.showErrorMsg()
        })
    },
    resetForm() {
      this.selectedPromoPayments = []
    },
    showAuditHistory() {
      this.showAll = !this.showAll
      this.$store.dispatch('promotionPayments/getPromotionPayments', {
        showAll: this.showAll
      })
    }
  },
  created() {
    this.$store.dispatch('promotionPayments/getPromotionPayments', {
      showAll: this.showAll
    })
  }
};
</script>
