<template>
  <div class="animated fadeIn">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col lg="12">
            <!--<h6>Simple Form</h6>-->
            <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
              <b-form-group label="Store Name" label-for="store" :state="chkState('store')" >
                <v-select :options="storeList" v-model="$v.form.store.$model" placeholder="Select Store"></v-select>
                <b-form-invalid-feedback id="liveFeedbackStore">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Delivery Date" :state="chkState('deliveryDate')">

              <datetime
                type="datetime" v-model="$v.form.deliveryDate.$model"
                format="MM-dd-yyyy HH:mm:ss"
                input-class="form-control"
                  show-caps>
              </datetime>
              </b-form-group>

              <b-form-group label="Transaction Time" label-for="transactionTime" :state="chkState('transactionTime')">
                <datetime
                type="datetime" v-model="$v.form.transactionTime.$model"
                format="MM-dd-yyyy HH:mm:ss"
                input-class="form-control"
                  show-caps>
              </datetime>
                <b-form-invalid-feedback id="liveFeedbackTransactionTime">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
              <div class="custom-control custom-checkbox custom-control-inline">
                  <b-form-checkbox
                          id="confirmation"
                          :state="chkState('confirmation')"
                          v-model.lazy.trim="$v.form.confirmation.$model"
                          unchecked-value="false"
                  >
                    Warning: Performing this action deletes current stock levels, this action can not be reversed
                  </b-form-checkbox>
                </div>
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
import { mapState, mapActions } from 'vuex'
import { required } from "vuelidate/lib/validators"
import vSelect from 'vue-select'
import { setupCalendar, DatePicker } from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import 'vue-datetime/dist/vue-datetime.css'
import { Datetime } from 'vue-datetime';

const formShape = {
  store: null,
  deliveryDate: null,
  transactionTime: null,
  confirmation: false,
}

export default {
  name: "StockLevelFormReset",
template: '...',
  components: {
    vSelect,
    'v-date-picker': DatePicker,
     datetime: Datetime
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      submitted: false
    }
  },
  computed: {
    isValid() { return !this.$v.form.$anyError },
    isDirty() { return this.$v.form.$anyDirty },
    storeList() {
      let list = []
      Vue._.forEach(this.$store.state.stores.all, (store) => {
        list.push({label: store.storename, value: store.storeid})
      })
      return list
    },
    distributorList() {
      let list = []
      Vue._.forEach(this.$store.state.distributors.active, (distributor) => {
        list.push({label: distributor.distributorname, value: distributor.distributorid})
      })
      return list
    }
  },
  validations: {
    form: {
      store: {
        required
      },
      deliveryDate: {
        required
      },
      transactionTime: {
        required
      },

      confirmation: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true
          let params = {
            storeId: this.$v.form.store.$model.value,
            deliveryDateTime: this.$moment(this.$v.form.deliveryDate.$model).format('YYYY-MM-DD HH:mm:ss'),
            transactionDateTime: this.$moment(this.$v.form.transactionTime.$model).format('YYYY-MM-DD HH:mm:ss'),
          }
          this.$store.dispatch('stockLevels/resetStockLevel', params)
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
  }
}
</script>
