<template>
  <div class="animated fadeIn">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col lg="12">
            <b-form
              v-on:submit.prevent="onSubmit"
              v-on:reset.prevent="onReset"
              novalidate
            >
              <b-form-group label="Hours" label-for="hoursWorked">
                <b-form-input
                  id="hoursWorked"
                  type="text"
                  :state="chkState('hoursWorked')"
                  v-model.lazy.trim="$v.form.hoursWorked.$model"
                  aria-describedby="liveFeedbackHoursWorked"
                  placeholder="Enter number of hours worked"
                  autofocus
                />
                <b-form-invalid-feedback id="liveFeedbackHoursWorked">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Opening Till" label-for="openingTill">
                <b-input-group>
                  <b-form-input
                    id="openingTill"
                    type="number"
                    :state="chkState('openingTill')"
                    v-model.lazy.trim="$v.form.openingTill.$model"
                    aria-describedby="liveFeedbackOpeningTill"
                    placeholder="Example: 600"
                    :disabled="denominationLock"
                    autofocus
                  />
                  <b-input-group-append>
                    <calculate-popover
                      target="btnCalOpeningTill"
                      @ok="calculateOpeningTill"
                    />
                  </b-input-group-append>
                  <b-form-invalid-feedback id="liveFeedbackOpeningTill">
                    This is a required field
                  </b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>

              <b-form-group label="Closing Till" label-for="closingTill">
                <b-input-group>
                  <b-form-input
                    id="closingTill"
                    type="number"
                    :state="chkState('closingTill')"
                    v-model.lazy.trim="$v.form.closingTill.$model"
                    aria-describedby="liveFeedbackClosingTill"
                    placeholder="Closing Till"
                    :disabled="denominationLock"
                    autofocus
                  />
                  <b-input-group-append>
                    <calculate-popover
                      target="btnCalClosingTill"
                      @ok="calculateClosingTill"
                    />
                  </b-input-group-append>
                  <b-form-invalid-feedback id="liveFeedbackClosingTill">
                    This is a required field
                  </b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>

              <b-form-group label="EftPOS" label-for="eFtPos">
                <b-form-input
                  id="eFtPos"
                  type="number"
                  :state="chkState('eFtPos')"
                  v-model.lazy.trim="$v.form.eFtPos.$model"
                  aria-describedby="liveFeedbackEftPOS"
                  placeholder="Example: 1200.54"
                  autofocus
                />
                <b-form-invalid-feedback id="liveFeedbackEftPOS">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Other Cash" label-for="otherCash">
                <b-input-group>
                  <b-form-input
                    id="otherCash"
                    type="number"
                    :state="chkState('otherCash')"
                    v-model.lazy.trim="$v.form.otherCash.$model"
                    aria-describedby="liveFeedbackOtherCash"
                    placeholder="Example: 2000"
                    :disabled="denominationLock"
                    autofocus
                  />
                  <b-input-group-append>
                    <calculate-popover
                      target="btnCalOtherCash"
                      @ok="calculateOtherCash"
                    />
                  </b-input-group-append>
                  <b-form-invalid-feedback id="liveFeedbackOtherCash">
                    This is a required field
                  </b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>

              <b-form-group label="Payments" label-for="payments">
                <b-input-group>
                  <b-form-input
                    id="payments"
                    type="number"
                    :state="chkState('payments')"
                    v-model.lazy.trim="$v.form.payments.$model"
                    aria-describedby="liveFeedbackPayments"
                    placeholder="Example: 100"
                    autofocus
                    disabled
                  />
                  <b-input-group-append>
                    <b-button @click="showAddInvoice"
                      ><i class="fa fa-plus fa-lg"></i
                    ></b-button>
                  </b-input-group-append>
                  <b-form-invalid-feedback id="liveFeedbackPayments">
                    This is a required field
                  </b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>

              <b-form-group
                label="Sales As Per System"
                label-for="saleAsPerSystem"
                v-if="isManually"
              >
                <b-form-input
                  id="saleAsPerSystem"
                  type="number"
                  :state="chkState('saleAsPerSystem')"
                  v-model.lazy.trim="$v.form.saleAsPerSystem.$model"
                  aria-describedby="liveFeedbackSaleAsPerSystem"
                  placeholder="Example: 1000"
                  autofocus
                />
                <b-form-invalid-feedback id="liveFeedbackSaleAsPerSystem">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                label="Customer Count"
                label-for="customerCount"
                v-if="isManually"
              >
                <b-form-input
                  id="customerCount"
                  type="number"
                  :state="chkState('customerCount')"
                  v-model.lazy.trim="$v.form.customerCount.$model"
                  aria-describedby="liveFeedbackCustomerCount"
                  placeholder="Example: 100"
                  autofocus
                />
                <b-form-invalid-feedback id="liveFeedbackCustomerCount">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Change" label-for="change" v-if="isChange">
                <b-input-group>
                  <b-form-input
                    id="change"
                    type="number"
                    :state="chkState('change')"
                    v-model.lazy.trim="$v.form.change.$model"
                    aria-describedby="liveFeedbackChange"
                    placeholder="Example: 100"
                    autofocus
                  />
                  <b-input-group-append>
                    <calculate-popover
                      target="btnCalChange"
                      @ok="calculateChange"
                    />
                  </b-input-group-append>
                  <b-form-invalid-feedback id="liveFeedbackChange">
                    This is a required field
                  </b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>

              <b-form-group label="Comments" label-for="comments">
                <b-form-input
                  id="comments"
                  type="text"
                  aria-describedby="liveFeedbackComments"
                  v-model.lazy.trim="$v.form.comments.$model"
                  placeholder="Example: drinks invoice paid"
                  autofocus
                />
                <b-form-invalid-feedback id="liveFeedbackComments">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                :disabled="$v.form.$invalid || (isChange && form.change == 0)"
              >
                Submit
              </b-button>
            </b-form>
            <br />
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <div>
      <b-modal
        ref="modalAddInvoice"
        title="Add Invoice"
        hide-footer
        no-enforce-focus
      >
        <invoice-form-add
          v-if="canShowAddInvoice"
          @success="addInvoiceSuccess"
          @cancel="cancelAddInvoice"
          :store="store"
        />
      </b-modal>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import { required, requiredIf } from "vuelidate/lib/validators";
import CalculatePopover from "./CalculatePopover";
import InvoiceFormAdd from "./InvoiceFormAdd";

const formShape = {
  hoursWorked: null,
  openingTill: null,
  closingTill: null,
  eFtPos: null,
  otherCash: null,
  payments: 0,
  change: 0,
  saleAsPerSystem: null,
  customerCount: null,
  comments: ""
};

const greaterThanZero = value => value > 0;

export default {
  name: "CloseShiftForm",
  components: {
    CalculatePopover,
    InvoiceFormAdd
  },
  props: {
    closeShiftData: Array,
    store: Object,
    shift: Object,
    closingDate: Date,
    isManually: Boolean
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      wsamount: 0,
      osamount: 0,
      ssamount: 0,
      showOpeningTillPopover: false,
      denominationLock: false,
      isChange: false,
      denominations: {
        opening_till: null,
        closing_till: null,
        other_cash: null
      },
      canShowAddInvoice: false
    };
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    },
    ...mapGetters({
      getStoreById: "stores/getStoreById"
    })
  },
  mounted() {
    _.forEach(this.closeShiftData, item => {
      switch (item.key) {
        case "openingTill":
          this.form.openingTill = item.defaultValue;
          break;
        case "hoursWorked":
          this.form.hoursWorked = item.defaultValue;
          break;
        case "saleAsPerSystem":
          this.form.saleAsPerSystem = item.defaultValue;
          break;
        case "customerCount":
          this.form.customerCount = item.defaultValue;
          break;
        case "wsamount":
          this.wsamount = item.defaultValue;
          break;
        case "osamount":
          this.osamount = item.defaultValue;
          break;
        case "ssamount":
          this.ssamount = item.defaultValue;
          break;
        case "eFtPos":
          this.form.eFtPos = item.defaultValue;
      }
    });
  },
  validations() {
    return this.isChange ? {
      form: {
        hoursWorked: {
          required
        },
        openingTill: {
          required
        },
        closingTill: {
          required
        },
        eFtPos: {
          required
        },
        otherCash: {
          required
        },
        payments: {
          required
        },
        change: {
          required,
          greaterThanZero
        },
        comments: {
          required
        },
        saleAsPerSystem: {
          required
        },
        customerCount: {
          required
        }
      }
    } : {
      form: {
        hoursWorked: {
          required
        },
        openingTill: {
          required
        },
        closingTill: {
          required
        },
        eFtPos: {
          required
        },
        otherCash: {
          required
        },
        payments: {
          required
        },
        comments: {
          required
        },
        saleAsPerSystem: {
          required
        },
        customerCount: {
          required
        }
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          let params = {
            hoursWorked: this.form.hoursWorked,
            openingTill: this.form.openingTill,
            closingTill: this.form.closingTill,
            eFtPos: this.form.eFtPos,
            otherCash: this.form.otherCash,
            payments: this.form.payments,
            change: this.form.change,
            comments: this.isManually
              ? "Manual CloseCash - " + this.form.comments
              : this.form.comments,
            saleAsPerSystem: this.form.saleAsPerSystem,
            customerCount: this.form.customerCount,
            wsamount: this.wsamount,
            osamount: this.osamount,
            ssamount: this.ssamount,
            storeId: this.store ? this.store.value : null,
            shiftId: this.shift ? this.shift.value : null,
            closingDate: this.formatDate(this.closingDate),
            denominations: this.denominations
          };

          Vue.axios
            .post("submitShift", params)
            .then(() => {
              this.$emit("success");
              this.showSuccessMsg();
            })
            .catch(() => {
              this.showErrorMsg();
            });
        });
      }
    },
    calculateOpeningTill(value, denomination) {
      this.form.openingTill = value;
      this.denominations.opening_till = denomination;
    },
    calculateClosingTill(value, denomination) {
      this.form.closingTill = value;
      this.denominations.closing_till = denomination;
    },
    calculateOtherCash(value, denomination) {
      this.form.otherCash = value;
      this.denominations.other_cash = denomination;
    },
    calculateChange(value) {
      this.form.change = value;
    },
    showAddInvoice() {
      this.canShowAddInvoice = true;
      this.$refs.modalAddInvoice.show();
    },
    cancelAddInvoice() {
      this.canShowAddInvoice = false;
      this.$refs.modalAddInvoice.hide();
    },
    addInvoiceSuccess(invoice) {
      this.canShowAddInvoice = false;
      this.$refs.modalAddInvoice.hide();
      this.form.payments += parseFloat(invoice.invoiceamount);
    },
    onReset() {
      // Reset validation
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
    let selectedStore = this.getStoreById(this.store.value);
    this.denominationLock = selectedStore.denomination_lock ? true : false;
    this.isChange = selectedStore.is_change ? true : false;
  }
};
</script>
