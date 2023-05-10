<template>
<div class="app flex-row align-items-center">
  <div class="container">
    <b-row class="justify-content-center">
      <b-col md="8">
        <b-card-group>
          <b-card no-body class="p-4">
            <b-card-body>
              <b-form @submit="onSubmit">
                <h1>Create Password</h1>
                <p class="text-muted">Please enter your new password</p>
                <b-form-group label="Email" label-for="email">
                  <b-form-input id="email" type="email" v-model.trim="$v.form.email.$model" :state="chkState('email')" aria-describedby="input1LiveFeedback4" placeholder="Email" autocomplete='email' />
                  <b-form-invalid-feedback id="input1LiveFeedback4">
                    This is a required field and must be valid e-mail address
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Token" label-for="token">
                  <b-form-input id="token" type="text" v-model.trim="$v.form.token.$model" :state="chkState('token')" aria-describedby="input1LiveFeedback3" placeholder="Reset Token" />
                  <b-form-invalid-feedback id="input1LiveFeedback3">
                    This is a required field
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Password" label-for="password">
                  <b-form-input id="password" type="password" v-model.trim="$v.form.password.$model" :state="chkState('password')" aria-describedby="input1LiveFeedback5" placeholder="Password" autocomplete='new-password' />
                  <b-form-invalid-feedback id="input1LiveFeedback5">
                    Required password containing at least 8 characters
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Confirm password" label-for="confirm_password">
                  <b-form-input id="confirm_password" type="password" v-model.trim="$v.form.confirmPassword.$model" :state="chkState('confirmPassword')" aria-describedby="input1LiveFeedback6" placeholder="Confirm password"
                    autocomplete='new-password' />
                  <b-form-invalid-feedback id="input1LiveFeedback6">
                    Passwords must match
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-row>
                  <b-col cols="6">
                    <b-button type="submit" variant="primary" :disabled="$v.form.$invalid || submitted">
                      Submit
                    </b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" class="px-0" :to="{name: 'LoginForm'}">Go to Login page</b-button>
                  </b-col>
                </b-row>

              </b-form>
            </b-card-body>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import {
  required,
  minLength,
  email,
  sameAs,
  helpers
} from "vuelidate/lib/validators"

const formShape = {
  email: "",
  token: "",
  password: "",
  confirmPassword: "",
}

export default {
  name: 'CreatePassword',
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
  },
  data: function() {
    return {
      form: Object.assign({}, formShape),
      submitted: false
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.validate()) {
        this.$nextTick(() => {
          let params = {
            email: this.form.email,
            token: this.form.token,
            password: this.form.password,
            password_confirmation: this.form.confirmPassword
          }
          Vue.axios.post('/auth/reset', params)
            .then(() => {
              this.showSuccessMsg()
              this.$auth.login({
                data: {
                  email: this.form.email,
                  password: this.form.password
                },
                redirect: {
                  name: 'Home'
                },
                fetchUser: false,
                success: (res) => {
                  this.$auth.user(res.data.user);
                },
                error: (res) => {
                  this.errors = ['Invalid email or password'];
                }
              });
            })
            .catch((error) => {
              if (error.response.status == 401 || error.response.status == 422) {
                this.showErrorMsg({
                  message: error.response.data.message
                })
              } else {
                this.showErrorMsg()
              }
            })
          this.submitted = true
        })
      }
    },
    onReset() {
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
        error.response.status == 401
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
    this.form.email = this.$route.query.email
    this.form.token = this.$route.query.token
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      token: {
        required
      },
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  }
}
</script>
