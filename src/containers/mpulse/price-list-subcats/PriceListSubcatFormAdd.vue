<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-row>
        <b-col lg="12">
          <!--<h6>Simple Form</h6>-->
          <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>

            <b-form-group label="Sub Category" label-for="subCategory" :state="chkState('subCategory')">
              <v-select :options="subCategoryList" v-model="$v.form.subCategory.$model" placeholder="Select Sub Category" @change="selectSubcat"></v-select>
              <b-form-invalid-feedback id="liveFeedbackSubCategory">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Packet Price" label-for="packetPrice">
              <b-form-input id="packetPrice" type="number" :state="chkState('packetPrice')" v-model.lazy.trim="$v.form.packetPrice.$model" aria-describedby="liveFeedbackPacketPrice" placeholder="Packet Price" />
              <b-form-invalid-feedback id="liveFeedbackPacketPrice">
                This is a required field
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Carton Price" label-for="cartonPrice">
              <b-form-input id="cartonPrice" type="number" :state="chkState('cartonPrice')" v-model.lazy.trim="$v.form.cartonPrice.$model" aria-describedby="liveFeedbackCartonPrice" placeholder="Carton Price" />
              <b-form-invalid-feedback id="liveFeedbackCartonPrice">
                This is a required field
              </b-form-invalid-feedback>
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

const formShape = {
  subCategory: null,
  packetPrice: null,
  cartonPrice: null
}

export default {
  name: "PriceListSubcatFormAdd",
  props: {
    priceListSubcat: Object
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      submitted: false,
    }
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
    subCategoryList() {
      let list = []
      Vue._.forEach(this.$store.state.subCategories.all, (subCategory) => {
        list.push({
          label: subCategory.subcat_name,
          value: subCategory.subcat
        })
      })
      return list
    },
    ...mapState({
      priceListSubcats: state => state.marketPriceListSubcats.all
    }),
  },
  validations: {
    form: {
      subCategory: {
        required
      },
      packetPrice: {
        required
      },
      cartonPrice: {
        required
      }
    }
  },
  methods: {
    selectSubcat(selectedSubcat) {
      if (selectedSubcat) {
        let createdPrice = _.find(this.priceListSubcats, (priceListSubcat) => {
          return priceListSubcat.subcat == selectedSubcat.value;
        })

        if (createdPrice) {
          this.form.packetPrice = createdPrice.packet_price
          this.form.cartonPrice = createdPrice.carton_price
        } else {
          this.form.packetPrice = null
          this.form.cartonPrice = null
        }
      } else {
        this.form.packetPrice = null
        this.form.cartonPrice = null
      }
    },
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true

          this.$store.dispatch('marketPriceListSubcats/addPrice', {
            listid: this.$route.params.listid,
            subcat: this.$v.form.subCategory.$model.value,
            packetPrice: this.$v.form.packetPrice.$model,
            cartonPrice: this.$v.form.cartonPrice.$model
          }).then((response) => {
            this.$emit('success')
            this.showSuccessMsg()
          }).catch((error) => {
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
    if (this.priceListSubcat) {
      this.form.subCategory = {label: this.priceListSubcat.subcat_name, value: this.priceListSubcat.subcat}
    }
  }
}
</script>
