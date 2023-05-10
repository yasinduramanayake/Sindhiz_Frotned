<template>
  <div class="animated fadeIn">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col lg="12">
            <!--<h6>Simple Form</h6>-->
            <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>

              <b-form-group id="passInputGroup5"
                            label="Password"
                            label-for="password">
                <b-form-input id="password"
                              type="password"
                              v-model.trim="$v.form.password.$model"
                              :state="chkState('password')"
                              aria-describedby="input1LiveFeedback5"
                              placeholder="Password"
                              autocomplete='password' />
                <b-form-invalid-feedback id="input1LiveFeedback5">
                  Password is required
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group id="passInputGroup5"
                            label="New Password"
                            label-for="newPassword">
                <b-form-input id="newPassword"
                              type="password"
                              v-model.trim="$v.form.newPassword.$model"
                              :state="chkState('newPassword')"
                              aria-describedby="input1LiveFeedback5"
                              placeholder="New Password"
                               />
                <b-form-invalid-feedback id="input1LiveFeedback5">
                  Required password should be from 8 - 16 characters
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group id="confPassInputGroup6"
                            label="Confirm password"
                            label-for="confirm_password">
                <b-form-input id="confirm_password"
                              type="password"
                              v-model.trim="$v.form.confirmPassword.$model"
                              :state="chkState('confirmPassword')"
                              aria-describedby="input1LiveFeedback6"
                              placeholder="Confirm password"
                              />
                <b-form-invalid-feedback id="input1LiveFeedback6">
                  Passwords must match
                </b-form-invalid-feedback>
              </b-form-group>

              <b-button type="submit" variant="primary" :disabled="$v.form.$invalid">
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
import { required, minLength, maxLength, sameAs, helpers } from "vuelidate/lib/validators"

const formShape = {
  password: "",
  newPassword: "",
  confirmPassword: ""
}

export default {
  name: "ChangePassword",
  data() {
    return {
      form: Object.assign({}, formShape)
    }
  },
  computed: {
    isValid() { return !this.$v.form.$anyError },
    isDirty() { return this.$v.form.$anyDirty }
  },
  watch: {
  },
  validations: {
    form: {
      password: {
        required
      },
      newPassword: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(16)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("newPassword")
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          let params = {
            oldPassword: this.form.password,
            newPassword: this.form.newPassword,
            confirmPassword: this.form.confirmPassword
          }

          Vue.axios.post('changePassword', params)
            .then(() => {
              this.$emit('success')
              this.showSuccessMsg()
              this.onReset();
            })
            .catch((error) => {
              if (error.response.status == 422) {
                this.showErrorMsg({message: "The old password is incorrect" })
              } else {
                this.showErrorMsg()
              }
            })
        })
      }
    },
    onCancel() {
      this.onReset();
      this.$emit('cancel')
    },
    onReset() {
      // Reset validation
      this.form = formShape
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
  notifications: {
    showSuccessMsg: {
      type: 'success',
      message: 'Changed password successfully'
    },
    showErrorMsg: {
      type: 'error',
      message: 'Changing password failed'
    }
  }
}
</script>
