<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-row>
        <b-col lg="12">
          <!--<h6>Simple Form</h6>-->
          <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>

            <b-form-group label="Store Name">
              <b-form-input id="storeName" type="text" aria-describedby="liveFeedbackName" v-model.lazy.trim="$v.form.storeName.$model" placeholder="Store Name" autofocus />
            </b-form-group>

            <b-form-group label="Store Email" >
              <b-form-input id="storeEmail" type="email" v-model.lazy.trim="$v.form.storeEmail.$model" placeholder="Store Email" autofocus />
            </b-form-group>

            <b-form-group label="Company" >
              <company-select v-model="$v.form.company.$model" />
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
import {
  required
} from "vuelidate/lib/validators"
import CompanySelect from '../custom-components/CompanySelect';

const formShape = {
  storeName: "",
  storeEmail: "",
  company: null,
  isActive: true
}

export default {
  name: "StoreFormAdd",
  components: {
    CompanySelect
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      submitted: false
    }
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
  },
  validations: {
    form: {
      storeName: {
        required
      },
      storeEmail: {
        required
      },
      company: {
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
            storeName: this.$v.form.storeName.$model,
            storeEmail: this.$v.form.storeEmail.$model,
            companyId: this.$v.form.company.$model.value,
          }

          this.$store.dispatch('stores/addStore', params)
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
  }
}
</script>
