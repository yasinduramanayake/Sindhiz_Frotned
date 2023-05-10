<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-row>
        <b-col lg="12">
          <!--<h6>Simple Form</h6>-->
          <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>

            <b-form-group label="Company Name">
              <b-form-input id="companyName" type="text" aria-describedby="liveFeedbackName" v-model.lazy.trim="$v.form.companyName.$model" placeholder="Company Name" autofocus />
            </b-form-group>

            <b-form-group label="Company Email" >
              <b-form-input id="companyEmail" type="email" v-model.lazy.trim="$v.form.companyEmail.$model" placeholder="Company Email" autofocus />
            </b-form-group>

            <b-form-group label="Company Accounts" >
              <b-form-input id="companyAccounts" type="email" v-model.lazy.trim="$v.form.companyAccounts.$model" placeholder="Company Accounts" autofocus />
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
  mapState,
  mapActions
} from 'vuex'
import {
  required
} from "vuelidate/lib/validators"

const formShape = {
  companyName: "",
  companyEmail: "",
  companyAccounts: "",
  isActive: true
}

export default {
  name: "CompanyFormEdit",
  props: {
    company: Object
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
    },
  },
  validations: {
    form: {
      companyName: {
        required
      },
      companyEmail: {
        required
      },
      companyAccounts:{},
      isActive: {}
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true
          let params = {
            companyId: this.company.companyid,
            companyName: this.$v.form.companyName.$model,
            companyEmail: this.$v.form.companyEmail.$model,
            companyAccounts: this.$v.form.companyAccounts.$model,
            isActive: this.$v.form.isActive.$model,
          }

          this.$store.dispatch('companies/editCompany', params)
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
    this.form.companyName = this.company.companyname;
    this.form.companyEmail = this.company.companyemail;
    this.form.companyAccounts = this.company.companyaccounts;
    this.form.isVisible = this.company.isvisible == 1;
  }
}
</script>
