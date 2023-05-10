<template>
<div class="animated fadeIn">
  <b-card>
    <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
      <b-row>
        <b-col>
          <b-form-group label="Store" label-for="store" :state="chkState('store')">
            <store-select v-model="$v.form.store.$model"></store-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Distributor" :state="chkState('distributor')">
            <distributor-select v-model="$v.form.distributor.$model" />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Number of Boxes" :state="chkState('numOfBoxes')" label-for="numOfBoxes">
            <b-form-input id="numOfBoxes" aria-describedby="liveFeedback" type="number" v-model.lazy.trim="$v.form.numOfBoxes.$model" placeholder="Number of Boxes" />
            <b-form-invalid-feedback id="liveFeedback">
                This is a required field.
              </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-btn type="submit" variant="success" :disabled="$v.form.$invalid" class="pull-right">Next</b-btn>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</div>
</template>

<script>
import Vue from 'vue'
import {
  required,
  between,
} from "vuelidate/lib/validators"
import DistributorSelect from '../custom-components/DistributorSelect'

const formShape = {
  store: null,
  distributor: null,
  numOfBoxes: 1
}

export default {
  name: 'DeliveryReceiveStep1',
  components: {
    DistributorSelect
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
  },
  data: function() {
    return {
      submitted: false,
      form: Object.assign({}, formShape),
    }
  },
  validations: {
    form: {
      store: {
        required
      },
      distributor: {
        required
      },
      numOfBoxes: {
        between: between(1, 200)
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          let params = {
            store: this.$v.form.store.$model,
            distributor: this.$v.form.distributor.$model,
            numOfBoxes: parseInt(this.$v.form.numOfBoxes.$model)
          }
          this.$emit('next', params)
        })
      }
    },
    onReset() {
      this.form = formShape
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
  }
}
</script>
