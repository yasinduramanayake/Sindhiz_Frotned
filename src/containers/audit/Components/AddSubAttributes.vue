<template>
  <div>
    <center>
      <h3>Add Sub Attribute</h3>
    </center>

    <b-container class="padding_add_subattributes">
      <b-card>
        <validation-observer
          ref="SubAttributeValidation"
          #default="{ invalid }"
        >
          <b-form @submit.prevent>
            <b-row>
              <b-col cols="12">
                <b-form-group label="Main Attribute">
                  <v-select
                    v-model="selected"
                    label="audit_main_attribute"
                    :options="mainattributes"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Sub Attribute">
                  <validation-provider
                    #default="{ errors }"
                    name="Sub Attribute"
                    rules="required"
                  >
                    <b-form-input
                      v-model="form.SUB_ATTRIBUTE"
                      placeholder="Sub Attribute"
                    ></b-form-input>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-button
                  type="submit"
                  variant="primary"
                  @click="addSubAttribute()"
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

import SubAttributeApi from "@/store/modules/subattribute";
import mixins from "@/mixins/commonmixins";
import {
  ValidationProvider,
  ValidationObserver,
} from "vee-validate/dist/vee-validate.full";

import vSelect from "vue-select";

export default {
  name: "AddSubAttributes",
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
      selected: "Select a Main Attribute",
      mainattributes: [],
    };
  },

  async mounted() {
    await this.getAllMainAttribues();
  },

  methods: {
    async getAllMainAttribues() {
      const res = await SubAttributeApi.getAllMainAttributes();
      this.mainattributes = res.data.data;
    },

    async addSubAttribute() {
      this.form.MAIN_ATTRIBUTE_ID = this.selected.id;
      this.form.SUB_ATTRIBUTE = mixins.methods.setunderscores(
        this.form.SUB_ATTRIBUTE
      );

      if (await this.$refs.SubAttributeValidation.validate()) {
        await SubAttributeApi.addSubAttribute(this.form)
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
.padding_add_subattributes {
  padding-top: 20px;
}
</style>
