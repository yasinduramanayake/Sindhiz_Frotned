<template>
  <div class="animated fadeIn">
    <b-card>
      <b-form
        v-on:submit.prevent="onSubmit"
        v-on:reset.prevent="onReset"
        novalidate
      >
        <b-row>
          <b-col sm="6">
            <b-form-group
              label="Stores"
              label-for="stores"
              :state="chkState('stores')"
            >
              <store-select
                v-model="$v.form.stores.$model"
                multiple
              ></store-select>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="Sales Transaction Type"
              :state="chkState('transtypes')"
            >
              <transaction-type-select
                multiple
                v-model="$v.form.transtypes.$model"
              ></transaction-type-select>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="6">
            <b-form-group
              label="Account Payables"
              :state="chkState('accountPayables')"
            >
              <account-select
                payable
                multiple
                v-model="$v.form.accountPayables.$model"
              ></account-select>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="Account Receivables"
              :state="chkState('accountReceivables')"
            >
              <account-select
                receivable
                multiple
                v-model="$v.form.accountReceivables.$model"
              ></account-select>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="3">
            <b-form-group label="Report By" :state="chkState('reportType')">
              <v-select
                v-model="$v.form.reportType.$model"
                :options="reportTypeList"
              ></v-select>
            </b-form-group>
          </b-col>
          <b-col sm="3">
            <b-form-group label="Year" :state="chkState('year')">
              <year-select
                v-model="$v.form.year.$model"
                :disabled="$v.form.reportType.$model == 'Year'"
              ></year-select>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="3">
            <b-form-group>
              <b-form-checkbox
                v-model.lazy.trim="$v.form.includePayroll.$model"
                :unchecked-value="false"
              >
                Include Payroll
              </b-form-checkbox>
            </b-form-group>
          </b-col>
          <b-col sm="3">
            <b-form-group>
              <b-form-checkbox
                v-model.lazy.trim="$v.form.includeIntrastorePurchases.$model"
                :unchecked-value="false"
              >
                Include Intrastore Purchases
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="4">
            <b-btn type="submit" variant="success" :disabled="$v.form.$invalid"
              >Submit</b-btn
            >
          </b-col>
        </b-row>
      </b-form>
    </b-card>

    <b-card header="Store Income & Expense" v-if="reportData">
      <v-client-table
        :columns="columns"
        :data="reportDataEx"
        :options="options"
        :theme="theme"
      ></v-client-table>
    </b-card>

    <b-card header="Income & Expense Chart" v-if="reportData">
      <div class="chart-wrapper">
        <store-income-and-expense-chart
          :chartdata="reportData"
          :reportType="form.reportType"
        />
      </div>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
import StoreIncomeAndExpenseChart from "./StoreIncomeAndExpenseChart";

const formShape = {
  stores: [],
  transtypes: [],
  accountPayables: [],
  accountReceivables: [],
  includePayroll: true,
  includeIntrastorePurchases: true,
  reportType: null,
  year: null
};

export default {
  name: "StoreIncomeAndExpense",
  components: {
    StoreIncomeAndExpenseChart
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    },
    reportTypeList() {
      return ["Week", "Month", "Year"];
    },
    ...mapState({
      accountPayables: state => state.accounts.payables,
      accountReceivables: state => state.accounts.receivables
    })
  },
  watch: {
    accountPayables: function(values) {
      this.form.accountPayables = Vue._.map(values, account => {
        return {
          label: account.accountname,
          value: account.accountid
        };
      });
    },
    accountReceivables: function(values) {
      this.form.accountReceivables = Vue._.map(values, account => {
        return {
          label: account.accountname,
          value: account.accountid
        };
      });
    }
  },

  data: function() {
    return {
      submitted: false,
      limitSelection: 5,
      dateOptionSelected: null,
      form: Object.assign({}, formShape),
      reportData: null,
      reportDataEx: null,
      columns: ["itemno", "cc", "income", "expense", "profit_loss"],
      options: {
        headings: {
          itemno: "Week",
          cc: "Customer Count",
          income: "Income",
          expense: "Expense",
          profit_loss: "Profit/Loss"
        },
        sortable: [],
        filterable: false,
        sortIcon: {
          base: "fa",
          up: "fa-sort-asc",
          down: "fa-sort-desc",
          is: "fa-sort"
        },
        pagination: {
          dropdown: false
        },
        perPage: 52
      },
      useVuex: false,
      theme: "bootstrap4",
      template: "default"
    };
  },
  validations: {
    form: {
      stores: {
        required
      },
      transtypes: {
        required
      },
      accountPayables: {
        required
      },
      accountReceivables: {
        required
      },
      includePayroll: {
        required
      },
      includeIntrastorePurchases: {
        required
      },
      reportType: {
        required
      },
      year: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.reportData = null;
          this.options.headings.itemno = this.$v.form.reportType.$model;
          let params = {
            storeId: this.$v.form.stores.$model.value,
            storeIds: _.map(this.$v.form.stores.$model, store => store.value),
            transTypeIds: _.map(
              this.$v.form.transtypes.$model,
              transtype => transtype.value
            ),
            accountPayableIds: _.map(
              this.$v.form.accountPayables.$model,
              accountPayable => accountPayable.value
            ),
            accountReceivableIds: _.map(
              this.$v.form.accountReceivables.$model,
              accountReceivable => accountReceivable.value
            ),
            includePayroll: this.$v.form.includePayroll.$model,
            includeIntrastorePurchases: this.$v.form.includeIntrastorePurchases
              .$model,
            reportType: this.$v.form.reportType.$model,
            year: this.$v.form.year.$model
          };
          Vue.axios
            .post("/getStoreIncomeAndExpenseReport", params)
            .then(response => {
              this.reportData = response.data;
              let total = { cc: 0, income: 0, expense: 0, profit_loss: 0 };
              _.each(this.reportData, item => {
                total.cc += item.cc;
                total.income += item.income;
                total.expense += item.expense;
                total.profit_loss += item.profit_loss;
              });
              total.income = _.round(total.income, 2);
              total.expense = _.round(total.expense, 2);
              total.profit_loss = _.round(total.profit_loss, 2);
              this.reportDataEx = _.concat(this.reportData, total);
              this.showSuccessMsg();
            })
            .catch(() => {
              this.showErrorMsg();
            });
        });
      }
    },
    onReset() {
      this.form = formShape;
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    chkState(val) {
      const field = this.$v.form[val];
      return field.$dirty ? !field.$invalid : null;
    },
    findFirstError(component = this) {
      if (component.state === false) {
        if (component.$refs.input) {
          component.$refs.input.focus();
          return true;
        }
        if (component.$refs.check) {
          component.$refs.check.focus();
          return true;
        }
      }
      let focused = false;
      component.$children.some(child => {
        focused = this.findFirstError(child);
        return focused;
      });

      return focused;
    },
    validate() {
      this.$v.$touch();
      this.$nextTick(() => this.findFirstError());
      return this.isValid;
    }
  },
  created() {
    this.form.year = this.$moment().year();
    this.form.reportType = "Week";
  }
};
</script>
