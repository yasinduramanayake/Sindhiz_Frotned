<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-row>
        <b-col lg="12">
          <!--<h6>Simple Form</h6>-->
          <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
            <b-form-group label="Name" label-for="name">
              <b-form-input id="storeName"  type="text" aria-describedby="liveFeedbackStoreName" v-model.lazy.trim="$v.form.storeName.$model" placeholder="Store Name" autofocus />
              <b-form-invalid-feedback id="liveFeedbackStoreName">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Change Limit" label-for="changeLimit">
              <b-form-input id="changeLimit" type="number" aria-describedby="liveFeedbackChangeLimit" v-model.lazy.trim="$v.form.changeLimit.$model" placeholder="Change Limit" autofocus />
              <b-form-invalid-feedback id="liveFeedbackChangeLimit">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Current Operation Hours" label-for="changeLimit">
              <b-form-input id="currentHours" readonly type="number" v-model.lazy.trim="currentOps" placeholder="Total Hours" autofocus />
            </b-form-group>
            <b-form-group label="Manager" label-for="staff" :state="chkState('manager')">
              <v-select :options="managerList" v-model="$v.form.manager.$model" placeholder="Select Manager"></v-select>
              <b-form-invalid-feedback id="liveFeedbackManager">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="CTN %" label-for="ctnPerc">
              <b-form-input id="ctnPerc" type="number" aria-describedby="liveFeedbackCtnPerc" v-model.lazy.trim="$v.form.ctnPerc.$model" placeholder="CTN %" autofocus />
              <b-form-invalid-feedback id="liveFeedbackCtnPerc">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="PKT %" label-for="pktPerc">
              <b-form-input id="pktPerc" type="number" aria-describedby="liveFeedbackPktPerc" v-model.lazy.trim="$v.form.pktPerc.$model" placeholder="PKT %" autofocus />
              <b-form-invalid-feedback id="liveFeedbackPktPerc">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Tobac %" label-for="tobacPerc">
              <b-form-input id="tobacPerc" type="number" aria-describedby="liveFeedbackTobacPerc" v-model.lazy.trim="$v.form.tobacPerc.$model" placeholder="Tobac %" autofocus />
              <b-form-invalid-feedback id="liveFeedbackTobacPerc">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Cigar %" label-for="cigarPerc">
              <b-form-input id="cigarPerc" type="number" aria-describedby="liveFeedbackCigarPerc" v-model.lazy.trim="$v.form.cigarPerc.$model" placeholder="Cigar %" autofocus />
              <b-form-invalid-feedback id="liveFeedbackCigarPerc">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Store Email" label-for="storeEmail">
              <b-form-input id="storeEmail" type="email" :state="chkState('storeEmail')" aria-describedby="liveFeedbackStoreEmail" v-model.lazy.trim="$v.form.storeEmail.$model" placeholder="Store Email" autofocus />
              <b-form-invalid-feedback id="liveFeedbackStoreEmail">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Accounts Email" label-for="accountsEmail">
              <b-form-input id="accountsEmail" type="email" :state="chkState('accountsEmail')" aria-describedby="liveFeedbackAccountEmail" v-model.lazy.trim="$v.form.accountsEmail.$model" placeholder="Accounts Email" autofocus />
              <b-form-invalid-feedback id="liveFeedbackAccountEmail">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="State" label-for="state">
              <state-select v-model="$v.form.state.$model"></state-select>
            </b-form-group>
            <b-form-group>
              <div class="custom-control custom-control-inline">
                <b-form-checkbox id="inventoryEnabled" v-model.lazy.trim="$v.form.inventoryEnabled.$model" :unchecked-value="false">
                  Inventory Enabled
                </b-form-checkbox>
              </div>
              <div class="custom-control custom-control-inline">
                <b-form-checkbox id="denominationLock" v-model.lazy.trim="$v.form.denominationLock.$model" :unchecked-value="false">
                  Denomination Lock
                </b-form-checkbox>
              </div>
              <div class="custom-control custom-control-inline">
                <b-form-checkbox id="isChange" v-model.lazy.trim="$v.form.isChange.$model" :unchecked-value="false">
                  Change Enabled
                </b-form-checkbox>
              </div>
              <div class="custom-control custom-control-inline">
                <b-form-checkbox id="is_stockscan" v-model.lazy.trim="$v.form.isStockScan.$model" :unchecked-value="false">
                  Is Stock Scan
              </b-form-checkbox>
              </div>
            </b-form-group>
            <b-form-group label="PML invoice Days" label-for="pmlinvoice" :state="chkState('pmlinvoice')">
              <v-select :options="invoiceDays" v-model="$v.form.pmlinvoice.$model" placeholder="PML Invoice Days"></v-select>
            </b-form-group>
            <b-form-group label="BATA invoice Days" label-for="batainvoice" :state="chkState('batainvoice')">
              <v-select :options="invoiceDays" v-model="$v.form.batainvoice.$model" placeholder="BATA Invoice Days"></v-select>
            </b-form-group>
            <b-form-group label="ITA invoice Days" label-for="itainvoice" :state="chkState('itainvoice')">
              <v-select :options="invoiceDays" v-model="$v.form.itainvoice.$model" placeholder="ITA Invoice Days"></v-select>
            </b-form-group>
            <b-form-group label="Store Order">
              <store-order ref="storeOrder" :storeProfile="storeProfile" />
            </b-form-group>
            <b-form-group label="Store Days Hours">
              <store-days-hours ref="storeDaysHours" :storeProfile="storeProfile" />
            </b-form-group>
            <b-button type="submit" variant="primary" :disabled="$v.form.$invalid">
              Submit
            </b-button>
            <b-button class="ml-1" type="reset" @click="onCancel">Cancel</b-button>
          </b-form>
          <br />
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</div>
</template>

<script>
import Vue from 'vue'
import {
  required,numeric
} from "vuelidate/lib/validators"
import StoreOrder from './StoreOrder'
import StoreDaysHours from './StoreDaysHours'


const formShape = {
  storeName: "",
  changeLimit: null,
  manager: null,
  ctnPerc: null,
  pktPerc: null,
  tobacPerc: null,
  cigarPerc: null,
  accountsEmail: null,
  storeEmail: null,
  state: null,
  inventoryEnabled: false,
  denominationLock: false,
  isChange: false,
  isStockScan:false,
  itainvoice: null,
  pmlinvoice:  null,
  batainvoice: null

}

export default {
  name: "StoreProfileFormEdit",
  props: {
    storeProfile: Object,
  },
  components: {
    StoreOrder,
    StoreDaysHours
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      submitted: false,
      currentOps: 0,

    }
  },
  computed: {
    invoiceDays() {
      let list = []
      list.push({
          label: 7,
          value: 7
        })
        list.push({
            label: 14,
            value: 14
          })
          list.push({
              label: 21,
              value: 21
            })
            list.push({
                label: 28,
                value: 28
              })
        return list;
    },
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
    managerList() {
      let list = []
      Vue._.forEach(this.$store.state.staffs.all, (staff) => {
        let staffname = staff.firstname + " " + staff.lastname
        list.push({
          label: staffname,
          value: staff.staffid
        })
        if (staff.staffid == this.storeProfile.managerid) {
          this.form.manager = {
            label: staffname,
            value: staff.staffid
          }
        }
      })
      return list
    }
  },
  validations: {
    form: {
      storeName: {
        required
      },
      changeLimit: {
        required
      },

      manager: {
        required
      },
      ctnPerc: {
        required
      },
      pktPerc: {
        required
      },
      tobacPerc: {
        required
      },
      cigarPerc: {
        required
      },
      accountsEmail: {
        required
      },
      storeEmail: {
        required
      },
      state: {
        required
      },
      inventoryEnabled: {},
      denominationLock: {},
      isChange: {},
      isStockScan:{},
      itainvoice:{

        required,

      },
      batainvoice:{

        required,

      },
      pmlinvoice:{

        required,

      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          console.log(this.$refs.storeOrder.bata_order_percent);
          this.submitted = true
          let params = {
            storeId: this.storeProfile.storeid,
            storeName: this.$v.form.storeName.$model,
            changeLimit: this.$v.form.changeLimit.$model,
            hoursop: this.$refs.storeDaysHours.total,
            managerId: this.$v.form.manager.$model.value,
            ctnPerc: this.$v.form.ctnPerc.$model,
            pktPerc: this.$v.form.pktPerc.$model,
            tobacPerc: this.$v.form.tobacPerc.$model,
            cigarPerc: this.$v.form.cigarPerc.$model,
            accountsEmail: this.$v.form.accountsEmail.$model,
            storeEmail: this.$v.form.storeEmail.$model,
            state: this.$v.form.state.$model.value,
            inventoryEnabled: this.$v.form.inventoryEnabled.$model,
            denominationLock: this.$v.form.denominationLock.$model,
            isChange: this.$v.form.isChange.$model,
            isStockScan: this.$v.form.isStockScan.$model,
            bata_order_percent: this.$refs.storeOrder.bata_order_percent,
            ita_order_percent: this.$refs.storeOrder.ita_order_percent,
            pml_order_percent: this.$refs.storeOrder.pml_order_percent,
            bata_tob_percent: this.$refs.storeOrder.bata_tob_percent,
            ita_tob_percent: this.$refs.storeOrder.ita_tob_percent,
            pml_tob_percent: this.$refs.storeOrder.pml_tob_percent,
            mon_hours: this.$refs.storeDaysHours.mon_hours,
            tue_hours: this.$refs.storeDaysHours.tue_hours,
            wed_hours: this.$refs.storeDaysHours.wed_hours,
            thur_hours: this.$refs.storeDaysHours.thur_hours,
            fri_hours: this.$refs.storeDaysHours.fri_hours,
            sat_hours: this.$refs.storeDaysHours.sat_hours,
            sun_hours: this.$refs.storeDaysHours.sun_hours,
            ita_invoice_days: this.$v.form.itainvoice.$model.value,
            bata_invoice_days: this.$v.form.batainvoice.$model.value,
            pml_invoice_days: this.$v.form.pmlinvoice.$model.value,
          }
          this.$store.dispatch('storeProfiles/updateStoreProfile', params)
            .then(() => {
              this.$emit('success')
              this.showSuccessMsg()
            })
            .catch(() => {
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
    }
  },
  created() {
    this.$store.dispatch('staffs/getStaffs')
  },
  beforeMount() {
    this.form.storeName = this.storeProfile.storename
    this.form.changeLimit = this.storeProfile.changelimit
    this.currentOps = this.storeProfile.hoursop
    this.form.ctnPerc = this.storeProfile.ctnperc
    this.form.pktPerc = this.storeProfile.pktperc
    this.form.tobacPerc = this.storeProfile.tobacperc
    this.form.cigarPerc = this.storeProfile.cigarperc
    this.form.state = this.storeProfile.state ? {label: this.storeProfile.state.toUpperCase(), value: this.storeProfile.state} : null
    this.form.storeEmail = this.storeProfile.storeemail
    this.form.accountsEmail = this.storeProfile.accounts_email
    this.form.inventoryEnabled = this.storeProfile.inventory_enabled == 1
    this.form.denominationLock = this.storeProfile.denomination_lock == 1
    this.form.isChange = this.storeProfile.is_change == 1
    this.form.isStockScan = this.storeProfile.is_stockscan == 1
    this.form.pmlinvoice = {label: this.storeProfile.pml_invoice_days, value: this.storeProfile.pml_invoice_days}
    this.form.batainvoice = {label: this.storeProfile.bata_invoice_days, value: this.storeProfile.bata_invoice_days}
    this.form.itainvoice = {label: this.storeProfile.ita_invoice_days, value: this.storeProfile.ita_invoice_days}
  }
}
</script>
