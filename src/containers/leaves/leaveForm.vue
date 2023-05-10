<template>
  <div class="add_claim_card">
    <b-card class="claim_child_card">
      <center>
        <h2 class="form_header">Leave Request Form</h2>
      </center>
      <br />
      <div class="expense_report_dropdown"></div>
      <validation-observer ref="leaveValidation" #default="{ invalid }">
        <b-form @submit.prevent>
          <b-row>
            <!-- Type Of Leave-->

            <b-col cols="12">
              <b-form-group label="Type Of Leave" label-for="v-leave">
                <validation-provider
                  #default="{ errors }"
                  name="Leave Type"
                  rules="required"
                >
                  <v-select
                    v-model="leavetype"
                    label="title"
                    :options="option"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Start Date -->

            <b-col cols="12">
              <b-form-group label="Start Date" label-for="v-startdate">
                <validation-provider
                  #default="{ errors }"
                  name="Start Date"
                  rules="required"
                >
                  <v-date-picker
                    v-model="form.startdate"
                    :input-props="{ class: 'form-control' }"
                    show-caps
                  >
                  </v-date-picker>

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- End Date -->

            <b-col cols="12">
              <b-form-group label="End Date" label-for="v-enddate">
                <validation-provider
                  #default="{ errors }"
                  name="End Date"
                  rules="required"
                >
                  <v-date-picker
                    v-model="form.enddate"
                    :input-props="{ class: 'form-control' }"
                    show-caps
                  >
                  </v-date-picker>

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- no of hours -->

            <b-col cols="12">
              <b-form-group label="Total Number Of Hours" label-for="v-hours">
                <validation-provider
                  #default="{ errors }"
                  name="Total Number Of Hours"
                  rules="required|integer"
                >
                  <b-form-input
                    id="v-hours"
                    v-model="form.noofhours"
                    type="number"
                    placeholder="Total Number Of Hours"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Certificate-->
            <b-col cols="12">
              <b-form-group label="Certificate" label-for="certificate">
                <!-- <b-form-file
                    placeholder="Choose a certificate or drop it here..."
                    drop-placeholder="Drop certificate here..."
                    no-drop
                    accept="*"
                    v-model="certificate"
                  /> -->
                <vue-base64-file-upload
                  :fileId="file.id"
                  accept="*"
                  image-class="img-thumbnail"
                  input-class="form-control"
                  placeholder="Choose a certificate or drop it here..."
                  :max-size="maxSize"
                  @load="onLoad"
                />
              </b-form-group>
            </b-col>

            <!--Reason-->
            <b-col cols="12">
              <b-form-group label="Reason For Leave" label-for="v-reason">
                <validation-provider
                  #default="{ errors }"
                  name="Reason For Leave"
                  rules="required"
                >
                  <b-form-textarea
                    id="v-reason"
                    v-model="form.reason"
                    placeholder="Reason For Leave"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- submit and reset -->
            <b-col cols="12">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                class="mr-1"
                :disabled="invalid"
                @click="addLeave()"
              >
                Submit
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-card>
  </div>
</template>

<script>
import vSelect from "vue-select";
import {
  BRow,
  BFormDatepicker,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BFormTextarea,
  BButton,
  BCard,
} from "bootstrap-vue";
import VueBase64FileUpload from "@/containers/mpulse/custom-components/VueBase64Upload";
import Ripple from "vue-ripple-directive";
import LeaveApi from "@/store/modules/leaves";
import {
  ValidationProvider,
  ValidationObserver,
} from "vee-validate/dist/vee-validate.full";
export default {
  data() {
    return {
      file: null,
      maxSize: 10,
      form: {},
      certificate: "",
      leavetype: "Select Leave Type",
      option: [
        { title: "Personal" },
        { title: "Sick" },
        { title: "Carer" },
        { title: "Annual" },
      ],
    };
  },

  components: {
    VueBase64FileUpload,
    BRow,
    BCol,
    BFormGroup,
    vSelect,
    BFormDatepicker,
    ValidationProvider,
    ValidationObserver,
    BFormTextarea,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BCard,
  },
  directives: {
    Ripple,
  },
  created() {
    this.addFile();
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
    async addLeave() {
      let params = {
        leavetype: this.leavetype.title,
        startdate: this.form.startdate,
        noofhours: this.form.noofhours,
        enddate: this.form.enddate,
        reason: this.form.reason,
        file: this.file,
      };
      if (await this.$refs.leaveValidation.validate()) {
        await LeaveApi.AddLeaveForm(params)
          .then(({ response }) => {
            this.showSuccessMsg();
            setTimeout(() => {
              this.form = {};
              this.certificate = "";
              this.leavetype.title = "Personal";
            }, 2000);
          })
          .catch(({ response }) => {
            if (response.status == 400) {
              this.showErrorMsg({
                message: response.data.error,
              });
              setTimeout(() => {
                this.form = {};
                this.certificate = "";
                this.leavetype.title = "Personal";
              }, 10000);
            } else {
              this.showErrorMsg();
              setTimeout(() => {
                this.form = {};
                this.certificate = "";
                this.leavetype.title = "Personal";
              }, 10000);
            }
          });
      }
    },
  },
};
</script>
