<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-row>
        <b-col lg="12">
          <!--<h6>Simple Form</h6>-->
          <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
            <b-form-group label="Distributor Name" label-for="store" :state="chkState('distributor')">
              <v-select :options="distributorList" v-model="$v.form.distributor.$model" placeholder="Select Distributor"></v-select>
            </b-form-group>

            <b-form-group label="Invoice Amount" label-for="invoiceAmount">
              <b-form-input id="invoiceAmount" type="text" :state="chkState('invoiceAmount')" v-model.lazy.trim="$v.form.invoiceAmount.$model" aria-describedby="liveFeedbackInvoiceAmount" placeholder="Invoice Amount" autofocus />
              <b-form-invalid-feedback id="liveFeedbackInvoiceAmount">
                This is a required field
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Receipt" label-for="invoiceImage">
              <vue-base64-file-upload v-for="(file, index) in files" :key="index" :fileId="file.id"accept="image/png,image/jpeg,application/pdf" image-class="img-thumbnail" input-class="form-control" placeholder="Click here to upload the receipt"
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
  distributor: null,
  invoiceAmount: "",
}

export default {
  name: "InvoiceFormAdd",
  props: {
    store: Object
  },
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
      distributor: {
        required
      },
      invoiceAmount: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true
          let params = {
            storeId: this.store.value,
            distributorId: this.$v.form.distributor.$model.value,
            deliveryDate: this.$moment().format('YYYY-MM-DD'),
            dueDate: this.$moment().format('YYYY-MM-DD'),
            invoiceAmount: this.$v.form.invoiceAmount.$model,
            invoiceNumber: this.createUniqueId(),
            comments: 'added via closeshift',
            files: this.files,
            pending: 'No'
          }

          this.$store.dispatch('invoices/addInvoice', params)
            .then((response) => {
              this.$emit('success', response.data)
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
