<template>
<div class="animated fadeIn">
  <b-card>
    <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
      <b-row>
        <b-col>
          <b-form-group label="Stores" label-for="stores" :state="chkState('stores')">
            <store-select v-model="$v.form.stores.$model" multiple></store-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <b-form-group label="From" :state="chkState('fromDate')">
            <v-date-picker v-model="$v.form.fromDate.$model" :input-props='{ class: "form-control" }' show-caps>
            </v-date-picker>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="To" :state="chkState('toDate')">
            <v-date-picker v-model="$v.form.toDate.$model" :input-props='{ class: "form-control" }' show-caps>
            </v-date-picker>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <b-btn type="submit" variant="success" :disabled="$v.form.$invalid">Submit</b-btn>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</div>
</template>

<script>
import Vue from 'vue'
import { mapState } from "vuex";
import {
  required
} from "vuelidate/lib/validators"

const formShape = {
  stores: null,
  fromDate: new Date(),
  toDate: new Date()
}

export default {
  name: 'InvoieAmountsSearch',
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
    ...mapState({
      stores: state => state.stores.all
    })
  },
  watch: {
    stores: function(values) {
      this.form.stores = _.map(values, store => {
        return {label: store.storename, value: store.storeid}
      })
    }
  },
  data: function() {
    return {
      submitted: false,
      from: '',
      to: '',
      form: Object.assign({}, formShape),
    }
  },
  validations: {
    form: {
      stores: {
        required
      },
      fromDate: {
        required
      },
      toDate: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          let params = {
            stores: this.$v.form.stores.$model,
            fromDate: this.$moment(this.$v.form.fromDate.$model).format('YYYY-MM-DD'),
            toDate: this.$moment(this.$v.form.toDate.$model).format('YYYY-MM-DD')
          }
          this.$emit('search', params)
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
  },
  created() {
    this.form.fromDate = this.$moment().subtract(1, 'M').toDate()
  }
}
</script>
