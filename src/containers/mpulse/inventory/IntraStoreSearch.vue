<template>
  <div class="animated fadeIn">
    <b-card>
      <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
        <b-row>
          <b-col sm="6">
            <b-form-group label="From" :state="chkState('dateFrom')">
              <v-date-picker
                v-model="$v.form.dateFrom.$model"
                :input-props='{ class: "form-control" }'
                show-caps>
              </v-date-picker>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="To" :state="chkState('dateTo')">
              <v-date-picker
                v-model="$v.form.dateTo.$model"
                :input-props='{ class: "form-control" }'
                show-caps>
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
  import { required } from "vuelidate/lib/validators"

  const formShape = {
    dateFrom: new Date(),
    dateTo: new Date()
  }
  export default {
    name: 'IntraStoreSearch',
    components: {
    },
    computed: {
      isValid() { return !this.$v.form.$anyError },
      isDirty() { return this.$v.form.$anyDirty },
    },
    data: function () {
      return {
        submitted: false,
        from: '',
        to: '',
        form: Object.assign({}, formShape),
      }
    },
    validations: {
      form: {
        dateFrom: {
          required
        },
        dateTo: {
          required
        }
      }
    },
    methods: {
      onSubmit() {
        if (this.validate()) {
          this.$nextTick(() => {
            let params = {
              dateFrom: this.$moment(this.$v.form.dateFrom.$model).format('YYYY-MM-DD'),
              dateTo: this.$moment(this.$v.form.dateTo.$model).format('YYYY-MM-DD')
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
      this.form.dateFrom = this.$moment().subtract(1, 'M').toDate()
    }
  }
</script>