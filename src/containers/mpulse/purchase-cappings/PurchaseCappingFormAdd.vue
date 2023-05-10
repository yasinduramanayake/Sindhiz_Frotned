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
                <v-select
                  :options="storeList"
                  v-model="$v.form.store.$model"
                  placeholder="Select Store"
                ></v-select>
                <b-form-invalid-feedback id="liveFeedbackStore">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                label="Supplier"
                label-for="supplier"
                :state="chkState('supplier')"
              >
                <v-select
                  :options="supplierList"
                  v-model="$v.form.supplier.$model"
                  placeholder="Select Supplier"
                  :onChange="changeSupplier"
                ></v-select>
                <b-form-invalid-feedback id="liveFeedbackSubCategory">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                label="Sub Category"
                label-for="subCategory"
                :state="chkState('subCategory')"
              >
                <v-select
                  :options="subCategoryList"
                  v-model="$v.form.subCategory.$model"
                  placeholder="Select Sub Category"
                  :disabled="!form.supplier"
                ></v-select>
                <b-form-invalid-feedback id="liveFeedbackSubCategory">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Capping" label-for="capping">
                <b-form-input
                  id="capping"
                  type="number"
                  :state="chkState('capping')"
                  v-model.lazy.trim="$v.form.capping.$model"
                  aria-describedby="liveFeedbackCapping"
                  placeholder="Capping"
                  autofocus
                />
                <b-form-invalid-feedback id="liveFeedbackCapping">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group>
                <div class="custom-control custom-control-inline">
                  <b-form-checkbox
                    id="isActive"
                    v-model.lazy.trim="$v.form.isActive.$model"
                    :unchecked-value="false"
                  >
                    Is Active
                  </b-form-checkbox>
                </div>
              </b-form-group>

              <b-form-group label="Bulk Upload">
                <b-form-file
                  placeholder="Choose a Excel or drop it here..."
                  drop-placeholder="Drop Excel here..."
                  no-drop
                  accept="*"
                  v-model="file"
                />
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                :disabled="$v.form.$invalid || submitted"
              >
                Submit
              </b-button>

              <b-button
                class="ml-1"
                type="submit"
                variant="primary"
                @click="bulkUpload()"
              >
                Submit Bulk Upload
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
import BulkApi from "@/store/modules/bulkupload";
import { mapState, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import vSelect from "vue-select";
import { setupCalendar, DatePicker } from "v-calendar";
import "v-calendar/lib/v-calendar.min.css";

const formShape = {
  store: null,
  supplier: null,
  subCategory: null,
  capping: "",
  isActive: true,
};

export default {
  name: "PurchaseCappingFormAdd",
  components: {
    vSelect,
    "v-date-picker": DatePicker,
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      submitted: false,
      file: null,
      subCategoryList: [],
    };
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    },
    storeList() {
      let list = [];
      Vue._.forEach(this.$store.state.stores.all, (store) => {
        list.push({
          label: store.storename,
          value: store.storeid,
        });
      });
      return list;
    },
    supplierList() {
      let list = [];
      Vue._.forEach(this.$store.state.suppliers.global, (suppliers) => {
        list.push({
          label: suppliers.suppliername,
          value: suppliers.supplierid,
        });
      });
      return list;
    },
  },
  validations: {
    form: {
      store: {
        required,
      },
      supplier: {
        required,
      },
      subCategory: {
        required,
      },
      capping: {
        required,
      },
      isActive: {
        required,
      },
    },
  },
  methods: {
    async bulkUpload() {
      let data = new FormData();
      data.append("file", this.file);

      await BulkApi.bulkSubmitcapping(data)
        .then(({ response }) => {
          this.showSuccessMsg();
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
    },

    changeSupplier(supplier) {
      this.form.subCategory = null;
      this.form.supplier = supplier;
      if (supplier) {
        Vue.axios
          .get("/getSubCategoriesBySupplier/" + supplier.value)
          .then((response) => {
            var list = [];
            Vue._.forEach(response.data, (subCategory) => {
              list.push({
                label: subCategory.subcat_name,
                value: subCategory.subcat,
              });
            });
            this.subCategoryList = list;
          });
      } else {
        this.subCategoryList = [];
      }
    },
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true;
          let params = {
            storeId: this.$v.form.store.$model.value,
            supplierId: this.$v.form.supplier.$model.value,
            subCat: this.$v.form.subCategory.$model.value,
            capping: this.$v.form.capping.$model,
            isActive: this.$v.form.isActive.$model,
          };

          this.$store
            .dispatch("purchaseCappings/addPurchaseCapping", params)
            .then(() => {
              this.$emit("success");
              this.showSuccessMsg();
            })
            .catch((error) => {
              if (error.response.status == 422 && error.response.data.message) {
                this.showErrorMsg({ message: error.response.data.message });
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
      component.$children.some((child) => {
        focused = this.findFirstError(child);
        return focused;
      });

      return focused;
    },
    validate() {
      this.$v.$touch();
      this.$nextTick(() => this.findFirstError());
      return this.isValid;
    },
  },
};
</script>
