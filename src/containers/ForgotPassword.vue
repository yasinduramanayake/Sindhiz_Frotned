<template>
<div class="app flex-row align-items-center">
  <div class="container">
    <b-row class="justify-content-center">
      <b-col md="8">
        <b-card-group>
          <b-card no-body class="p-4">
            <b-card-body>
              <b-form @submit="onSubmit">
                <h1>Forgot Password?</h1>
                <p class="text-muted">We'll help you to reset your password</p>
                <b-form-group label="Please enter your email address" label-for="emailForgotPassword">
                  <b-form-input id="emailForgotPassword" type="email" v-model.trim="emailForgotPassword" :state="checkEmailForgotPassword()" placeholder="Email address" aria-describedby="emailForgotPasswordLiveFeedback" autofocus />
                  <b-form-invalid-feedback id="emailForgotPasswordLiveFeedback">
                    This is a required field and must be valid e-mail address
                  </b-form-invalid-feedback>

                </b-form-group>
                <p class="text-danger" v-if="errors.length">
                  <b>Error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>

                <b-row>
                  <b-col cols="6">
                    <b-button type="submit" variant="primary" :disabled="submitted || !emailForgotPassword || !checkEmailForgotPassword()">
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
export default {
  name: 'Login',
  data: function() {
    return {
      errors: [],
      emailForgotPassword: '',
      submitted: false
    };
  },
  methods: {
    checkForm: function() {
      this.errors = [];

      if (!this.emailForgotPassword) {
        this.errors.push('Email required.');
      } else if (!this.validEmail(this.emailForgotPassword)) {
        this.errors.push('Valid email required.');
      }

      if (!this.errors.length) {
        return true;
      }
      return false;
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    onSubmit(evt) {
      evt.preventDefault();
      if (!this.checkForm()) {
        return false;
      }
      this.submitted = true
      Vue.axios.post('/auth/forgot', {
          email: this.emailForgotPassword
        })
        .then(() => {
          this.showSuccessMsg()
          this.$refs.modalForgotPassword.hide()
          this.emailForgotPassword = null
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.showErrorMsg({
              message: error.response.data.message
            })
          } else {
            this.showErrorMsg()
          }
        })
    },
    checkEmailForgotPassword() {
      return this.emailForgotPassword ? this.validEmail(this.emailForgotPassword) : true;
    },
  },
  notifications: {
    showSuccessMsg: {
      type: 'success',
      title: 'Success',
      message: 'Please check your email for futher action.'
    },
    showErrorMsg: {
      type: 'error',
      title: 'Error',
      message: 'Please try again later.'
    }
  }
}
</script>
