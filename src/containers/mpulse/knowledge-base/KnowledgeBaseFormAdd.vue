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
              <b-form-group label="Name">
                <b-form-input
                  type="text"
                  v-model.lazy.trim="$v.form.name.$model"
                  placeholder="Name of the File"
                  autofocus
                />
              </b-form-group>

              <b-form-group label="Assigned Groups">
                <v-select
                  :options="roleList"
                  v-model="$v.form.roles.$model"
                  placeholder="Select Roles"
                  multiple
                ></v-select>
              </b-form-group>

              <b-form-group
                label="Knowldege Base File"
                label-for="invoiceImage"
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

              <b-button
                type="submit"
                variant="primary"
                :disabled="$v.form.$invalid || !file.dataUri"
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

import { required } from "vuelidate/lib/validators";
import VueBase64FileUpload from "../custom-components/VueBase64Upload";

const formShape = {
  name: "",
  roles: []
};

export default {
  name: "KnowledgeBaseFormAdd",
  components: {
    VueBase64FileUpload
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      submitted: false,
      file: null,
      maxSize: 10
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
      Vue._.forEach(this.$store.state.roles.active, role => {
        list.push({ label: role.name, value: role.id });
      });
      return list;
    }
  },
  validations: {
    form: {
      name: {
        required
      },
      roles: {
        required
      }
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
          this.submitted = true;
          let params = {
            name: this.$v.form.name.$model,
            roleIds: _.map(this.$v.form.roles.$model, (role) => {
              return role.value
            }),
            file: this.file
          };

          this.$store
            .dispatch("knowledgeBases/addKnowledgeBase", params)
            .then(() => {
              this.$emit("success");
              this.showSuccessMsg();
            })
            .catch(error => {
              if (error.response.status == 400) {
                this.showErrorMsg({
                  message: error.response.data.message
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
      component.$children.some(child => {
        focused = this.findFirstError(child);
        return focused;
      });

      return focused;
    },
    validate() {
      this.$v.$touch();
      this.$nextTick(() => this.findFirstError());
      return this.isValid;
    }
  },
  created() {
    if (this.$store.state.roles.all.length == 0) {
      this.$store.dispatch("roles/getActiveRoles");
    }
    this.addFile();
  }
};
</script>
