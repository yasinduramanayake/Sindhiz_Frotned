<template>
  <div class="add_claim_card">
    <b-card class="claim_child_card">
      <center>
        <h2 class="form_header">Add Claim Form</h2>
      </center>
      <br />
      <div class="expense_report_dropdown"></div>
      <validation-observer ref="claimValidation" #default="{ invalid }">
        <b-form @submit.prevent>
          <b-row>
            <!-- Am region-->
            <b-col cols="12" md="12">
              <b-form-group label="AM Region" label-for="v-am-region">
                <validation-provider
                  #default="{ errors }"
                  name="Am Region"
                  rules="required"
                >
                  <b-form-input
                    id="v-am-region"
                    v-model="form.amregion"
                    placeholder="Am Region"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Expense Type -->

            <b-col cols="12" md="12">
              <b-form-group label="Type Of Expense" label-for="v-am-region">
                <validation-provider
                  #default="{ errors }"
                  name="Am Region"
                  rules="required"
                >
                  <v-select
                    v-model="expense_type"
                    label="title"
                    :options="option"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Date Of Expense -->

            <b-col cols="12" md="12">
              <b-form-group label="Date Of Expense" label-for="Date Of Expense">
                <validation-provider
                  #default="{ errors }"
                  name="Date Of Expense"
                  rules="required"
                >
                  <v-date-picker
                    v-model="form.dateofexpense"
                    :input-props="{ class: 'form-control' }"
                    show-caps
                  >
                  </v-date-picker>
                  <!-- <b-form-datepicker
                    id="example-datepicker"
                    v-model="form.dateofexpense"
                    class="mb-1"
                  /> -->
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!--Comment-->
            <b-col cols="12" md="12">
              <b-form-group label="Comment" label-for="v-comment">
                <validation-provider
                  #default="{ errors }"
                  name="Comment"
                  rules="required"
                >
                  <b-form-textarea
                    id="v-comment"
                    v-model="form.comment"
                    placeholder="Comment"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!--Amount  -->

            <b-col cols="12" md="12">
              <b-form-group label="Amount" label-for="Amount">
                <validation-provider
                  #default="{ errors }"
                  name="Amount"
                  rules="required"
                >
                  <b-form-input
                    id="Amount"
                    type="number"
                    step="0.01"
                    v-model="form.amount"
                    placeholder="Amount"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- reciept -->
            <b-col cols="12" md="12">
              <b-form-group label="reciept" label-for="reciept">
                <!-- <b-form-file
                    placeholder="Choose a reciept or drop it here..."
                    drop-placeholder="Drop reciept here..."
                    no-drop
                    accept="*"
                    v-model="reciept"
                  /> -->

                <vue-base64-file-upload
                  :fileId="file.id"
                  accept="*"
                  image-class="img-thumbnail"
                  input-class="form-control"
                  placeholder="Choose a reciept or drop it here..."
                  :max-size="maxSize"
                  @load="onLoad"
                />
              </b-form-group>
            </b-col>

            <!-- submit and reset -->
            <b-col cols="12" md="12">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                class="mr-1"
                :disabled="invalid"
                @click="addClaim()"
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
import Ripple from "vue-ripple-directive";
import VueBase64FileUpload from "@/containers/mpulse/custom-components/VueBase64Upload";
import ClaimApi from "@/store/modules/expenses";
import {
  ValidationProvider,
  ValidationObserver,
} from "vee-validate/dist/vee-validate.full";
export default {
  data() {
    return {
      form: {},
      expense_type: "Select Expense Type",
      file: null,
      maxSize: 10,
      option: [
        { title: "Accomodation" },
        { title: "Meal" },
        { title: "Duel" },
        { title: "Other" },
      ],
    };
  },

  components: {
    BRow,
    VueBase64FileUpload,
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
    async addClaim() {
      let params = {
        expense_type: this.expense_type.title,
        dateofexpense: this.form.dateofexpense,
        amregion: this.form.amregion,
        comment: this.form.comment,
        amount: this.form.amount,
        file: this.file,
      };

      if (await this.$refs.claimValidation.validate()) {
        await ClaimApi.AddClaimForm(params)
          .then(({ response }) => {
            this.showSuccessMsg();
            setTimeout(() => {
              this.form = {};
              this.reciept = "";
              this.expense_type.title = "Accomodation";
            }, 1000);
          })
          .catch(({ response }) => {
            if (response.status == 400) {
              this.showErrorMsg({
                message: response.data.error,
              });
              this.form = {};
              this.reciept = "";
              this.expense_type.title = "Accomodation";
            } else {
              this.showErrorMsg();
              setTimeout(() => {
                this.form = {};
                this.reciept = "";
                this.expense_type.title = "Accomodation";
              }, 10000);
            }
          });
      }
    },
  },
};
</script>
<style scoped>
.datepic {
  height: 10%;
}
</style>
