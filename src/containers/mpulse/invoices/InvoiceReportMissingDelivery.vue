<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-row>
        <b-col lg="12">
          <!--<h6>Simple Form</h6>-->
          <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
            <b-form-group label="Store Name" label-for="store" :state="chkState('store')">
              <store-select v-model="$v.form.store.$model"></store-select>
            </b-form-group>

            <b-form-group label="Expected Delivery Date" :state="chkState('deliveryDate')">
              <v-date-picker v-model="$v.form.deliveryDate.$model" :input-props='{ class: "form-control" }' show-caps>
              </v-date-picker>
            </b-form-group>

            <b-form-group label="Distributor Name" label-for="store" :state="chkState('distributor')">
              <v-select :options="distributorList" v-model="$v.form.distributor.$model" placeholder="Select Distributor"></v-select>
            </b-form-group>

            <b-form-group label="Comments" label-for="comments">
              <b-form-textarea id="comments" type="text" aria-describedby="liveFeedbackComment" v-model.lazy.trim="$v.form.comments.$model"
                :placeholder="'Why was stock not ordered? \nHave you informed your regional manager? \nDo have enough stock to last till next order date? '"
                :rows="3"
                autofocus />
            </b-form-group>

            <b-button type="submit" variant="primary" :disabled="$v.form.$invalid || submitted">
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
  required
} from "vuelidate/lib/validators"

const formShape = {
  store: null,
  deliveryDate: new Date(),
  distributor: null,
  comments: ""
}

export default {
  name: "InvoiceReportMissingDelivery",
  data() {
    return {
      form: Object.assign({}, formShape),
      submitted: false,
    }
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
    distributorList() {
      let list = []
      Vue._.forEach(this.$store.state.distributors.unassigned, (distributor) => {
        list.push({
          label: distributor.distributorname,
          value: distributor.distributorid
        })
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
      distributor: {
        required
      },
      comments: {},
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true
          let params = {
            storeId: this.$v.form.store.$model.value,
            distributorId: this.$v.form.distributor.$model.value,
            deliveryDate: this.$moment(this.$v.form.deliveryDate.$model).format('YYYY-MM-DD'),
            dueDate:this.$moment(this.$v.form.deliveryDate.$model).add(7, 'days').format('YYYY-MM-DD'),
            invoiceAmount: 0,
            invoiceNumber: 'RMD-'+this.createUniqueId(),
            comments: this.$v.form.comments.$model
          }

          this.$store.dispatch('invoices/addInvoice', params)
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
    this.$store.dispatch('distributors/getUnAssignedDistributors')
  }
}
</script>
