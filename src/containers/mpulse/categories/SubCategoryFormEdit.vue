<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-row>
        <b-col lg="12">
          <!--<h6>Simple Form</h6>-->
          <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>

            <b-form-group label="Sub Category" label-for="subcat">
              <b-form-input id="subcat" type="text" aria-describedby="liveFeedbackSubcat" v-model.lazy.trim="$v.form.subcat.$model" placeholder="Sub Category" readonly />
              <b-form-invalid-feedback id="liveFeedbackSubcat">
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Sub Category Name" label-for="subcatname">
              <b-form-input id="subcatname" type="text" aria-describedby="liveFeedbackSubcatname" v-model.lazy.trim="$v.form.subcatname.$model" placeholder="Sub Category Name" autofocus />
              <b-form-invalid-feedback id="liveFeedbackSubcatname">
                This is a required field.
              </b-form-invalid-feedback>
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
import Vue from 'vue'
import {
  mapState,
  mapActions
} from 'vuex'
import {
  required, maxLength
} from "vuelidate/lib/validators"

const formShape = {
  subcat: "",
  subcatname: null,

}

export default {
  name: "SubCategoryFormEdit",
  props: {
    subcategory: Object
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
      subcat: {
        required
      },
      subcatname: {
        required,
        maxLength : maxLength(100)
      },
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true
          let params = {
            subcategoryid: this.$v.form.subcat.$model,
            subcategoryname: this.$v.form.subcatname.$model,
          }

          this.$store.dispatch('categories/editSubCategory', params)
            .then(() => {
              this.$emit('success')
              this.showSuccessMsg()
            })
            .catch((error) => {
              if (error.response.status == 400) {
                this.showErrorMsg({
                  message: error.response.data.message
                })
              } else {
                this.showErrorMsg(error.response.data.message)
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
  },
  beforeMount() {
    this.form.subcat = this.subcategory.subcat
    this.form.subcatname = this.subcategory.subcat_name
  }
}
</script>
