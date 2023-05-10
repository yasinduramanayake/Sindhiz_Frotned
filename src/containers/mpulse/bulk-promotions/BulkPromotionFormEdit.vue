<template>
  <div class="animated fadeIn">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col lg="12">
            <!--<h6>Simple Form</h6>-->
            <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
              <b-form-group label="Start Date" :state="chkState('startDate')">
                <v-date-picker
                  v-model="$v.form.startDate.$model"
                  :input-props='{ class: "form-control" }'
                  show-caps>
                </v-date-picker>
                <b-form-invalid-feedback id="liveFeedbackStartDate">
                  This is a required fieldcheckSotre
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="End Date" label-for="endDate" :state="chkState('endDate')">
                <v-date-picker
                  v-model="$v.form.endDate.$model"
                  :input-props='{ class: "form-control" }'
                  show-caps>
                </v-date-picker>
                <b-form-invalid-feedback id="liveFeedbackEndDate">
                  This is a required fieldcheckSotre
                </b-form-invalid-feedback>
              </b-form-group>

              <b-button type="submit" variant="primary" :disabled="$v.form.$invalid || submitted">
                Submit
              </b-button>
              <b-button class="ml-1" type="reset" @click="onCancel">Cancel</b-button>
            </b-form>
            <br/>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { required } from "vuelidate/lib/validators"
import vSelect from 'vue-select'
import { setupCalendar, DatePicker } from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

const formShape = {
  startDate: new Date(),
  endDate: new Date(),
}

export default {
  name: "PromotionFormEdit",
  components: {
    vSelect,
    'v-date-picker': DatePicker
  },
  props: {
    bulkPromotion: Object
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      submitted: false,
      showCollapse: false
    }
  },
  computed: {
    isValid() { return !this.$v.form.$anyError },
    isDirty() { return this.$v.form.$anyDirty },
  },
  validations: {
    form: {
      startDate: {
        required
      },
      endDate: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true
          Vue.axios.post('/bulk-promotions/editBulkPromotion', {
            bulkPromoId: this.bulkPromotion.bulkpromoid,
            startDate: this.$moment(this.$v.form.startDate.$model).format('YYYY-MM-DD'),
            endDate: this.$moment(this.$v.form.endDate.$model).format('YYYY-MM-DD')
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
  beforeMount() {
    this.form.startDate = new Date(this.bulkPromotion.startdate)
    this.form.endDate = new Date(this.bulkPromotion.enddate)
  }
}
</script>
