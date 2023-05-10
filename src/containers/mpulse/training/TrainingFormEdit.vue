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
                  placeholder="Training Name"
                  autofocus />
                <b-form-invalid-feedback id="liveFeedbackName">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Training Type">
                <training-type-select v-model="$v.form.trainingType.$model" />
              </b-form-group>

              <b-form-group label="Roles" label-for="store" :state="chkState('roles')" >
                <v-select multiple :options="roleList" v-model="$v.form.roles.$model" placeholder="Select Roles"></v-select>
                <b-form-invalid-feedback id="liveFeedbackRoles">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Content" label-for="content">
                <quill-editor v-model="$v.form.content.$model"></quill-editor>
                <b-form-invalid-feedback id="liveFeedbackContent">
                  This is a required field
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
import { required } from "vuelidate/lib/validators"
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import TrainingTypeSelect from './TrainingTypeSelect';

const formShape = {
  name: "",
  trainingType: null,
  roles: null,
  content: ""
}

export default {
  name: "TrainingFormEdit",
  components: {
    TrainingTypeSelect
  },
  props: {
    training: Object
  },
  data() {
    return {
      form: Object.assign({}, formShape)
    }
  },
  computed: {
    isValid() { return !this.$v.form.$anyError },
    isDirty() { return this.$v.form.$anyDirty },
    roleList() {
      let list = []
      Vue._.forEach(this.$store.state.roles.all, (role) => {
        list.push({label: role.name, value: role.id})
      })
      return list
    }
  },
  validations: {
    form: {
      name: {
        required
      },
      trainingType: {
        required
      },
      content: {
        required
      },
      roles: {}
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          let params = {
            id: this.training.id,
            name: this.$v.form.name.$model,
            trainingTypeId: this.$v.form.trainingType.$model.value,
            content: this.$v.form.content.$model,
            roleIds: _.map(this.$v.form.roles.$model, role => role.value)
          }

          this.$store.dispatch('trainings/updateTraining', params)
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
  created () {
    this.$store.dispatch('distributors/getDistributors')
  },
  beforeMount() {
    this.form.name = this.training.name;
    this.form.trainingType = this.training.training_type ? {label: this.training.training_type.trainingtypename, value: this.training.training_type.trainingtypeid} : null;
    this.form.content = this.training.content;
    this.form.roles = _.map(this.training.roles, role => {return {label: role.name, value: role.id}});
  }
}
</script>
