<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
        <b-row>
          <b-col sm="12">
            <b-form-group label="Store">
              <store-select v-model="$v.form.store.$model" :change="changeStore"></store-select>
            </b-form-group>
            <b-form-group label="Year">
              <year-select v-model="$v.form.year.$model" :change="changeYear"></year-select>
            </b-form-group>
            <b-form-group label="From Week">
              <v-select :options="weekData" placeholder="Select Week" v-model="$v.form.fromWeek.$model"></v-select>
            </b-form-group>
            <b-form-group label="To Week">
              <v-select :options="weekList" placeholder="Select Week" v-model="$v.form.toWeek.$model"></v-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <b-btn type="submit" variant="success" :disabled="$v.form.$invalid">Copy</b-btn>
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
  store: null,
  year: Vue.moment().year().toString(),
  fromWeek: null,
  toWeek: null
}

export default {
  name: 'CopyRosterForm',
  components: {
    StoreSelect,
    YearSelect
  },
  data: function() {
    return {
      form: Object.assign({}, formShape),
      weekData: []
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
      store: {
        required
      },
      year: {
        required
      },
      fromWeek: {
        required
      },
      toWeek: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {

          let params = {
            storeId: this.$v.form.store.$model.value,
            year: this.$v.form.year.$model,
            fromWeek: this.$v.form.fromWeek.$model.value,
            toWeek: this.$v.form.toWeek.$model.value,
          }
          if (params.fromWeek == params.toWeek) {
            this.showErrorMsg({
              message: "From week is same as To week"
            })
            return
          }
          Vue.axios.post('/copyRoster', params)
            .then((response) => {
              this.$emit('success', {
                store: this.$v.form.store.$model,
                year: this.$v.form.year.$model,
                weekNo: this.$v.form.toWeek.$model.value
              })
              this.showSuccessMsg()
            })
            .catch((error) => {
              console.log(error)
              this.showErrorMsg()
            })
        })
      }
    },
    changeStore(store) {
      this.weekData = []
      if (store && this.form.year) {
        this.getRosterList(store.value, this.form.year)
      }
    },
    changeYear(year) {
      this.weekData = []
      if (year && this.form.store) {
        this.getRosterList(this.form.store.value, year)
      }
    },
    getRosterList(storeId, selectedYear) {
      Vue.axios.get('getRosterList?storeId=' + storeId + '&year=' + selectedYear)
        .then(response => {
          this.weekData = []
          _.forEach(response.data, (o) => {
            let week = {
              label: 'Week ' + o.weekno + ' - ' + this.getStartOfWeek(selectedYear, o.weekno) + ' to ' + this.getEndOfWeek(selectedYear, o.weekno),
              value: o.weekno
            }
            this.weekData.push(week)
          })
        })
        .catch((error) => {
          this.showErrorMsg()
        })
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
