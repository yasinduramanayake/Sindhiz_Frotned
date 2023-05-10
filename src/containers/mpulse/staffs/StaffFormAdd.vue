<template>
  <div class="animated fadeIn">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col lg="12">
            <!--<h6>Simple Form</h6>-->
            <b-form
              v-on:submit.prevent="onSubmit"
              v-on:reset.prevent="onReset"
              novalidate
            >
              <b-form-group label="First Name" label-for="firstName">
                <b-form-input
                  id="firstName"
                  type="text"
                  :state="chkState('firstName')"
                  v-model.lazy.trim="$v.form.firstName.$model"
                  aria-describedby="liveFeedbackFirstName"
                  placeholder="First Name"
                  autofocus
                />
                <b-form-invalid-feedback id="liveFeedbackFirstName">
                  This is a required field and must be minimum 2 characters,
                  maximum 50 characters
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Last Name" label-for="lastName">
                <b-form-input
                  id="lastName"
                  type="text"
                  :state="chkState('lastName')"
                  v-model.lazy.trim="$v.form.lastName.$model"
                  aria-describedby="liveFeedbackLastName"
                  placeholder="Last Name"
                />
                <b-form-invalid-feedback id="liveFeedbackLastName">
                  This is a required field and must be minimum 2 characters,
                  maximum 50 characters
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Email" label-for="email">
                <b-form-input
                  id="email"
                  type="email"
                  :state="chkState('email')"
                  v-model.lazy.trim="$v.form.email.$model"
                  aria-describedby="liveFeedbackEmail"
                  placeholder="Email"
                />
                <b-form-invalid-feedback id="liveFeedbackEmail">
                  This is a required field and must be a valid email address
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                id="passInputGroup5"
                label="Password"
                label-for="password"
              >
                <b-form-input
                  id="password"
                  type="password"
                  v-model.trim="$v.form.password.$model"
                  :state="chkState('password')"
                  aria-describedby="input1LiveFeedback5"
                  placeholder="Password"
                />
                <b-form-invalid-feedback id="input1LiveFeedback5">
                  Required password should be from 8 - 16 characters
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="confPassInputGroup6"
                label="Confirm password"
                label-for="confirmp_assword"
              >
                <b-form-input
                  id="confirm_password"
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

              <b-form-group
                label="Role"
                label-for="role"
                :state="chkState('role')"
              >
                <v-select
                  :options="roleList"
                  v-model="$v.form.role.$model"
                  placeholder="Select Role"
                ></v-select>
                <b-form-invalid-feedback id="liveFeedbackRole">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>

              <!-- updated employee status radio -->
              <b-form-group
                label="New Employee"
                label-for="v-New_Employee"
                label-cols-md="4"
              >
                <div class="extra_small_padding"></div>
                <div class="inline_radio">
                  <div class="redio">
                    <b-form-radio
                      plain
                      name="some10"
                      value="1"
                      v-model.trim="$v.form.new_employee.$model"
                    >
                      Yes
                    </b-form-radio>
                  </div>
                  &nbsp; &nbsp;
                  <div class="redio">
                    <b-form-radio
                      plain
                      name="some167"
                      value="0"
                      v-model.trim="$v.form.new_employee.$model"
                    >
                      No
                    </b-form-radio>
                  </div>
                </div>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                :disabled="$v.form.$invalid"
              >
                Submit
              </b-button>
              <b-button class="ml-1" type="reset" @click="onCancel"
                >Cancel</b-button
              >
            </b-form>
            <br />
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  helpers,
} from "vuelidate/lib/validators";
import vSelect from "vue-select";

const formShape = {
  firstName: "",
  lastName: "",
  email: "",
  role: null,
  // updated new employee
  new_employee: "",
  password: "",
  confirmPassword: "",
};

export default {
  name: "StaffFormAdd",
  components: {
    vSelect,
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      submitted: false,
      showCollapse: false,
    };
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    },
    roleList() {
      let list = [];
      Vue._.forEach(this.$store.state.roles.all, (role) => {
        list.push({ label: role.name, value: role.id });
      });
      return list;
    },
  },
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(50),
      },
      lastName: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(50),
      },
      email: {
        required,
        email,
      },
        // updated new employee
      new_employee: {
        required,
      },
      role: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(16),
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true;

          Vue.axios
            .post("/addStaff", {
              firstname: this.$v.form.firstName.$model,
              lastname: this.$v.form.lastName.$model,
              email: this.$v.form.email.$model,
                // updated new employee
              new_employee: this.$v.form.new_employee.$model,
              roleId: this.$v.form.role.$model.value,
              password: this.form.confirmPassword,
            })
            .then((response) => {
              this.$emit("success");
              this.showSuccessMsg({
                message: "Please inform user to check activation email",
              });
            })
            .catch((error) => {
              if (error.response.status == 422) {
                this.showErrorMsg({
                  message:
                    error.response.data[Object.keys(error.response.data)[0]],
                });
              } else {
                this.showErrorMsg();
              }
            });
        });
      }
    },
    onCancel() {
      this.$emit("cancel");
    },
    onReset() {
      // Reset validation
      this.form = formShape;
      this.submitted = false;
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    chkState(val) {
      const field = this.$v.form[val];
      return field.$dirty ? !field.$invalid : null;
    },
    findFirstError(component = this) {
      if (component.state === false) {
        if (component.$refs.input) {
          component.$refs.input.focus();
          return true;
        }
        if (component.$refs.check) {
          component.$refs.check.focus();
          return true;
        }
      }
      let focused = false;
      component.$children.some((child) => {
        focused = this.findFirstError(child);
        return focused;
      });

      return focused;
    },
    validate() {
      this.$v.$touch();
      this.$nextTick(() => this.findFirstError());
      return this.isValid;
    },
  },
  created() {
    this.$store.dispatch("roles/getRoles");
  },
};
</script>
