<template>
  <div>
    <center>
      <h3>Update Sub Attribute</h3>
    </center>
    <b-container>
      <b-card>
        <validation-observer
          ref="SubAttributeValidation"
          #default="{ invalid }"
        >
          <b-form @submit.prevent>
            <b-row>
              <b-col cols="6">
                <b-form-group label="Main Attribute">
                  <v-select
                    v-model="selected"
                    label="audit_main_attribute"
                    :options="mainattributes"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Sub Attribute">
                  <validation-provider
                    #default="{ errors }"
                    name="Sub Attribute"
                    rules="required"
                  >
                    <b-form-input
                      v-model="form.audit_sub_attribute"
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
                  @click="updateSubAttribute()"
                  :disabled="invalid"
                  >Update</b-button
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
  name: "UpdateSubAttributesModal",
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
  props: {
    attribute: Object,
  },
  data() {
    return {
      form: {},
      selected: "",
      mainattributes: [],
    };
  },

  async mounted() {
    console.log(this.attribute.audit_main_attribute_id);
    await this.getAllMainAttribues();
    await this.initialConfig();
  },

  methods: {
    initialConfig() {
      this.selected = this.attribute.sub_attributes_main_attribute;
      this.form.audit_main_attribute_id =
        this.attribute.audit_main_attribute_id;
      this.form.audit_sub_attribute = this.attribute.audit_sub_attribute;
    },
    async getAllMainAttribues() {
      const res = await SubAttributeApi.getAllMainAttributes();
      this.mainattributes = res.data.data;
    },

    async updateSubAttribute() {
      this.form.audit_main_attribute_id = this.selected.id;
      this.form.audit_sub_attribute = mixins.methods.setunderscores(
        this.form.audit_sub_attribute
      );

      if (await this.$refs.SubAttributeValidation.validate()) {
        await SubAttributeApi.UpdateSubAttributes(this.form, this.attribute.id)
          .then(({ response }) => {
            this.showSuccessMsg();
            this.$emit("modal");
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
