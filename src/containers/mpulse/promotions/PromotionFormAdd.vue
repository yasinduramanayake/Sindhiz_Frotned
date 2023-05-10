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
              label="Pormotion Type"
              label-for="promotType"
              :state="chkState('promotiontype')"
            >
              <v-select
                :options="promoTypesList"
                v-model="$v.form.promotiontype.$model"
                placeholder="Select Promotion Type"
              ></v-select>
              <b-form-invalid-feedback id="liveFeedbackPromotionType">
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
                ></v-select>
                <b-form-invalid-feedback id="liveFeedbackSubCategory">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Start Date" :state="chkState('startDate')">
                <v-date-picker
                  v-model="$v.form.startDate.$model"
                  :input-props="{ class: 'form-control' }"
                  show-caps
                >
                </v-date-picker>
                <b-form-invalid-feedback id="liveFeedbackStartDate">
                  This is a required fieldcheckSotre
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                label="End Date"
                label-for="endDate"
                :state="chkState('endDate')"
              >
                <v-date-picker
                  v-model="$v.form.endDate.$model"
                  :input-props="{ class: 'form-control' }"
                  show-caps
                >
                </v-date-picker>
                <b-form-invalid-feedback id="liveFeedbackEndDate">
                  This is a required fieldcheckSotre
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Packet Amount" label-for="packetAmount">
                <b-form-input
                  id="packetAmount"
                  type="number"
                  :state="chkState('packetAmount')"
                  v-model.lazy.trim="$v.form.packetAmount.$model"
                  aria-describedby="liveFeedbackPacketAmount"
                  placeholder="Packet Amount"
                />
                <b-form-invalid-feedback id="liveFeedbackPacketAmount">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Ctn Amount" label-for="ctnAmount">
                <b-form-input
                  id="ctnAmount"
                  type="number"
                  :state="chkState('ctnAmount')"
                  v-model.lazy.trim="$v.form.ctnAmount.$model"
                  aria-describedby="liveFeedbackCtnAmount"
                  placeholder="Ctn Amount"
                />
                <b-form-invalid-feedback id="liveFeedbackCtnAmount">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-btn
                variant="outline-info"
                class="mb-2"
                @click="showCollapse = !showCollapse"
                ><i
                  :class="
                    showCollapse ? 'fa fa-minus fa-lg' : 'fa fa-plus fa-lg'
                  "
                ></i
              ></b-btn>
              <b-collapse id="collapseOwner" v-model="showCollapse">
                <b-form-group
                  label="Packet Amount (Owner)"
                  label-for="packetAmountOwner"
                >
                  <b-form-input
                    id="packetAmountOwner"
                    type="number"
                    :state="chkState('packetAmountOwner')"
                    v-model.lazy.trim="$v.form.packetAmountOwner.$model"
                    aria-describedby="liveFeedbackPacketAmountOwner"
                    placeholder="Packet Amount (Owner)"
                  />
                  <b-form-invalid-feedback id="liveFeedbackPacketAmountOwner">
                    This is a required field
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                  label="Ctn Amount (Owner)"
                  label-for="ctnAmountOwner"
                >
                  <b-form-input
                    id="ctnAmountOwner"
                    type="number"
                    :state="chkState('ctnAmountOwner')"
                    v-model.lazy.trim="$v.form.ctnAmountOwner.$model"
                    aria-describedby="liveFeedbackCtnAmountOwner"
                    placeholder="Ctn Amount (Owner)"
                  />
                  <b-form-invalid-feedback id="liveFeedbackCtnAmountOwner">
                    This is a required field
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-collapse>

              <b-form-group label="Capping" label-for="capping">
                <b-form-input
                  id="capping"
                  type="number"
                  :state="chkState('capping')"
                  v-model.lazy.trim="$v.form.capping.$model"
                  aria-describedby="liveFeedbackCapping"
                  placeholder="Capping"
                />
                <b-form-invalid-feedback id="liveFeedbackCapping">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                label="Stores"
                label-for="stores"
                :state="chkState('stores')"
              >
                <store-select
                  v-model="$v.form.stores.$model"
                  multiple
                ></store-select>
                <b-form-invalid-feedback id="liveFeedbackStores">
                  This is a required field.
                </b-form-invalid-feedback>
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
import { mapState } from "vuex";
import BulkApi from "@/store/modules/bulkupload";
import { required } from "vuelidate/lib/validators";

const formShape = {
  subCategory: null,
  promotiontype: {label: "Regular Promo" , value: 1 },
  startDate: new Date(),
  endDate: new Date(),
  packetAmount: "",
  ctnAmount: "",
  packetAmountOwner: "",
  ctnAmountOwner: "",
  capping: "",
  stores: null,
};

export default {
  name: "PromotionFormAdd",
  props: {
    promotion: Object,
  },
  data() {
    return {
      file: null,
      form: Object.assign({}, formShape),
      submitted: false,
      showCollapse: false,
    };
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    },
    promoTypesList() {
      let list = [];
      Vue._.forEach(this.$store.state.promotions.promoTypes, (promoType) => {
        list.push({
          label: promoType.promotiontypename,
          value: promoType.promotiontypeid,
        });
      });
      return list;
    },
    subCategoryList() {
      let list = [];
      Vue._.forEach(
        this.$store.state.subCategories.productRanking,
        (subCategory) => {
          list.push({
            label: subCategory.subcat_name,
            value: subCategory.subcat,
          });
        }
      );
      return list;
    },
    ...mapState({
      stores: (state) => state.stores.all,
    }),
  },
  watch: {
    stores: function (values) {
      this.form.stores = _.map(values, (store) => {
        return { label: store.storename, value: store.storeid };
      });
    },
  },
  validations: {
    form: {
      subCategory: {
        required,
      },
      promotiontype:{
        required,
      },
      startDate: {
        required,
      },
      endDate: {
        required,
      },
      packetAmount: {
        required,
      },
      ctnAmount: {
        required,
      },
      packetAmountOwner: {},
      ctnAmountOwner: {},
      capping: {
        required,
      },
      stores: {
        required,
      },
    },
  },
  methods: {
    async bulkUpload() {
      let data = new FormData();
      data.append("file", this.file);

      await BulkApi.bulkSubmitpromotion(data)
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
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true;

          Vue.axios
            .post("/addPromotion", {
              subCat: this.$v.form.subCategory.$model.value,
              startDate: this.$moment(this.$v.form.startDate.$model).format(
                "YYYY-MM-DD"
              ),
              endDate: this.$moment(this.$v.form.endDate.$model).format(
                "YYYY-MM-DD"
              ),
              amount: this.$v.form.packetAmount.$model,
              ctnAmount: this.$v.form.ctnAmount.$model,
              stores: _.map(this.$v.form.stores.$model, (store) => {
                return store.value;
              }),
              capping: this.$v.form.capping.$model,
              ownerAmount: this.$v.form.packetAmountOwner.$model,
              ownerCtnAmount: this.$v.form.ctnAmountOwner.$model,
              promotiontypeid: this.$v.form.promotiontype.$model.value,
            })
            .then((response) => {
              this.$emit("success");
              this.showSuccessMsg();
            })
            .catch((error) => {
              this.showErrorMsg();
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
  created() {
    if (this.$store.state.subCategories.productRanking.length == 0) {
      this.$store.dispatch("subCategories/getProductRankingSubCategories");
    }
    if (this.$store.state.promotions.promoTypes.length == 0) {
      this.$store.dispatch("promotions/getPromotionTypes");
    }
  },
};
</script>
