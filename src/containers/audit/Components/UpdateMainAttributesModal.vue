<template>
    <div>
      <center>
        <h3>Update Main Attribute</h3>
      </center>
      <b-container>
        <b-card>
          <validation-observer
            ref="MainAttributeValidation"
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
                        v-model="form.audit_main_attribute"
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
                    @click="updateMainAttribute()"
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
  
  import MainAttributeApi from "@/store/modules/mainattribute";
  import mixins from "@/mixins/commonmixins";
  import {
    ValidationProvider,
    ValidationObserver,
  } from "vee-validate/dist/vee-validate.full";
  
  import vSelect from "vue-select";
  
  export default {
    name: "UpdateMainAttributesModal",
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
      };
    },
  
    async mounted() {
      await this.initialConfig();
    },
  
    methods: {
      initialConfig() {
        this.form.audit_main_attribute = this.attribute.audit_main_attribute;
      },
  
      async updateMainAttribute() {
        this.form.audit_main_attribute = mixins.methods.setunderscores(this.form.audit_main_attribute);
  
        if (await this.$refs.MainAttributeValidation.validate()) {
          await MainAttributeApi.UpdateMainAttribute(this.form, this.attribute.id)
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
  