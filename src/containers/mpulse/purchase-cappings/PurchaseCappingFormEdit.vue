<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-row>
        <b-col lg="12">
          <!--<h6>Simple Form</h6>-->
          <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
            <b-form-group label="Store Name" label-for="store" :state="chkState('store')">
              <v-select :options="storeList" v-model="$v.form.store.$model" placeholder="Select Store" disabled></v-select>
              <b-form-invalid-feedback id="liveFeedbackStore">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Supplier" label-for="supplier" :state="chkState('supplier')">
              <v-select :options="supplierList" v-model="$v.form.supplier.$model" placeholder="Select Supplier" disabled></v-select>
              <b-form-invalid-feedback id="liveFeedbackSubCategory">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Sub Category" label-for="subCategory" :state="chkState('subCategory')">
              <v-select :options="subCategoryList" v-model="$v.form.subCategory.$model" placeholder="Select Sub Category" disabled></v-select>
              <b-form-invalid-feedback id="liveFeedbackSubCategory">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Capping" label-for="capping">
              <b-form-input id="capping" type="number" :state="chkState('capping')" v-model.lazy.trim="$v.form.capping.$model" aria-describedby="liveFeedbackCapping" placeholder="Capping" autofocus />
              <b-form-invalid-feedback id="liveFeedbackCapping">
                This is a required field
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group>
              <div class="custom-control custom-control-inline">
                <b-form-checkbox id="isActive" v-model.lazy.trim="$v.form.isActive.$model" :unchecked-value="false">
                  Is Active
                </b-form-checkbox>
              </div>
            </b-form-group>

            <b-button type="submit" variant="primary" :disabled="$v.form.$invalid || submitted">
              Submit
            </b-button>
            <b-button class="ml-1" type="reset" @click="onCancel">Cancel</b-button>
          </b-form>
          <br />
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</div>
</template>

<script>
import Vue from 'vue'
import {
  mapState,
  mapActions
} from 'vuex'
import {
  required
} from "vuelidate/lib/validators"
import vSelect from 'vue-select'
import {
  setupCalendar,
  DatePicker
} from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

const formShape = {
  store: null,
  subCategory: null,
  capping: "",
  isActive: true
}

export default {
  name: "PurchaseCappingFormEdit",
  components: {
    vSelect,
    'v-date-picker': DatePicker
  },
  props: {
    purchaseCapping: Object
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      submitted: false,
      subCategoryList: [],
      supplierList: []
    }
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
    storeList() {
      let list = []
      Vue._.forEach(this.$store.state.stores.all, (store) => {
        list.push({
          label: store.storename,
          value: store.storeid
        })
      })
      return list
    }
  },
  validations: {
    form: {
      store: {
        required
      },
      supplier: {
        required
      },
      subCategory: {
        required
      },
      capping: {
        required
      },
      isActive: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true
          let params = {
            purchaseCappingId: this.purchaseCapping.purchase_capping_id,
            capping: this.$v.form.capping.$model,
            isActive: this.$v.form.isActive.$model
          }

          this.$store.dispatch('purchaseCappings/editPurchaseCapping', params)
            .then(() => {
              this.$emit('success')
              this.showSuccessMsg()
            })
            .catch(() => {
              this.showErrorMsg()
            })
        })
      }
    },
    onCancel() {
      this.$emit('cancel')
    },
    onReset() {
      // Reset validation
      this.form = formShape
      this.submitted = false
      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    chkState(val) {
      const field = this.$v.form[val]
      return field.$dirty ? !field.$invalid : null
    },
    findFirstError(component = this) {
      if (component.state === false) {
        if (component.$refs.input) {
          component.$refs.input.focus()
          return true
        }
        if (component.$refs.check) {
          component.$refs.check.focus()
          return true
        }
      }
      let focused = false
      component.$children.some((child) => {
        focused = this.findFirstError(child)
        return focused
      })

      return focused
    },
    validate() {
      this.$v.$touch()
      this.$nextTick(() => this.findFirstError())
      return this.isValid
    }
  },
  created() {
  },
  beforeMount() {
    this.form.store = {label: this.purchaseCapping.store.storename, value: this.purchaseCapping.store.storeid}
    this.form.supplier = {label: this.purchaseCapping.supplier.suppliername, value: this.purchaseCapping.supplier.supplierid}
    this.form.subCategory = {label: this.purchaseCapping.sub_cat.subcat_name, value: this.purchaseCapping.sub_cat.subcat}
    this.form.capping = this.purchaseCapping.capping
    this.form.isActive = this.purchaseCapping.isactive ? true : false
  }
}
</script>
