
<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-row>
        <b-col lg="12">
          <!--<h6>Simple Form</h6>-->
          <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>

            <b-form-group label="Account Name" label-for="accountName">
              <b-form-input id="accountName" type="text" aria-describedby="liveFeedbackName" v-model.lazy.trim="$v.form.accountName.$model" placeholder="Account Name" autofocus />
              <b-form-invalid-feedback id="liveFeedbackName">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Tax" label-for="tax" :state="chkState('tax')">
              <tax-select v-model="$v.form.tax.$model"></tax-select>
            </b-form-group>

            <b-form-group label="Account Type" label-for="store" :state="chkState('accountType')">
              <account-type-select v-model="$v.form.accountType.$model"></account-type-select>
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
  mapState,
  mapActions
} from 'vuex'
import {
  required
} from "vuelidate/lib/validators"

const formShape = {
  accountName: "",
  accountType: null,
  tax: null
}

export default {
  name: "AccountFormAdd",
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
      accountName: {
        required
      },
      accountType: {
        required
      },
      tax: {
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
            accountName: this.$v.form.accountName.$model,
            taxId: this.$v.form.tax.$model.value,
            accountTypeId: this.$v.form.accountType.$model.value,
          }

          this.$store.dispatch('accounts/addAccount', params)
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
  }
}
</script>
