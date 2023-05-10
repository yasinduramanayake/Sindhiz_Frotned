<template>
  <div class="animated fadeIn">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col lg="12">
            <!--<h6>Simple Form</h6>-->
            <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
              <b-form-group label="Packet Amount" label-for="packetAmount" >
                <b-form-input id="packetAmount"
                              type="number"
                              :state="chkState('packetAmount')"
                              v-model.lazy.trim="$v.form.packetAmount.$model"
                              aria-describedby="liveFeedbackPacketAmount"
                              placeholder="Packet Amount" />
                <b-form-invalid-feedback id="liveFeedbackPacketAmount">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Ctn Amount" label-for="ctnAmount" >
                <b-form-input id="ctnAmount"
                              type="number"
                              :state="chkState('ctnAmount')"
                              v-model.lazy.trim="$v.form.ctnAmount.$model"
                              aria-describedby="liveFeedbackCtnAmount"
                              placeholder="Ctn Amount" />
                <b-form-invalid-feedback id="liveFeedbackCtnAmount">
                  This is a required field
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


const formShape = {
  packetAmount: "",
  ctnAmount: "",
}

export default {
  name: "PromotionFormEdit",
  props: {
    bulkPromotionEdit: Object
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
      packetAmount: {
        required
      },
      ctnAmount: {
        required
      },
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true
          Vue.axios.post('/bulk-promotions/editBulkPromotionEdit', {
            promoid: this.bulkPromotionEdit.promoid,
            amount: this.$v.form.packetAmount.$model,
            ctnAmount: this.$v.form.ctnAmount.$model,
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
    this.form.packetAmount = this.bulkPromotionEdit.amount
    this.form.ctnAmount = this.bulkPromotionEdit.ctnamount
  }
}
</script>
