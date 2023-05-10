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
            <b-row>
              <b-col>
                <b-form-group label="Rule Description">
                  <b-form-input
                    type="text"
                    v-model="$v.form.description.$model"
                  />
                </b-form-group>
              </b-col>
            </b-row>
              <b-row>
                <b-col>
                  <b-form-group label="Rules" label-for="rules" label-cols-sm="4" label-cols-lg="3">
                    <b-input-group id="rules" name="rules">
                      <b-input-group-prepend>
                        <b-button variant="outline-info" @click="removeRule">Remove Rule</b-button>
                      </b-input-group-prepend>
                      <b-form-input v-model="numberOfRules" disabled></b-form-input>
                      <b-input-group-append>
                        <b-button variant="success" @click="addRule">Add Rule</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                 <b-form-group label="" label-for="" label-cols-sm="4" label-cols-lg="3">
                   <rule-list ref="ruleList"></rule-list>
                 </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-form-group label="Distributor">
                    <v-select
                      :options="distributorList"
                      v-model="$v.form.distributor.$model"
                      placeholder="Select Distributor"
                      :onChange="onDistributorChange"
                    ></v-select>
                  </b-form-group>
                </b-col>
              </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Account">
                  <b-form-input
                    type="text"
                    v-model="$v.form.account.$model"
                    readonly
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                  <b-form-group label="">
                    <b-form-checkbox
                       v-model="$v.form.ignoreinvoice.$model"
                     >
                      Continue without invoice?
                    </b-form-checkbox>
                  </b-form-group>
              </b-col>
            </b-row>

              <b-button
                type="submit"
                variant="primary"
                :disabled="$v.form.$invalid"
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
import { required, requiredIf } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import RuleList from './RuleList'


const formShape = {
  distributor: null,
  account: null,
  description: null,
  rules: null,
  ignoreinvoice: false,
  storeid: null,
  bankfeedid: null
};

export default {
  name: "CreateRule",
  components: {
    RuleList,
  },
  props: {
    bankFeedLine: Object
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      numberOfRules: 0
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
      Vue._.forEach(this.$store.state.distributors.rule, distributor => {
        list.push({
          label: distributor.distributorname,
          value: distributor.distributorid,
          accountid: distributor.accountid,
          accountname: distributor.account.accountname

        });
      });
      return list;
    },
  },
  validations: {
    form: {
      distributor: {
        required
      },
      account: {
        required
      },
      description: {
        required
      },
      ignoreinvoice:{
        required
      }


    }
  },
  methods: {
    onDistributorChange()
    {
      if(this.$v.form.distributor != null && this.$v.form.distributor.$model != null){
        this.form.account = this.$v.form.distributor.$model.accountid + " - " + this.$v.form.distributor.$model.accountname;
      }
      else{
        this.form.account = null
      }
    },
    addRule() {
    if (this.numberOfRules < 2) {
      this.numberOfRules++
      this.$refs.ruleList.addRule()
    }
  },
  removeRule() {
    if (this.numberOfRules > 0) {
      this.numberOfRules--
      this.$refs.ruleList.removeRule()
    }
  },
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.form.rules = this.$refs.ruleList.getRules();
          if(this.form.rules == null || this.form.rules.length == 0 ){
            this.showErrorMsg({message: "Please set rule values and Logical operators correctly. "});
            return;
          }
          let params = {
            description: this.$v.form.description.$model,
            distributorId: this.$v.form.distributor.$model.value,
            accountId: this.$v.form.distributor.$model.accountid,
            rules: this.form.rules,
            ignoreInvoice: this.$v.form.ignoreinvoice.$model,
            bankfeedid: this.form.bankfeedid,
            storeid: this.form.storeid
          };




          Vue.axios
            .post("/accounts/createAccountRule", params)
            .then(response => {
              if (response.data.success == false) {
                this.showErrorMsg({
                  message: response.data.error
                })
              }
              else{
                this.showSuccessMsg({
                  message: 'Record saved successfully.'
                });
                this.$emit("success");
              }

            })
            .catch(error => {
              console.log(error)
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
    this.$store.dispatch("distributors/getRulesDistributors");
    if(this.bankFeedLine != null){
      console.log(this.bankFeedLine)
      this.form.description = this.bankFeedLine.description;
      this.form.bankfeedid = this.bankFeedLine.bankfeedid;
      this.form.storeid = this.bankFeedLine.storeid;
    }

  }
};
</script>
