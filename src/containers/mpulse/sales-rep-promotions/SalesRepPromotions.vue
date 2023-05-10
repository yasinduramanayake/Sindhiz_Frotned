<template>
  <div className="animated">
    <b-card>
      <b-button-toolbar class="pull-right">
        <b-btn variant="primary" @click="showAddPromotion">Add Promotion</b-btn>
      </b-button-toolbar>
    </b-card>
    <b-card>
      <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />

      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="promotions"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady"
      >
      </ag-grid-vue>
    </b-card>

    <b-card>
      <b-card-body>
        <b-form-group label="Total Payable:" label-for="total-payable" label-cols-sm="4" label-cols-lg="3">
          <b-form-input type="number" id="total-payable" :value="totalPayable" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="Payment Reference" label-for="paymentRef" label-cols-sm="4" label-cols-lg="3">
          <b-form-input id="paymentRef" type="text" v-model="paymentRef" aria-describedby="liveFeedbackPaymentRef" placeholder="Payment Reference (required)" />
        </b-form-group>
        <b-form-group label="Additional Comments:" label-for="addition-comment" label-cols-sm="4" label-cols-lg="3">
          <b-form-input type="text" id="addition-comment" v-model="comments"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" :disabled="!submitable || submitting || !paymentRef" @click="submitPayable">
          Submit
        </b-button>
      </b-card-body>
    </b-card>

    <div>
      <b-modal ref="modalAddPromotion" title="Add Promotion" hide-footer @hide="hideAddPromotion" no-enforce-focus>
        <promotion-form-add v-if="canShowAddPromotion" @success="addPromotionSuccess" @cancel="cancelAddPromotion"/>
      </b-modal>
      <b-modal ref="modalDisableConfirm" title="Confirm Disable" @hide="hideDisableConfirm" @ok="toggleDisable" no-enforce-focus>
        <div class="d-block text-center">
          <h4>Do you really want to disable promotion? This action can not be reverted.</h4>
        </div>
      </b-modal>
      <b-modal ref="modalViewSales" title="View Sales" hide-footer size="lg" @hide="hideViewSales" no-enforce-focus>
        <promotion-sales v-if="selectedViewSales" :promotion="selectedViewSales"/>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {AgGridVue} from "ag-grid-vue";
  import { mapState } from 'vuex'
  import GridButtons from '../GridButtons'
  import PromotionActions from './PromotionActions'
  import PromotionFormAdd from './PromotionFormAdd'
  import PromotionSales from './PromotionSales'

  export default {
    name: 'SalesRepPromotions',
    components: {
      AgGridVue,
      GridButtons,
      PromotionActions,
      PromotionFormAdd,
      PromotionSales,
    },
    computed: mapState({
      promotions: state => state.promotions.all
    }),
    watch: {
      promotions: function(values) {
        if (values.length > 0) {
          this.submitting = false
        }
      }
    },
    data: function () {
      return {
        totalPayable: 0,
        selectedPayables: {},
        comments: null,
        paymentRef: null,
        submitting: false,
        submitable: false,
        gridOptions: {
          context: {
            componentParent: this
          },
          defaultColDef: {
            sortable: true,
            resizable: true
          },
          columnDefs: [
            {headerName: 'Subcat', field: 'subcat', filter: 'agTextColumnFilter', minWidth: 150},
            {headerName: 'Subcat Name', field: 'subcat_name', filter: 'agTextColumnFilter', minWidth: 150},
            {headerName: 'Start Date', field: 'startdate', filter: 'agTextColumnFilter', minWidth: 80},
            {headerName: 'End Date', field: 'enddate', filter: 'agTextColumnFilter', minWidth: 80},
            {headerName: 'Amount', field: 'amount', filter: 'agTextColumnFilter', minWidth: 80},
            {headerName: 'C T N Amount', field: 'ctnamount', filter: 'agTextColumnFilter', minWidth: 80},
            {headerName: 'Available To', field: 'availableTo', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Modified By', field: 'staffname', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Payable', field: 'payable', filter: 'agTextColumnFilter', minWidth: 120},
            {headerName: 'Actions', field: 'promoid', minWidth: 280, cellRendererFramework: 'PromotionActions'}
          ],
        },
        canShowAddPromotion: false,
        selectedPromotion: null,
        selectedViewSales: null
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': 'MerchantPulsePromotions_'+ this.$moment().format('YYYY-MM-DD'),
          'columnKeys': ['subcat_name', 'startdate', 'enddate', 'amount', 'ctnamount', 'availableTo', 'staffname']
        }
      },
      gridReady() {
        this.gridOptions.api.sizeColumnsToFit()
      },
      showAddPromotion() {
        this.canShowAddPromotion = true
        this.$refs.modalAddPromotion.show()
      },
      cancelAddPromotion() {
        this.$refs.modalAddPromotion.hide()
      },
      addPromotionSuccess() {
        this.$refs.modalAddPromotion.hide()
        this.$store.dispatch('promotions/getSalesRepPromotions')
      },
      hideAddPromotion() {
        this.canShowAddPromotion = false
      },
      showViewSales(promotion) {
        this.selectedViewSales = promotion
        this.selectedPromotion = promotion
        this.$refs.modalViewSales.show()
      },
      hideViewSales() {
        this.selectedViewSales = null
      },
      showDisableConfirm(promotion) {
        this.selectedPromotion = promotion
        this.$refs.modalDisableConfirm.show()
      },
      hideDisableConfirm() {
        this.gridOptions.api.redrawRows()
        this.selectedPromotion = null
      },
      toggleDisable() {
        this.$store.dispatch('promotions/toggleDisable', {promoid: this.selectedPromotion.promoid, disable: !this.selectedPromotion.disabled})
          .then(() => {
            this.showSuccessMsg()
            this.$store.dispatch('promotions/getSalesRepPromotions')
          }).catch(() => {
            this.showErrorMsg()
          })
      },
      addPromotionPaymentSuccess() {
        this.$refs.modalPayRebate.hide()
        this.$store.dispatch('promotions/getSalesRepPromotions')
      },
      calculatePayable(promotion, isInculde) {
        if (isInculde) {
          if (!_.has(promotion, 'payable')) {
            var endDate = promotion.disabled == 1 ? promotion.updated_at : promotion.enddate
            let params = {
              amount: promotion.amount,
              ctnAmount: promotion.ctnamount,
              startDate: promotion.startdate,
              endDate: endDate,
              subcat: promotion.subcat,
              storeIds: promotion.storeIds
            }
            this.selectedPromotion = promotion
            this.selectedPayables[promotion.promoid] = 0
            this.$store.dispatch('promotionSales/getByPromotion', params)
              .then(response => {
                let value = 0
                _.forEach(response.data, (item) => {
                  value += item.value
                })
                value = _.round(value, 2)

                if (_.has(this.selectedPayables, promotion.promoid)) {
                  this.selectedPayables[promotion.promoid] = value
                }
                this.totalPayable = this.calculateTotal()
                this.$store.commit('promotions/setPayable', {promoid: promotion.promoid, payable: value})
                this.gridOptions.api.refreshCells()
              })
          } else {
            this.selectedPayables[promotion.promoid] = promotion.payable
            this.totalPayable = this.calculateTotal()
          }
        } else {
          if (_.has(this.selectedPayables, promotion.promoid)) {
            _.unset(this.selectedPayables, promotion.promoid)
            this.totalPayable = this.calculateTotal()
          }
        }
      },
      calculateTotal() {
        let total = 0
        Vue._.each(this.selectedPayables, (value) => {
          total += value
        })
        this.submitable = _.size(this.selectedPayables) > 0
        return Vue._.round(total, 2)
      },
      submitPayable() {
        this.submitting = true
        Vue.axios.post('/addPromotionPayment', {
          promoIds: Object.keys(this.selectedPayables),
          amount: this.totalPayable,
          paymentRef: this.paymentRef,
          comments: this.comments,
        }).then((response) => {
          this.$store.dispatch('promotions/getSalesRepPromotions')
          this.paymentRef = null
          this.comments = null
          this.selectedPayables = {}
          this.totalPayable = 0
          this.showSuccessMsg()
        }).catch((error) => {
          this.showErrorMsg()
        })
      }
    },
    created () {
      this.$store.dispatch('promotions/getSalesRepPromotions')
    },
    beforeMount() {
      this.$store.dispatch('promotions/clear')
    }
  };
</script>
