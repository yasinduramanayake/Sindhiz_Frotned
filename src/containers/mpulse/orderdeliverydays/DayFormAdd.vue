<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-row>
        <b-col lg="12">
          <!--<h6>Simple Form</h6>-->
          <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>

            <b-form-group label="Store Name" label-for="store" :state="chkState('store')" >
                <v-select :options="storeList" v-model="$v.form.store.$model" placeholder="Select Store"></v-select>
                <b-form-invalid-feedback id="liveFeedbackStore">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Distributor Name" label-for="distributor" :state="chkState('distributor')">
                <v-select :options="distributorList" v-model="$v.form.distributor.$model" placeholder="Select Distributor"></v-select>
                <b-form-invalid-feedback id="liveFeedbackDistributor">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Day" label-for="day" :state="chkState('day')">
                <v-select :options="dayList" v-model="$v.form.day.$model" placeholder="Select Day"></v-select>
                <b-form-invalid-feedback id="liveFeedbackDay">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Classification" label-for="classification" :state="chkState('classification')">
                <v-select :options="classificationList" v-model="$v.form.classification.$model" placeholder="Select Classification"></v-select>
                <b-form-invalid-feedback id="liveFeedbackClassification">
                  This is a required field.
                </b-form-invalid-feedback>
              </b-form-group>

            <b-button type="submit" variant="primary" :disabled="$v.form.$invalid">
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
  store: null,
  distributor: null,
  day:null,
  classification:null
}

export default {
  name: "DayFormAdd",
  data() {
    return {
      form: Object.assign({}, formShape),
      submitted: false,
      dayList:[
        {label:'Monday',value:'mon'},
        {label:'Tuesday',value:'tue'},
        {label:'Wednesday',value:'wed'},
        {label:'Thursday',value:'thu'},
        {label:'Friday',value:'fri'},
        {label:'Saturday',value:'sat'},
        {label:'Sunday',value:'sun'}
      ],
      classificationList :['Order','Delivery','Stocktake']
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
      list.push({label: store.storename, value: store.storeid})
      })
      return list
    },
    distributorList() {
      let list = []
      Vue._.forEach(this.$store.state.distributors.unassigned, (distributor) => {
        list.push({label: distributor.distributorname, value: distributor.distributorid})
      })
      return list
    },

  },
  validations: {
    form: {
      store: {
        required
      },
      distributor: {
        required
      },
      day: {
        required
      },
      classification: {
        required
      },

    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true
          let params = {
            storeId: this.$v.form.store.$model.value,
            distributorId: this.$v.form.distributor.$model.value,
            day: this.$v.form.day.$model.value,
            classification: this.$v.form.classification.$model,
          }

          this.$store.dispatch('orderDeliveryDays/addDay', params)
            .then(() => {
              this.$emit('success')
              this.showSuccessMsg()
            })
            .catch((error) => {
              if (error.response.status == 400) {
                this.showErrorMsg({message: error.response.data.message })
              } else {
                this.showErrorMsg()
              }
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
  created () {
    this.$store.dispatch('distributors/getUnAssignedDistributors')
  }
}
</script>
