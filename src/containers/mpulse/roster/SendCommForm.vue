<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
        <b-row>
          <b-col sm="12">
            <b-form-group label="Year">
              <year-select v-model="$v.form.year.$model"></year-select>
            </b-form-group>
            <b-form-group label="Week" label-for="week">
              <v-select :options="weekList" placeholder="Select Week" v-model="$v.form.week.$model"></v-select>
            </b-form-group>
            <b-form-group label="Stores" label-for="stores">
              <store-select v-model="$v.form.stores.$model" multiple></store-select>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox @change="selectAllStores">
                Select All Stores
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <b-btn type="submit" variant="success" :disabled="$v.form.$invalid">Submit</b-btn>
          </b-col>
        </b-row>
      </b-form>
    </b-card-body>
  </b-card>
</div>
</template>

<script>
import Vue from 'vue'
import {
  required
} from "vuelidate/lib/validators"
import StoreSelect from '../custom-components/StoreSelect'
import YearSelect from '../custom-components/YearSelect'

const formShape = {
  stores: null,
  year: Vue.moment().year().toString(),
  week: null
}

export default {
  name: 'SendCommForm',
  components: {
    StoreSelect,
    YearSelect
  },
  data: function() {
    return {
      form: Object.assign({}, formShape),
    }
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
    weekList() {
      let list = []
      for (var i = 1; i <= 52; i++) {
        let label = 'Week ' + i + ' - ' + this.getStartOfWeek(this.form.year, i) + ' to ' + this.getEndOfWeek(this.form.year, i)
        list.push({
          label: label,
          value: i
        })
      }
      return list
    },
  },
  validations: {
    form: {
      stores: {
        required
      },
      year: {
        required
      },
      week: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          let params = {
            year: this.$v.form.year.$model,
            weekNo: this.$v.form.week.$model.value,
            stores: _.map(this.$v.form.stores.$model, (store) => {
              return store.value
            })
          }
          Vue.axios.post('/sendRosterComm', params)
            .then((response) => {
              this.$emit('success')
              this.showSuccessMsg()
            })
            .catch((error) => {
              console.log(error)
              this.showErrorMsg()
            })
        })
      }
    },
    selectAllStores(value) {
      this.form.stores = value ? Vue._.map(this.$store.state.stores.all, (store) => {
        return {
          label: store.storename,
          value: store.storeid
        }
      }) : null
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
