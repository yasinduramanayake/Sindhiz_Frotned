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
              <b-form-group
                label="Store Name"
                label-for="store"
                :state="chkState('store')"
              >
                <store-select v-model="$v.form.store.$model"></store-select>
              </b-form-group>

              <b-form-group label="Date From" :state="chkState('dateFrom')">
                <v-date-picker
                  v-model="$v.form.dateFrom.$model"
                  :input-props="{ class: 'form-control' }"
                  show-caps
                >
                </v-date-picker>
              </b-form-group>

              <b-form-group
                label="Date To"
                label-for="dateTo"
                :state="chkState('dateTo')"
              >
                <v-date-picker
                  v-model="$v.form.dateTo.$model"
                  :input-props="{ class: 'form-control' }"
                  show-caps
                >
                </v-date-picker>
                <b-form-invalid-feedback id="liveFeedbackDueDate">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Add CSV">
                <vue-base64-file-upload
                  v-for="(file, index) in files"
                  :key="index"
                  :fileId="file.id"
                  accept="text/csv"
                  input-class="form-control"
                  placeholder="Click here to upload the CSV file"
                  @load="onLoad"
                />
                <b-button class="mt-1" size="sm" @click="addFile">
                  <i class="fa fa-plus"></i> Add File</b-button
                >
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                :disabled="$v.form.$invalid || uploadFiles.length == 0"
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
  store: null,
  dateFrom: new Date(),
  dateTo: new Date()
};

export default {
  name: "BankFeedDetailUpdate",
  components: {
    VueBase64FileUpload
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      files: [],
      uploadFiles: []
    };
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    },
    distributorList() {
      let list = [];
      Vue._.forEach(this.$store.state.distributors.active, distributor => {
        list.push({
          label: distributor.distributorname,
          value: distributor.distributorid
        });
      });
      return list;
    }
  },
  validations: {
    form: {
      store: {
        required
      },
      dateFrom: {
        required
      },
      dateTo: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          let params = {
            storeId: this.$v.form.store.$model.value,
            dateFrom: this.$moment(this.$v.form.dateFrom.$model).format(
              "YYYY-MM-DD"
            ),
            dateTo: this.$moment(this.$v.form.dateTo.$model).format(
              "YYYY-MM-DD"
            ),
            files: this.uploadFiles
          };

          Vue.axios
            .post("/checkAddingBankFeeds", params)
            .then(response => {
              let bankFeed = {
                store: this.$v.form.store.$model,
                dateFrom: this.$moment(this.$v.form.dateFrom.$model).format(
                  "YYYY-MM-DD"
                ),
                dateTo: this.$moment(this.$v.form.dateTo.$model).format(
                  "YYYY-MM-DD"
                ),
                lines: response.data.data
              };

              this.$emit("success", bankFeed);
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
    onLoad(dataUri, name, id) {
      let file = _.find(this.files, ["id", id]);
      file.name = name;
      file.dataUri = dataUri;
      this.uploadFiles = [];
      _.each(this.files, file => {
        if (file.dataUri) {
          this.uploadFiles.push(file);
        }
      });
    },
    addFile() {
      let id = this.createUniqueId();
      this.files.push({ id: id, dataUri: null, name: null });
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
    this.addFile();
  }
};
</script>
