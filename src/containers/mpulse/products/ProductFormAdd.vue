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
              <b-form-group label="Barcode" label-for="barcode">
                <b-form-input
                  id="barcode"
                  type="text"
                  :state="chkState('barcode')"
                  v-model.lazy.trim="$v.form.barcode.$model"
                  aria-describedby="liveFeedbackBarcode"
                  placeholder="Barcode"
                  autofocus
                />
                <vue-base64-file-upload
                  accept="image/jpeg"
                  image-class="img-thumbnail"
                  input-class="form-control"
                  placeholder="Click here to upload the barcode image"
                  @load="onLoad"
                />
                <b-form-invalid-feedback id="liveFeedbackBarcode">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Product Name" label-for="productName">
                <b-form-input
                  id="productName"
                  type="text"
                  :state="chkState('productName')"
                  v-model.lazy.trim="$v.form.productName.$model"
                  aria-describedby="liveFeedbackProductName"
                  placeholder="Product Name"
                  autofocus
                />
                <b-form-invalid-feedback id="liveFeedbackProductName">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                label="Supplier"
                label-for="store"
                :state="chkState('supplier')"
              >
                <v-select
                  :options="supplierList"
                  v-model="$v.form.supplier.$model"
                  placeholder="Select Supplier"
                ></v-select>
                <b-form-invalid-feedback id="liveFeedbackSupplier">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                label="Category"
                label-for="category"
                :state="chkState('category')"
              >
                <v-select
                  :options="categoryList"
                  v-model="$v.form.category.$model"
                  placeholder="Select Category"
                ></v-select>
                <b-form-invalid-feedback id="liveFeedbackCategory">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                label="Sub Category Name"
                label-for="prdSubcat"
                :state="chkState('prdSubcat')"
                v-if="isGlobal == false"
              >
                <v-select
                  :options="subCategoryList"
                  v-model="$v.form.prdSubcat.$model"
                  placeholder="Select Sub Category"
                  @change="subCatChange"
                ></v-select>
              </b-form-group>

              <b-form-group
                label="Sub Category Name"
                label-for="subcat"
                v-if="isGlobal == true"
              >
                <b-form-input
                  id="subcat"
                  type="text"
                  :state="chkState('subcat')"
                  v-model.lazy.trim="$v.form.subcat.$model"
                  aria-describedby="liveFeedbackSubCat"
                  placeholder="Sub Category Name"
                />
                <b-form-invalid-feedback id="liveFeedbackSubCat">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                label="Tax"
                label-for="tax"
                :state="chkState('tax')"
              >
                <v-select
                  :options="taxList"
                  v-model="$v.form.tax.$model"
                  placeholder="Select Tax"
                ></v-select>
                <b-form-invalid-feedback id="liveFeedbackTax">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="Cost" label-for="cost">
                <b-form-input
                  id="cost"
                  type="number"
                  :state="chkState('cost')"
                  v-model.lazy.trim="$v.form.cost.$model"
                  aria-describedby="liveFeedbackCost"
                  placeholder="Cost"
                  autofocus
                />
                <b-form-invalid-feedback id="liveFeedbackCost">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Sale Price" label-for="salePrice">
                <b-form-input
                  id="salePrice"
                  type="number"
                  :state="chkState('salePrice')"
                  v-model.lazy.trim="$v.form.salePrice.$model"
                  aria-describedby="liveFeedbackSalePrice"
                  placeholder="Sale Price"
                  autofocus
                />
                <b-form-invalid-feedback id="liveFeedbackSalePrice">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group>
                <div
                  class="form-control-inline custom-checkbox custom-control-inline"
                >
                  <b-form-checkbox
                    id="isVisible"
                    :state="chkState('isVisible')"
                    v-model.lazy.trim="$v.form.isVisible.$model"
                    unchecked-value="false"
                  >
                    Is Visible
                  </b-form-checkbox>
                </div>
                <div
                  class="form-control-inline custom-checkbox custom-control-inline"
                >
                  <b-form-checkbox
                    id="isVariable"
                    :state="chkState('isVariable')"
                    v-model.lazy.trim="$v.form.isVariable.$model"
                    unchecked-value="false"
                  >
                    Is Variable
                  </b-form-checkbox>
                </div>
                <div
                  class="form-control-inline custom-checkbox custom-control-inline"
                >
                  <b-form-checkbox
                    id="isActive"
                    :state="chkState('isActive')"
                    v-model.lazy.trim="$v.form.isActive.$model"
                    unchecked-value="false"
                  >
                    Is Active
                  </b-form-checkbox>
                </div>
                <div
                  class="form-control-inline custom-checkbox custom-control-inline"
                >
                  <b-form-checkbox
                    id="isInventory"
                    :state="chkState('isInventory')"
                    v-model.lazy.trim="$v.form.isInventory.$model"
                    unchecked-value="false"
                  >
                    Is Inventory
                  </b-form-checkbox>
                </div>
                <div
                  class="form-control-inline custom-checkbox custom-control-inline"
                >
                  <b-form-checkbox
                    v-if="isGlobal == false"
                    id="isTsg"
                    :state="chkState('isTsg')"
                    v-model.lazy.trim="$v.form.isTsg.$model"
                    unchecked-value="false"
                  >
                    Is TSG
                  </b-form-checkbox>
                </div>
                <div
                  class="form-control-inline custom-checkbox custom-control-inline"
                >
                  <b-form-checkbox
                    id="isCignal"
                    :state="chkState('isCignal')"
                    v-model.lazy.trim="$v.form.isCignal.$model"
                    unchecked-value="false"
                  >
                    Is Cignal
                  </b-form-checkbox>
                </div>
                <div
                  class="form-control-inline custom-checkbox custom-control-inline"
                >
                  <b-form-checkbox
                    v-if="isGlobal == true"
                    id="isSlowSale"
                    :state="chkState('isSlowSale')"
                    v-model.lazy.trim="$v.form.isSlowSale.$model"
                    unchecked-value="false"
                  >
                    Slow Sale
                  </b-form-checkbox>
                </div>
              </b-form-group>
              <b-form-group>
                <b-btn
                  variant="outline-info"
                  class="mb-2"
                  @click="showCollapse = !showCollapse"
                  ><i
                    :class="
                      showCollapse ? 'fa fa-minus fa-lg' : 'fa fa-plus fa-lg'
                    "
                  ></i>
                  Show Advanced Fields</b-btn
                >
              </b-form-group>
              <b-collapse id="collapseOwner" v-model="showCollapse">
                <b-form-group label="Sub Product Qty" label-for="subProductQty">
                  <b-form-input
                    id="subProductQty"
                    type="number"
                    v-model.lazy.trim="$v.form.subProductQty.$model"
                    placeholder="Sub Product Qty"
                  />
                </b-form-group>

                <b-form-group label="Sticks" label-for="sticks">
                  <b-form-input
                    id="sticks"
                    type="number"
                    v-model.lazy.trim="$v.form.sticks.$model"
                    placeholder="Sticks"
                  />
                </b-form-group>

                <b-form-group label="SKUID" label-for="skuid">
                  <b-form-input
                    id="skuid"
                    type="text"
                    v-model.lazy.trim="$v.form.skuid.$model"
                    placeholder="SKUID"
                  />
                </b-form-group>
                <b-form-group label="SKU NAME" label-for="skuname">
                  <b-form-input
                    id="skuname"
                    type="text"
                    v-model.lazy.trim="$v.form.skuname.$model"
                    placeholder="SKUNAME"
                  />
                </b-form-group>
              </b-collapse>

              <b-form-group label="Bulk Upload">
                <b-form-file
                  placeholder="Choose a Excel or drop it here..."
                  drop-placeholder="Drop Excel here..."
                  no-drop
                  accept="*"
                  v-model="file"
                />
              </b-form-group>

              <br /><br />
              <b-form-group>
                <b-button
                  type="submit"
                  variant="primary"
                  :disabled="$v.form.$invalid || submitted"
                >
                  Submit Form
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
              </b-form-group>
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
import { required, requiredIf } from "vuelidate/lib/validators";
import BulkApi from "@/store/modules/bulkupload";
import VueBase64FileUpload from "vue-base64-file-upload";

const formShape = {
  productName: "",
  supplier: null,
  category: null,
  tax: null,
  barcode: "",
  cost: "",
  salePrice: "",
  isVisible: false,
  isVariable: false,
  isActive: true,
  isInventory: false,
  isTsg: true,
  isCignal: true,
  isSlowSale: false,
  subProductQty: null,
  sticks: null,
  skuid: null,
  skuname: null,
  subcat: null,
  prdSubcat: null
};

export default {
  name: "FormAddProduct",
  props: {
    isGlobal: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    VueBase64FileUpload,
  },
  data() {
    return {
      maxSize: 10,
      form: Object.assign({}, formShape),
      submitted: false,
      file: null,
      barcodeImage: null,
      showCollapse: false,
      prdSubcat: null
    };
  },
  computed: {
    subCategoryList() {
      let list = [];
      Vue._.forEach(
        this.$store.state.subCategories.manageproductsubcat,
        (subCategory) => {
          list.push({
            label: subCategory.subcat_name,
            value: subCategory.subcat,
          });
        }
      );
      return list;
    },
    subCatRequired() {
      return this.isGlobal == true;
    },
    isValid() {
      return !this.$v.form.$anyError;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    },
    supplierList() {
      let list = [];
      if (this.isGlobal == true) {
        Vue._.forEach(this.$store.state.suppliers.stocktake, (supplier) => {
          list.push({
            label: supplier.suppliername,
            value: supplier.supplierid,
          });
        });
      } else {
        Vue._.forEach(this.$store.state.suppliers.active, (supplier) => {
          list.push({
            label: supplier.suppliername,
            value: supplier.supplierid,
          });
        });
      }

      return list;
    },
    categoryList() {
      let list = [];

      if (this.isGlobal == true) {
        Vue._.forEach(
          this.$store.state.categories.globalProductCat,
          (category) => {
            list.push({
              label: category.categoryname,
              value: category.categoryid,
            });
          }
        );
      } else {
        Vue._.forEach(this.$store.state.categories.active, (category) => {
          list.push({
            label: category.categoryname,
            value: category.categoryid,
          });
        });
      }

      return list;
    },
    taxList() {
      let list = [];
      Vue._.forEach(this.$store.state.taxes.all, (tax) => {
        list.push({
          label: tax.taxname,
          value: tax.taxid,
        });
      });
      return list;
    },
  },
  validations: {
    form: {
      barcode: {
        required,
      },
      productName: {
        required,
      },
      supplier: {
        required,
      },
      category: {
        required,
      },
      tax: {
        required,
      },
      cost: {
        required,
      },
      salePrice: {
        required,
      },
      prdSubcat:{
      },
      subcat: {
        required: requiredIf(function (nestedModel) {
          return this.isGlobal;
        }),
      },
      isVisible: {},
      isVariable: {},
      isActive: {},
      isInventory: {},
      isTsg: {},
      isSlowSale: {},
      isCignal: {},
      subProductQty: {},
      sticks: {},
      skuid: {},
      skuname: {},
    },
  },
  methods: {
    // onLoadBulk(dataUri, name, id) {
    //   this.file.name = name;
    //   this.file.dataUri = dataUri;
    // },
    // addFile() {
    //   let id = this.createUniqueId();
    //   this.file = { id: id, dataUri: null, name: null };
    // },
    detectBarCode(code) {
      this.form.barcode = code;
    },
    subCatChange(event){
      console.log(event);
      if (event != null){
        this.form.subcat = event.value;
      }
      else {
        this.form.subcat = null;
      }

    },
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true;
          Vue.axios
            .post("/addProduct", {
              productName: this.$v.form.productName.$model,
              supplierId: this.$v.form.supplier.$model.value,
              barCode: this.$v.form.barcode.$model,
              categoryId: this.$v.form.category.$model.value,
              taxId: this.$v.form.tax.$model.value,
              cost: this.$v.form.cost.$model,
              salePrice: this.$v.form.salePrice.$model,
              isVisible: this.$v.form.isVisible.$model == true ? true : false,
              isVariable: this.$v.form.isVariable.$model == true ? true : false,
              isActive: this.$v.form.isActive.$model == true ? true : false,
              isInventory:
                this.$v.form.isInventory.$model == true ? true : false,
              isTsg: this.$v.form.isTsg.$model == true ? true : false,
              isCignal: this.$v.form.isCignal.$model == true ? true : false,
              isSlowSale: this.$v.form.isSlowSale.$model == true ? true : false,
              subProductQty: this.$v.form.subProductQty.$model,
              sticks: this.$v.form.sticks.$model,
              skuid: this.$v.form.skuid.$model,
              skuname: this.$v.form.skuname.$model,
              subcat: this.$v.form.subcat.$model,
            })
            .then(() => {
              this.$emit("success");
              this.showSuccessMsg();
            })
            .catch((error) => {
              this.showErrorMsg({ mesage: error });
              this.submitted = false;
            });
        });
      }
    },

    async bulkUpload() {
      let data = new FormData();
      data.append("file", this.file);

      await BulkApi.bulkSubmit(data)
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

    onLoad(dataUri) {
      Vue.axios
        .post("/barcode-decoder", {
          image: dataUri,
        })
        .then((response) => {
          let result = response.data;
          if (result.code == 200) {
            this.form.barcode = result.text;
            this.showSuccessMsg({
              message: "Detected the barcode from the image",
            });
          } else {
            this.showInfoMsg({
              message: "Can't detect the barcode from the image",
            });
          }
        })
        .catch(() => {
          this.showErrorMsg({
            message: "Error while trying to detect the barcode",
          });
        });
    },
  },
  created() {
    if (this.isGlobal == true) {
      this.form.isTsg = false;
      this.$store.dispatch("categories/getGlobalProductAddCategories");
      this.$store.dispatch("suppliers/getStockTakeSuppliers");
    } else {
      this.$store.dispatch("categories/getActiveCategories");
    }
    if (this.$store.state.subCategories.manageproductsubcat.length == 0) {
      this.$store.dispatch("subCategories/getManageProductSubcats");
    }
    this.addFile();
  },
};
</script>

<style scoped>
.btn.disabled {
  cursor: auto;
}
</style>
