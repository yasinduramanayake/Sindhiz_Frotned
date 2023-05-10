<template>
<div class="animated fadeIn">
  <b-card>
    <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
      <b-row>
        <b-col sm="12">
          <b-form-group label="Store" label-for="store">
            <store-select v-model="$v.form.stores.$model" multiple></store-select>
          </b-form-group>
          <b-form-checkbox
            @change="selectAllStores"
            class="pull-left mb-2"
          >
            Select All Stores
          </b-form-checkbox>
        </b-col>
        </b-row>
      <b-row>
        <b-col sm="6">
          <b-form-group label="From">
            <v-date-picker v-model="$v.form.fromDate.$model" :input-props='{ class: "form-control" }' show-caps>
            </v-date-picker>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="To">
            <v-date-picker v-model="$v.form.toDate.$model" :input-props='{ class: "form-control" }' show-caps>
            </v-date-picker>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-btn type="submit" variant="success" :disabled="$v.form.$invalid">Submit</b-btn>
        </b-col>
      </b-row>
      
    </b-form>
  </b-card>
</div>
</template>

<script>
import Vue from 'vue'
import {
  required
} from "vuelidate/lib/validators"

const formShape = {
  stores: [],
  fromDate: new Date(),
  toDate: new Date()
}

export default {
  name: 'ReportSearchMultiStores',
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
    selectAllStores(value) {
      this.form.stores = value
        ? Vue._.map(this.$store.state.stores.all, store => {
            return {
              label: store.storename,
              value: store.storeid
            };
          })
        : [];
    },
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
