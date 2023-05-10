<template>
  <div class="animated fadeIn">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col lg="12">
            <!--<h6>Simple Form</h6>-->
            <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>

              <b-form-group label="Name" label-for="name">
                <b-form-input id="name"
                  type="text"
                  aria-describedby="liveFeedbackName"
                  v-model.lazy.trim="$v.form.name.$model"
                  placeholder="Role Name"
                  autofocus />
                <b-form-invalid-feedback id="liveFeedbackName">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Description" label-for="name">
                <b-form-input id="description"
                  type="text"
                  aria-describedby="liveFeedbackDescription"
                  v-model.lazy.trim="$v.form.description.$model"
                  placeholder="Description"
                  autofocus />
                <b-form-invalid-feedback id="liveFeedbackDescription">
                  This is a required field.
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
import { required } from "vuelidate/lib/validators"

const formShape = {
  name: "",
  description: null
}

export default {
  name: "RoleFormEdit",
  props: {
    role: Object
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
  },
  validations: {
    form: {
      name: {
        required
      },
      description: {
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
            id: this.role.id,
            name: this.$v.form.name.$model,
            description: this.$v.form.description.$model
          }

          this.$store.dispatch('roles/updateRole', params)
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
  beforeMount() {
    this.form.name = this.role.name
    this.form.description = this.role.description
  }
}
</script>
