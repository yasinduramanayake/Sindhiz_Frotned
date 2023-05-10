<template>
  <div class="animated fadeIn">
    <b-card>
      <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
        <b-row>
          <b-col sm="6">
            <b-form-group label="Stores" label-for="store">
              <store-select v-model="$v.form.stores.$model" multiple></store-select>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Date Range">
            <v-select
                v-model="$v.form.payroll.$model"
                :options="payrollList"
              ></v-select>
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
    stores: null,
    payroll: null,
  }

  export default {
    name: 'StoreWageSearch',
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
        payrollList: [],
        form: Object.assign({}, formShape),
      }
    },
    validations: {
      form: {
        stores: {
          required
        },
        payroll: {
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
              payroll: this.$v.form.payroll.$model,
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
      Vue.axios.get("/getWageDates")
      .then(response => {
        Vue._.each(response.data, payroll => {
          this.payrollList.push({label: payroll.date, value: payroll.payrollid})
        })
      })
    }
  }
</script>