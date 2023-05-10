<template>
  <div class="app flex-row align-items-center">
    <div class="container">

      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit="onSubmit">
                  <b-row class="pb-3">
                    <b-col class="text-center">
                      <img class="logo" src="/img/brand/logo.png" />
                    </b-col>
                  </b-row>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="email" v-model="email" class="form-control" placeholder="Username" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" v-model="password" class="form-control" placeholder="Password" autocomplete="current-password" />
                  </b-input-group>
                  <p class="text-danger" v-if="errors.length">
                  <b>Error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" variant="primary" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0" :to="{name: 'ForgotPassword'}">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
                <p>
                  <hr/>
                  <b-row>
                    <b-col>
                      <h2>Anonymous Feedback/Compliment.<br/>This feedback will only be reported to head office.</h2>
                    </b-col>
                  </b-row>
                </p>

                <p>
                  <b-row>
                    <b-col>
                      <b-form-textarea
                         id="feedbackarea"
                         v-model="feedbacktext"
                         placeholder="Anonymous  Feedback /compliment"
                         rows="3"
                         max-rows="6"
                       ></b-form-textarea>
                    </b-col>
                  </b-row>
                    </p>
<p>
                    <b-row>
                      <b-col>
                       <vue-recaptcha
                       ref="recaptcha"
                       sitekey="6LcbC8ofAAAAAFdlvhmMo_SflsscmL2wKR3JaXe_"
                       :load-recaptcha-script="true"
                       @verify="onCaptchaVerified"
                      @expired="onCaptchaExpired"
                        />
                      </b-col>
                    </b-row>
                  </p>
                    <p>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" :disabled="!submitFeedback" @click="submitFeedbackClick" variant="primary" class="px-4">Submit Feedback</b-button>
                    </b-col>
                  </b-row>
</p>
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
import { VueRecaptcha } from 'vue-recaptcha';
export default {
  name: 'Login',
  components: {VueRecaptcha},
  data: function() {
    return {
      email: null,
      password: null,
      errors: [],
      feedbacktext: null,
      submitFeedback: false
    };
  },
  methods: {
  onCaptchaExpired: function () {
      this.$refs.recaptcha.reset();
   },
    checkForm: function() {
      this.errors = [];

      if (!this.email) {
        this.errors.push('Email required.');
      } else if (!this.validEmail(this.email)) {
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
    submitFeedbackClick(){
     if(this.feedbacktext){
       this.submitFeedback = true
       let params = {feedback: this.feedbacktext};
       Vue.axios.post('/auth/feedback', params)
         .then(() => {
           this.showSuccessMsg({message: "Feedback Sent Successfully."})
           this.feedbacktext = null;
           this.submitFeedback = false

           this.$refs.recaptcha.reset();

         })
         .catch((error) => {
           if (error.response.status == 401 || error.response.status == 422) {
             this.showErrorMsg({
               message: error.response.data.message
             })
           } else {
             this.showErrorMsg()
           }
           this.$refs.recaptcha.reset();
         })
     }
   },
   onCaptchaVerified(){
     this.submitFeedback = true
    },
    onSubmit(evt) {
      evt.preventDefault();
      if (!this.checkForm()) {
        return false;
      }
      this.$auth.login({
        data: { email: this.email, password: this.password },
        redirect: {
          name: 'Home'
        },
        fetchUser: false,
        success: (res) => {
          this.$auth.user(res.data.user);
          // updated
          if(res.data.user.new_employee_status){
            localStorage.setItem("new_employee_status" ,res.data.user.new_employee_status)
          }
          // end update
        },
        error: (res) => {
          this.errors = ['Invalid email or password'];
        }
      });
    }
  }
}
</script>

<style>
.logo {
  height: 150px;
}
</style>
