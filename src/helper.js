import Vue from 'vue'
import StoreSelect from './containers/mpulse/custom-components/StoreSelect'
import SupplierSelect from './containers/mpulse/custom-components/SupplierSelect'
import StateSelect from './containers/mpulse/custom-components/StateSelect'
import TaxSelect from './containers/mpulse/custom-components/TaxSelect'
import YearSelect from './containers/mpulse/custom-components/YearSelect'
import DaySelect from './containers/mpulse/custom-components/DaySelect'
import AccountSelect from './containers/mpulse/custom-components/AccountSelect'
import AccountTypeSelect from './containers/mpulse/custom-components/AccountTypeSelect'
import TransactionTypeSelect from './containers/mpulse/custom-components/TransactionTypeSelect'
import DeliveryTypeSelect from './containers/mpulse/custom-components/DeliveryTypeSelect'
import NumberSelect from './containers/mpulse/custom-components/NumberSelect'
import SubcatSelect from "./containers/mpulse/custom-components/SubcatSelect"
Vue.component('store-select', StoreSelect)
Vue.component('supplier-select', SupplierSelect)
Vue.component('state-select', StateSelect)
Vue.component('tax-select', TaxSelect)
Vue.component('year-select', YearSelect)
Vue.component('day-select', DaySelect)
Vue.component('account-select', AccountSelect)
Vue.component('account-type-select', AccountTypeSelect)
Vue.component('transaction-type-select', TransactionTypeSelect)
Vue.component('delivery-type-select', DeliveryTypeSelect)
Vue.component('number-select', NumberSelect)
Vue.component('subcat-select', SubcatSelect)

Vue.mixin({
  methods: {
    getStartOfWeek(year, weekNo) {
      return this.$moment().isoWeeks(weekNo).year(year).isoWeeks(weekNo).isoWeekday(1).format('DD/MM/YYYY');
    },
    getEndOfWeek(year, weekNo) {
      return this.$moment().isoWeeks(weekNo).year(year).isoWeek(weekNo).isoWeekday(7).format('DD/MM/YYYY');
    },
    createUniqueId() {
      return Math.random().toString(36).substr(2, 9)
    },
    formatDate(date) {
      return this.$moment(date).format('YYYY-MM-DD')
    }
  },
  notifications: {
    showSuccessMsg: {
      type: 'success',
      message: 'Success'
    },
    showErrorMsg: {
      type: 'error',
      message: 'Error'
    },
    showInfoMsg: {
      type: 'info',
      message: ''
    },
    showWarnMsg: {
      type: 'warn',
      message: ''
    }
  }
})
