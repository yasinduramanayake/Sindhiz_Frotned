<template>
<div className="animated">
  <b-card>
    <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
      <b-form-group label="Search Products" label-cols-sm="2">
        <b-input-group>
          <b-form-input type="text" id="searchTerm" :state="chkState('searchTerm')" v-model.lazy.trim="$v.form.searchTerm.$model" aria-describedby="liveFeedbackSearch" autofocus placeholder="Search by Barcode, Product Name, Category"></b-form-input>

          <!-- Attach Left button -->
          <b-input-group-prepend>
            <b-button type="submit" :disabled="$v.form.$invalid">
              <i class="fa fa-search"></i> Search
            </b-button>
          </b-input-group-prepend>
          <b-form-invalid-feedback id="liveFeedbackSearch">
            This field must be at least 3 characters.
          </b-form-invalid-feedback>
        </b-input-group>
      </b-form-group>
    </b-form>
  </b-card>
  <b-card>
    <b-row>
      <b-col>
        <b-table id="prductTable"
                 :items="products"
                 :fields="fields"
                 :small="true"
                 responsive
                 caption-top
                 selectable
                 @row-clicked="onRowClicked"
                 @row-selected="onRowSelected"
                 select-mode="single">
                 <template #cell(actions)="data">
                   <b-btn size="sm" variant="outline-primary" @click="deleteProduct(data.index)" class="mr-1">Remove</b-btn>
               </template>
        </b-table>
      </b-col>
    </b-row>
  </b-card>
  <b-card>
    <b-row>
      <b-col>
        <b-button type="submit" :disabled="$v.form.$invalid || products.length == 0" @click="saveProducts">
           Submit
        </b-button>
      </b-col>
      <b-col>
        <b-button type="reset" @click="resetProducts">
          Reset
        </b-button>
      </b-col>
    </b-row>
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
  required,
  minLength
} from "vuelidate/lib/validators"
import {
  Switch as cSwitch
} from '@coreui/vue'
const formShape = {
  searchTerm: "",
}
export default {
  name: 'InHouseProducts',
  components: {
  },
  props: {
    storeid: {
      type: Number,
      default: "56"
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
  watch: {
  },
  data: function() {
    return {
      form: Object.assign({}, formShape),
      products: [],
      selectedIndex: -1,
      fields: [
        { key: 'barcode', label: 'Barcode' },
        { key: 'productname', label: 'Product Name' },
        {key: 'actions', label: 'Actions'}

      ],

    }
  },
  validations: {
    form: {
      searchTerm: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    deleteProduct(index){
      this.products.splice(index,1);
    },
    resetProducts(){
      this.products.splice(0);
      this.selectedIndex = -1
    },
    onRowSelected(items) {
      if (items == null || items.length == 0) {
        this.selectedIndex = -1
      }
    },
    onRowClicked(item, index, event) {
      this.selectedIndex = index
    },
    saveProducts(){
      if(this.products.length > 0){
          this.$nextTick(() => {
            let params = {
              products: this.products,
              storeid: this.storeid
            }
            this.$store
            .dispatch('products/storeInhouseProducts', params)
            .then(response => {
              if (response.data.success == false) {
                this.showErrorMsg({
                  message: response.data.error
                })
              }
              else{
                this.showSuccessMsg({
                  message: 'Record saved successfully.'
                });
                this.resetProducts();
                this.$emit('success');
              }
            })
            .catch(error => {

              if (error.response.status == 400) {
                this.showErrorMsg({
                  message: error.response.data.message
                })
              } else if (error.response.status == 422) {
                this.showErrorMsg({
                  message: error.response.data.message
                })
              } else {
                this.showErrorMsg({ message: 'Something went wrong. Please contact administrator.' })
              }
              this.submitted = false;
            })

          });

      }
    },
    onSubmit(data) {
      if (this.validate()) {
        this.$nextTick(() => {
          //this.submitted = true
          this.searchProduct = data
          let params = {
            searchTerm: this.$v.form.searchTerm.$model,
            searchType: 'inhouse',
            searchLimit: 1,
            storeid: this.storeid
          }
          this.$store
          .dispatch('search/getInhouseProductBySearch', params)
          .then(response => {
            if (response.data.success == false) {
              this.showErrorMsg({
                message: response.data.error
              })
            } else {
              if(response.data != null && response.data.length > 0){
                this.showSuccessMsg({
                  message: 'Record Found successfully.'
                });
                response.data.forEach((value, index) => {
                    let prd = value;
                    prd['qty'] = 0;
                    this.products.push(prd);

                }, this);

              }
              else{
                this.showErrorMsg({
                  message: 'No record found with given barcode.'
                });
              }

            }
          })
          .catch(error => {
            console.log(error);
            if (error.response.status == 400) {
              this.showErrorMsg({
                message: error.response.data.message
              })
            } else if (error.response.status == 422) {
              this.showErrorMsg({
                message: error.response.data.message
              })
            } else {
              this.showErrorMsg({ message: 'Something went wrong. Please contact administrator.' })
            }
            this.submitted = false;
          })

        })
      }
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
      const found = this.products.find(function(value, index) {

        if(value.barcode ==   this.$v.form.searchTerm.$model){
          return true;
        }
      },this);

      if(found){
        this.showErrorMsg({ message: 'Barcode already scanned.' });
        return false;
      }

      this.$v.$touch()
      this.$nextTick(() => this.findFirstError())
      return this.isValid
    },
    exportNameFn() {
      return this.searchProduct ? 'MerchantPulse_GlobalProducts' + this.$moment().format('YYYY-MM-DD') + '_' + this.searchProduct.label : ''
    },

  },
  created() {
  },
  beforeMount() {
    this.$store.dispatch('search/clear')
  }
};
</script>

<style >
.btn.disabled {
  cursor: auto;
}

@media(max-width:480px) {
  .button-res .btn-primary {
    display: block;
    margin: 5px 0;
    width: 100%;
  }
}
</style>
