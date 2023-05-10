<template>
  <div>
    <center>
      <h3>Add Main Attribute</h3>
    </center>
    <b-container class="padding_add_mainattributes">
      <b-card>
        <validation-observer
          ref="SubAttributeValidation"
          #default="{ invalid }"
        >
          <b-form @submit.prevent>
            <b-row>
              <b-col cols="12">
                <b-form-group label="Main Attribute">
                  <validation-provider
                    #default="{ errors }"
                    name="Main Attribute"
                    rules="required"
                  >
                    <b-form-input
                      v-model="form.MAIN_ATTRIBUTE"
                      placeholder="Main Attribute"
                    ></b-form-input>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-button
                  type="submit"
                  variant="primary"
                  @click="addMainAttribute()"
                  :disabled="invalid"
                  >Submit</b-button
                >
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import {
  BContainer,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BButton,
} from "bootstrap-vue";

import MainAttributeApi from "@/store/modules/mainattribute";
import mixins from "@/mixins/commonmixins";
import {
  ValidationProvider,
  ValidationObserver,
} from "vee-validate/dist/vee-validate.full";

export default {
  name: "AddMainAttributes",
  components: {
    BContainer,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      form: {},
    };
  },

  async mounted() {
    //
  },

  methods: {
    async addMainAttribute() {
      this.form.MAIN_ATTRIBUTE = mixins.methods.setunderscores(
        this.form.MAIN_ATTRIBUTE
      );

      if (await this.$refs.SubAttributeValidation.validate()) {
        await MainAttributeApi.addMainAttribute(this.form)
          .then(({ response }) => {
            this.showSuccessMsg();
            this.$emit("sidebar");
          })
          .catch(({ response }) => {
            if (response.status == 400) {
              this.showErrorMsg({
                message: response.data.error,
              });
            } else {
              this.showErrorMsg();
            }
          });
      }
    },
  },
};
</script>
<style>
.padding_add_mainattributes {
  padding-top: 20px;
}
</style>
