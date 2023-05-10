<template>
  <div class="animated fadeIn">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col lg="12">
            <!--<h6>Simple Form</h6>-->
            <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
              <b-form-group label="Date" :state="chkState('date')">
                <v-date-picker
                  v-model="$v.form.date.$model"
                  :input-props='{ class: "form-control" }'
                  show-caps>
                </v-date-picker>
                <b-form-invalid-feedback id="liveFeedbackDate">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Hours" label-for="hours" >
                <b-form-input id="hours"
                              type="number"
                              :state="chkState('hours')"
                              v-model.lazy.trim="$v.form.hours.$model"
                              aria-describedby="liveFeedbackHours"
                              placeholder="Hours" />
                <b-form-invalid-feedback id="liveFeedbackHours">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Staff" label-for="staff" :state="chkState('staff')">
                <v-select :options="staffList" v-model="$v.form.staff.$model" placeholder="Select Staff"></v-select>
                <b-form-invalid-feedback id="liveFeedbackStaff">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="Customer Count" label-for="customerCount" >
                <b-form-input id="customercount"
                              type="number"
                              :state="chkState('customerCount')"
                              v-model.lazy.trim="$v.form.customerCount.$model"
                              aria-describedby="liveFeedbackCustomerCount"
                              placeholder="Customer Count" />
                <b-form-invalid-feedback id="liveFeedbackCustomerCount">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Closing Till" label-for="closingTill" >
                <b-form-input id="closingTill"
                              type="number"
                              :state="chkState('closingTill')"
                              v-model.lazy.trim="$v.form.closingTill.$model"
                              aria-describedby="liveFeedbackClosingTill"
                              placeholder="Closing Till" />
                <b-form-invalid-feedback id="liveFeedbackClosingTill">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Other Cash" label-for="otherCash" class="otherCashField">
                <b-form-input id="otherCash"
                              type="number"
                              :state="chkState('otherCash')"
                              v-model.lazy.trim="$v.form.otherCash.$model"
                              aria-describedby="liveFeedbackOtherCash"
                              placeholder="Other Cash" 
                              />
                <b-input-group-append>
                  <calculate-popover target="btnCalOtherCash" @ok="calculateOtherCash" />
                </b-input-group-append>
                <b-form-invalid-feedback id="liveFeedbackOtherCash">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="EftPos" label-for="eftPos" >
                <b-form-input id="eftPos"
                              type="number"
                              :state="chkState('eftPos')"
                              v-model.lazy.trim="$v.form.eftPos.$model"
                              aria-describedby="liveFeedbackEftPos"
                              placeholder="EftPos" />
                <b-form-invalid-feedback id="liveFeedbackEftPos">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Payment" label-for="payment" >
                <b-form-input id="payment"
                              type="number"
                              :state="chkState('payment')"
                              v-model.lazy.trim="$v.form.payment.$model"
                              aria-describedby="liveFeedbackPayment"
                              placeholder="Payment" />
                <b-form-invalid-feedback id="liveFeedbackPayment">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

               <b-form-group label="Opening Till" label-for="openingTill" >
                <b-form-input id="openingTill"
                              type="number"
                              :state="chkState('openingTill')"
                              v-model.lazy.trim="$v.form.openingTill.$model"
                              aria-describedby="liveFeedbackOpeningTill"
                              placeholder="Opening Till" />
                <b-form-invalid-feedback id="liveFeedbackOpeningTill">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Sale As Per System" label-for="saleSystem" >
                <b-form-input id="saleSystem"
                              type="number"
                              :state="chkState('saleSystem')"
                              v-model.lazy.trim="$v.form.saleSystem.$model"
                              aria-describedby="liveFeedbackSaleSystem"
                              placeholder="Sale As Per System" />
                <b-form-invalid-feedback id="liveFeedbackSaleSystem">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Comments" label-for="comments" >
                <b-form-input id="comments"
                              type="text"
                              :state="chkState('comments')"
                              v-model.lazy.trim="$v.form.comments.$model"
                              aria-describedby="liveFeedbackComments"
                              placeholder="Comments" />
                <b-form-invalid-feedback id="liveFeedbackComments">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-button type="submit" variant="primary" :disabled="$v.form.$invalid || submitted">
                Submit
              </b-button>
              <b-button class="ml-1" type="reset" @click="onCancel">Cancel</b-button>
            </b-form>
            <br/>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'
import { required } from "vuelidate/lib/validators"
import vSelect from 'vue-select'
import { setupCalendar, DatePicker } from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import CalculatePopover from './CalculatePopover'

const formShape = {
  staff: null,
  date: new Date(),
  hours: "",
  customerCount: "",
  closingTill: "",
  otherCash: "",
  eftPos: "",
  payment: "",
  openingTill: "",
  saleSystem: "",
  comments: ""
}

export default {
  name: "EditCloseCashFormEdit",
  components: {
    vSelect,
    'v-date-picker': DatePicker,
    CalculatePopover
  },
  props: {
    editCloseCash: Object,
    store: Object,
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      submitted: false,
      showCollapse: false,  
      denominations: {
        other_cash: null
      }
    }
  },
  computed: {
    isValid() { return !this.$v.form.$anyError },
    isDirty() { return this.$v.form.$anyDirty },
    staffList() {
      let list = []
      Vue._.forEach(this.$store.state.staffs.all, (staff) => {
      let staffname=staff.firstname+" "+staff.lastname
        list.push({label: staffname, value: staff.staffid})
         if(staff.staffid==this.editCloseCash.staffid){
             this.form.staff = {label: staffname, value: staff.staffid}
            }
      })
      return list
    },
    ...mapGetters({
      getStoreById: 'stores/getStoreById'
    })
  },
  validations: {
    form: {
      staff: {
        required
      },
      date: {
        required
      },
       hours: {
        required
      },
      customerCount: {
        required
      },
      closingTill: {
        required
      },
      otherCash: {
        required
      },
       eftPos: {
        required
      },
       payment: {
        required
      },
       openingTill: {
        required
      },
       saleSystem: {
        required
      },
       comments: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true

          Vue.axios.post('/updateCloseCash', {
            closecashid: this.editCloseCash.closecashid,
            staffid: this.$v.form.staff.$model.value,
            date: this.$moment(this.$v.form.date.$model).format('YYYY-MM-DD'),
            hours: this.$v.form.hours.$model,
            customercount: this.$v.form.customerCount.$model,
            closingtill: this.$v.form.closingTill.$model,
            othercash: this.$v.form.otherCash.$model,
            eftpos: this.$v.form.eftPos.$model,
            payments: this.$v.form.payment.$model,
            openingtill: this.$v.form.openingTill.$model,
            salesystem: this.$v.form.saleSystem.$model,
            comments: this.$v.form.comments.$model,
            denominations: this.denominations
          }).then((response) => {
            this.$emit('success')
            this.showSuccessMsg()
          }).catch((error) => {
            this.showErrorMsg()
          })
        })
      }
    },
    onCancel() {
      this.$emit('cancel')
    },
    onReset() {
      // Reset validation
      this.form = formShape
      this.submitted = false
      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    chkState(val) {
      const field = this.$v.form[val]
      return field.$dirty ? !field.$invalid : null
    },
    findFirstError(component = this) {
      if (component.state === false) {
        if (component.$refs.input) {
          component.$refs.input.focus()
          return true
        }
        if (component.$refs.check) {
          component.$refs.check.focus()
          return true
        }
      }
      let focused = false
      component.$children.some((child) => {
        focused = this.findFirstError(child)
        return focused
      })

      return focused
    },
    validate() {
      this.$v.$touch()
      this.$nextTick(() => this.findFirstError())
      return this.isValid
    },
    calculateOtherCash(value, denomination) {
      this.form.otherCash = value
      this.denominations.other_cash = denomination
    },
  },
  created() {
    this.$store.dispatch('staffs/getStaffs')
  },
  beforeMount() {
    this.form.date = new Date(this.editCloseCash.date)
    this.form.hours = this.editCloseCash.hours
    this.form.customerCount = this.editCloseCash.customercount
    this.form.closingTill = this.editCloseCash.closingtill
    this.form.otherCash = this.editCloseCash.othercash
    this.form.eftPos = this.editCloseCash.eftpos
    this.form.payment = this.editCloseCash.payments
    this.form.openingTill = this.editCloseCash.openingtill
    this.form.saleSystem = this.editCloseCash.salesystem
    this.form.comments = this.editCloseCash.comments
  }
}
</script>
<style>
.otherCashField #otherCash{
    display: inline-block;
    max-width: 90%;
}
.otherCashField .input-group-append{
    display: inline-block;
    vertical-align: top;
}
</style>