<template>
  <div class="animated fadeIn">
    <b-card>
      <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
        <b-row>
          <b-col sm="4">
            <b-form-group label="Store Name" label-for="store" :state="chkState('store')" >
              <v-select :options="storeList"  v-model="$v.form.store.$model" placeholder="Select Store"></v-select>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group label="From" :state="chkState('dateFrom')">
              <v-date-picker
                v-model="$v.form.dateFrom.$model"
                :input-props='{ class: "form-control" }'
                show-caps>
              </v-date-picker>
            </b-form-group>
          </b-col>
          <b-col sm="4">
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
  import { mapState, mapActions } from 'vuex'
  import { required } from "vuelidate/lib/validators"
  import vSelect from 'vue-select'
  import { DatePicker } from 'v-calendar'
  import 'v-calendar/lib/v-calendar.min.css'

  const formShape = {
    store: null,
    dateFrom: new Date(),
    dateTo: new Date()
  }
  export default {
    name: 'DeliveryReportSearch',
    components: {
      vSelect,
      'v-date-picker': DatePicker
    },
    computed: {
      isValid() { return !this.$v.form.$anyError },
      isDirty() { return this.$v.form.$anyDirty },
      storeList() {
        let list = []
        Vue._.forEach(this.$store.state.stores.all, (store) => {
          list.push({label: store.storename, value: store.storeid})
        })
        return list
      },
    },
    data: function () {
      return {
        submitted: false,
        selectedStore: null,
        from: '',
        to: '',
        form: Object.assign({}, formShape),
      }
    },
    validations: {
      form: {
        store: {
          required
        },
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
              store: this.$v.form.store.$model.value,
              storeName: this.$v.form.store.$model.label,
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
      this.form.dateFrom = this.$moment().subtract(1, 'd').toDate()
    }
  }
</script>
