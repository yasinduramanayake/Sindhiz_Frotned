<template>
  <div class="animated fadeIn">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col lg="12">
            <!--<h6>Simple Form</h6>-->
            <b-form
              v-on:submit.prevent="onSubmit"
              v-on:reset.prevent="onReset"
              novalidate
            >
              <b-form-group label="Trans Date">
                <b-form-input
                  type="text"
                  :value="bankFeedLine.transdate"
                  disabled
                />
              </b-form-group>

              <b-form-group label="Description">
                <b-form-input
                  type="text"
                  :value="bankFeedLine.description"
                  disabled
                />
              </b-form-group>

              <b-form-group label="Amount">
                <b-form-input
                  type="text"
                  :value="bankFeedLine.amount"
                  disabled
                />
              </b-form-group>

              <b-form-group label="Distributor">
                <v-select
                  :options="distributorList"
                  v-model="$v.form.distributor.$model"
                  placeholder="Select Distributor"
                ></v-select>
              </b-form-group>

              <b-form-group label="Account">
                <account-select
                  v-model="$v.form.account.$model"
                ></account-select>
              </b-form-group>

              <b-form-group label="Invoice">
                <v-select
                  :options="invoiceList"
                  v-model="$v.form.invoice.$model"
                  placeholder="Select Invoice"
                ></v-select>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                :disabled="$v.form.$invalid"
              >
                Submit
              </b-button>
              <b-button class="ml-1" type="reset" @click="onCancel"
                >Cancel</b-button
              >
            </b-form>
            <br />
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import { required, requiredIf } from "vuelidate/lib/validators";
import { mapState } from "vuex";

const formShape = {
  distributor: null,
  account: null,
  invoice: null
};

export default {
  name: "BankFeedDetailUpdate",
  components: {},
  props: {
    bankFeedLine: Object
  },
  data() {
    return {
      form: Object.assign({}, formShape)
    };
  },
  computed: {
    ...mapState({
      invoices: state => state.invoices.all
    }),
    isValid() {
      return !this.$v.form.$anyError;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    },
    distributorList() {
      let list = [];
      Vue._.forEach(this.$store.state.distributors.active, distributor => {
        list.push({
          label: distributor.distributorname,
          value: distributor.distributorid
        });
      });
      return list;
    },
    invoiceList() {
      let list = [];
      Vue._.forEach(this.$store.state.invoices.all, invoice => {
        list.push({
          label: invoice.invoicenumber,
          value: invoice.invoiceid
        });
      });
      return list;
    }
  },
  validations: {
    form: {
      distributor: {
        required
      },
      account: {
        required
      },
      invoice: {
        required: requiredIf(function () {
            return this.bankFeedLine.amount < 0
          })
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          let params = {
            bankFeedLineId: this.bankFeedLine.bankfeedlineid,
            distributorId: this.$v.form.distributor.$model.value,
            accountId: this.$v.form.account.$model.value,
            invoiceId: this.form.invoice != null ? this.$v.form.invoice.$model.value : null,
            amount: this.bankFeedLine.amount
          };

          Vue.axios
            .post("/updateBankFeedLine", params)
            .then(response => {
              this.$emit("success");
            })
            .catch(error => {
              console.log(error)
              this.showErrorMsg();
            });
        });
      }
    },
    onCancel() {
      this.$emit("cancel");
    },
    onReset() {
      // Reset validation
      this.form = formShape;
      this.submitted = false;
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
    this.$store.dispatch("distributors/getDistributors");
    this.form.distributor = this.bankFeedLine.distributor
      ? {
          label: this.bankFeedLine.distributor.distributorname,
          value: this.bankFeedLine.distributor.distributorid
        }
      : null;

    this.form.account = this.bankFeedLine.account
      ? {
          label: this.bankFeedLine.account.accountname,
          value: this.bankFeedLine.account.accountid
        }
      : null;

    this.form.invoice = this.bankFeedLine.invoice
      ? {
          label: this.bankFeedLine.invoice.invoicenumber,
          value: this.bankFeedLine.invoice.invoiceid
        }
      : null;
  }
};
</script>
