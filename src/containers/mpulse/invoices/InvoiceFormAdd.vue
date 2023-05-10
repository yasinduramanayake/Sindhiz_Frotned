<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-row>
        <b-col lg="12">
          <!--<h6>Simple Form</h6>-->
          <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
            <b-form-group label="Store Name" label-for="store" :state="chkState('store')">
              <store-select v-model="$v.form.store.$model"></store-select>
            </b-form-group>

            <b-form-group label="Delivery Date" :state="chkState('deliveryDate')">
              <v-date-picker v-model="$v.form.deliveryDate.$model" :input-props='{ class: "form-control" }' show-caps>
              </v-date-picker>
            </b-form-group>

            <b-form-group label="Due Date" label-for="dueDate" :state="chkState('dueDate')">
              <v-date-picker v-model="$v.form.dueDate.$model" :input-props='{ class: "form-control" }' show-caps>
              </v-date-picker>
              <b-form-invalid-feedback id="liveFeedbackDueDate">
                This is a required fieldcheckSotre
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Distributor Name" label-for="store" :state="chkState('distributor')">
              <v-select :options="distributorList" v-model="$v.form.distributor.$model" placeholder="Select Distributor"></v-select>
            </b-form-group>

            <b-form-group label="Invoice Amount" label-for="invoiceAmount">
              <b-form-input id="invoiceAmount" type="text" :state="chkState('invoiceAmount')" v-model.lazy.trim="$v.form.invoiceAmount.$model" aria-describedby="liveFeedbackInvoiceAmount" placeholder="Invoice Amount" autofocus />
              <b-form-invalid-feedback id="liveFeedbackInvoiceAmount">
                This is a required field
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Invoice Number" label-for="invoiceNumber">
              <b-form-input id="invoiceNumber" type="text" :state="chkState('invoiceNumber')" v-model.lazy.trim="$v.form.invoiceNumber.$model" aria-describedby="liveFeedbackInvoiceNumber" placeholder="Invoice Number" autofocus />
              <b-form-invalid-feedback id="liveFeedbackInvoiceNumber">
                This is a required field
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Comment" label-for="comments">
              <b-form-input id="comments" type="text" aria-describedby="liveFeedbackComment" v-model.lazy.trim="$v.form.comments.$model" placeholder="Comment" autofocus />
            </b-form-group>

            <b-form-group label="Invoice Scan" label-for="invoiceImage">
              <vue-base64-file-upload v-for="(file, index) in files" :key="index" :fileId="file.id"accept="image/png,image/jpeg,application/pdf" image-class="img-thumbnail" input-class="form-control" placeholder="Click here to upload the invoice scan"
                @load="onLoad" />
              <b-button class="mt-1" size='sm' @click="addFile"> <i class="fa fa-plus"></i>
                Add File</b-button>
            </b-form-group>

            <b-button type="submit" variant="primary" :disabled="$v.form.$invalid || submitted">
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
  required
} from "vuelidate/lib/validators"
import VueBase64FileUpload from '../custom-components/VueBase64Upload';

const formShape = {
  store: null,
  deliveryDate: new Date(),
  dueDate: new Date(),
  distributor: null,
  invoiceAmount: "",
  invoiceNumber: "",
  comments: ""
}

export default {
  name: "InvoiceFormAdd",
  components: {
    VueBase64FileUpload
  },
  data() {
    return {
      form: Object.assign({}, formShape),
      submitted: false,
      invoiceImagePreview: true,
      files: []
    }
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
    distributorList() {
      let list = []
      Vue._.forEach(this.$store.state.distributors.active, (distributor) => {
        list.push({
          label: distributor.distributorname,
          value: distributor.distributorid
        })
      })
      return list
    }
  },
  validations: {
    form: {
      store: {
        required
      },
      deliveryDate: {
        required
      },
      dueDate: {
        required
      },
      distributor: {
        required
      },
      invoiceAmount: {
        required
      },
      invoiceNumber: {
        required
      },
      comments: {},
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true
          let params = {
            storeId: this.$v.form.store.$model.value,
            distributorId: this.$v.form.distributor.$model.value,
            deliveryDate: this.$moment(this.$v.form.deliveryDate.$model).format('YYYY-MM-DD'),
            dueDate: this.$moment(this.$v.form.dueDate.$model).format('YYYY-MM-DD'),
            invoiceAmount: this.$v.form.invoiceAmount.$model,
            invoiceNumber: this.$v.form.invoiceNumber.$model,
            comments: this.$v.form.comments.$model,
            files: this.files
          }

          this.$store.dispatch('invoices/addInvoice', params)
            .then(() => {
              this.$emit('success')
              this.showSuccessMsg()
            })
            .catch(() => {
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
    onLoad(dataUri, name, id) {
      let file = _.find(this.files, ["id", id])
      file.name = name
      file.dataUri = dataUri
    },
    addFile() {
      let id = this.createUniqueId()
      this.files.push({id: id, dataUri: null, name: null})
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
    },
    
  },
  created() {
    this.$store.dispatch('distributors/getDistributors')
    this.addFile()
  }
}
</script>
