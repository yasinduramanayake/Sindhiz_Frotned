<template>
<div className="animated">
  <b-card>
    <b-card-body>
      <b-form-group label="Store" label-cols-sm="4" label-cols-lg="3">
        <store-select :change="changeStore" onlyStaff></store-select>
      </b-form-group>
    </b-card-body>
  </b-card>

  <b-card>
    <b-card-body>
      <v-client-table :columns="columns" :data="closeCashBanking" :options="options" :theme="theme" id="dataTable">
        <b-form-checkbox slot="action" slot-scope="props" v-model="selectedSaleCash" :value="props.row" class="text-center"></b-form-checkbox>
        <div slot="denomination" slot-scope="props" class="text-center">
          <b-button size="sm" variant="success" @click="showCloseShiftDenominations(props.row)">Show</b-button>
        </div>
      </v-client-table>
    </b-card-body>
  </b-card>

  <b-card v-show="selectedStore">
    <b-card-body>
      <b-form-group label="Store Sales Cash:" label-for="sale-cash" label-cols-sm="4" label-cols-lg="3">
        <b-form-input type="number" id="sale-cash" v-model="totalSaleCash"></b-form-input>
      </b-form-group>
      <b-form-group label="Cheque/Extra Cash (If Any):" label-for="extra-cash" label-cols-sm="4" label-cols-lg="3">
        <b-form-input type="number" id="extra-cash" v-model="extraCash"></b-form-input>
      </b-form-group>
      <b-form-group label="Additional Comments:" label-for="addition-comment" label-cols-sm="4" label-cols-lg="3">
        <b-form-input type="text" id="addition-comment" v-model="comment"></b-form-input>
      </b-form-group>

      <b-card title="Expected Denomination Count" v-if="denominations.length > 0">
        <v-client-table :columns="denominationColumns" :data="denominations" :options="denominationOptions" :theme="theme"></v-client-table>
      </b-card>

      <div slot="footer">
        <b-button variant="warning" class="mr-1 mb-1" @click="calculateDenomination">Calculate Denomination</b-button>
        <b-button class="mb-1" :disabled="selectedSaleCash.length == 0" type="submit" variant="primary" @click="submitBanking"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
      </div>
    </b-card-body>
  </b-card>

  <b-modal ref="modalViewCloseShiftDenominations" title="Close Shift Denominations" hide-footer @hide="hideCloseShiftDenominations" no-enforce-focus>
    <v-client-table v-if="closeShiftDemoninations.length > 0" :columns="denominationColumns" :data="closeShiftDemoninations" :options="denominationOptions" :theme="theme"></v-client-table>
  </b-modal>
</div>
</template>

<script>
import Vue from 'vue'
import {
  mapState,
  mapGetters
} from 'vuex'

export default {
  name: 'Banking',
  computed: {
    ...mapState({
      closeCashBanking: state => state.closeCashBanking.all
    }),
    ...mapGetters({
      getStoreById: 'stores/getStoreById'
    })
  },
  watch: {
    selectedSaleCash: function(values) {
      let total = 0;
      Vue._.forEach(values, (closecash) => {
        total += closecash.othercash
      })

      this.totalSaleCash = total
      this.denominations = []
    }
  },
  data: function() {
    return {
      totalSaleCash: 0,
      selectedSaleCash: [],
      extraCash: 0,
      comment: '',
      selectedStore: null,
      denominations: [],
      closeShiftDemoninations: [],
      columns: ['date', 'othercash', 'storename', 'fullname', 'action', 'denomination'],
      options: {
        headings: {
          date: 'Date',
          othercash: 'Amount',
          storename: 'Store',
          fullname: 'Staff',
          action: 'Action',
          denomination: 'Denomination'
        },
        sortable: [],
        filterable: ['date', 'othercash', 'storename', 'fullname'],
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
      denominationColumns: ['value', 'total_count', 'total_value'],
      denominationOptions: {
        headings: {
          value: 'Denomination',
          total_count: 'Total Count',
          total_value: 'Total Value',
        },
        filterable: false,
      }
    }
  },
  methods: {
    changeStore(store) {
      this.selectedStore = store
      this.resetForm()
      if (store) {
        this.$store.dispatch('closeCashBanking/getByStore', {
          storeId: store.value
        })
      } else {
        this.$store.dispatch('closeCashBanking/clear')
      }
    },
    calculateDenomination() {
      let closeCashIds = Vue._.map(this.selectedSaleCash, (closecash) => {
        return closecash.closecashid
      })

      if (closeCashIds.length > 0) {
        Vue.axios.post('getCloseCashDenominations', {
            closecashIds: closeCashIds
          })
          .then((response) => {
            this.denominations = response.data
          })
          .catch((error) => {
            this.showErrorMsg({
              message: "Error while getting denominations"
            })
          })
      } else {
        this.denominations = [];
      }
    },
    submitBanking() {
      let closeCashIds = Vue._.map(this.selectedSaleCash, (closecash) => {
        return closecash.closecashid
      })
      Vue.axios
        .post("/submitBanking", {
          storeId: this.selectedStore.value,
          comment: this.comment,
          cheque: this.extraCash,
          storeCloseCash: this.totalSaleCash,
          closeCashIds: closeCashIds
        })
        .then(response => {
          this.$store.dispatch('closeCashBanking/getByStore', {
            storeId: this.selectedStore.value
          })
          this.showSuccessMsg()
          this.resetForm()
        })
        .catch((error) => {
          this.showErrorMsg()
        })
    },
    showCloseShiftDenominations(banking) {
      Vue.axios.post('getCloseCashDenominations', {
          closecashIds: [banking.closecashid]
        })
        .then((response) => {
          this.closeShiftDemoninations = response.data
          this.$refs.modalViewCloseShiftDenominations.show()
        })
        .catch((error) => {
          this.showErrorMsg({
            message: "Error while getting denominations"
          })
        })
    },
    hideCloseShiftDenominations() {
      this.closeShiftDemoninations = []
      this.$refs.modalViewCloseShiftDenominations.hide()
    },
    resetForm() {
      this.totalSaleCash = 0
      this.extraCash = 0
      this.comment = ''
      this.selectedSaleCash = []
      this.denominations = []
    }
  },
  beforeDestroy() {
    this.$store.dispatch('closeCashBanking/clear')
  },
  created() {
    this.$store.dispatch('stores/getStores')
  }
};
</script>
