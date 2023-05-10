<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-row>
        <b-col lg="12">
          <!--<h6>Simple Form</h6>-->
          <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>

            <b-form-group label="Distributor Name" label-for="distributorName">
              <b-form-input id="distributorName" type="text" aria-describedby="liveFeedbackName" v-model.lazy.trim="$v.form.distributorName.$model" placeholder="Distributor Name" autofocus />
              <b-form-invalid-feedback id="liveFeedbackName">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Account" label-for="account" :state="chkState('account')">
              <account-select v-model="$v.form.account.$model"></account-select>
            </b-form-group>

            <b-form-group>
              <div class="custom-control custom-control-inline">
                <b-form-checkbox id="isActive" v-model.lazy.trim="$v.form.isActive.$model" :unchecked-value="false">
                  Is Active
                </b-form-checkbox>
              </div>
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
  required
} from "vuelidate/lib/validators"

const formShape = {
  distributorName: "",
  account:null,
  isActive: true
}

export default {
  name: "DistributorFormEdit",
  props: {
    distributor: Object
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      submitted: false
    }
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    }
  },
  validations: {
    form: {
      distributorName: {
        required
      },
      account:{
        required
      },
      isActive: {}
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true
          let params = {
            distributorId: this.distributor.distributorid,
            distributorName: this.$v.form.distributorName.$model,
            isActive: this.$v.form.isActive.$model,
            accountId: this.$v.form.account.$model.value,

          }
          this.$store.dispatch('distributors/editDistributor', params)
            .then(() => {
              this.$emit('success')
              this.showSuccessMsg()
            })
            .catch((error) => {
              if (error.response.status == 400) {
                this.showErrorMsg({
                  message: error.response.data.message
                })
              } else {
                this.showErrorMsg()
              }
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
  beforeMount() {
    this.form.distributorName = this.distributor.distributorname
    this.form.account = this.distributor.account ? {label: this.distributor.account.accountname, value: this.distributor.account.accountid} : null
    this.form.isActive = this.distributor.isactive == 1
  }
}
</script>
