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

              <b-form-group
                label="Training File"
              >
                <vue-base64-file-upload
                  :fileId="file.id"
                  accept="video/mp4,video/x-msvideo,application/pdf"
                  image-class="img-thumbnail"
                  input-class="form-control"
                  placeholder="Click here to upload file"
                  :max-size="maxSize"
                  @load="onLoad"
                />
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
import VueBase64FileUpload from "../custom-components/VueBase64Upload";
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

// require styles
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import TrainingTypeSelect from './TrainingTypeSelect';

const formShape = {
  name: "",
  trainingType: null,
  roles: null,
  content: ""
}

export default {
  name: "TrainingFormAdd",
  components: {
    VueBase64FileUpload,
    TrainingTypeSelect
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      file: null,
      maxSize: 10
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
    onLoad(dataUri, name, id) {
      this.file.name = name;
      this.file.dataUri = dataUri;
    },
    addFile() {
      let id = this.createUniqueId();
      this.file = { id: id, dataUri: null, name: null };
    },
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          let params = {
            name: this.$v.form.name.$model,
            trainingTypeId: this.$v.form.trainingType.$model.value,
            content: this.$v.form.content.$model,
            roleIds: _.map(this.$v.form.roles.$model, role => role.value),
            file: this.file,
          }

          this.$store.dispatch('trainings/addTraining', params)
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
    this.$store.dispatch('distributors/getDistributors');
    this.addFile();
  }
}
</script>
