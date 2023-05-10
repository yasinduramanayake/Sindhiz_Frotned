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
    <b-button-toolbar class="pull-right button-res">
      <b-button variant="primary" class="mr-1" @click="showAddProduct">Add Product</b-button>
    </b-button-toolbar>
  </b-card>
  <b-card>
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="productBySearch" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalAddProduct" title="Add Product" hide-footer no-enforce-focus>
      <product-form-add v-if="canShowAddProduct" @success="addProductSuccess" @cancel="cancelAddProduct" />
    </b-modal>
    <b-modal ref="modalEditProduct" title="Edit Product" hide-footer @hide="hideEditProduct" no-enforce-focus>
      <product-form-edit v-if="selectedProduct" :product="selectedProduct" @success="editProductSuccess" @cancel="cancelEditProduct" />
    </b-modal>
    <b-modal ref="modalSetStorePrice" title="Set Store Price" hide-footer @hide="hideSetStorePrice" no-enforce-focus>
      <store-price v-if="selectedSetStorePrice" :product="selectedSetStorePrice" @success="saveSetStorePriceSuccess" @cancel="cancelSetStorePrice" />
    </b-modal>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import {
  AgGridVue
} from "ag-grid-vue";
import {
  mapState,
  mapActions
} from 'vuex'
import ProductFormAdd from './ProductFormAdd'
import ProductActions from './ProductActions'
import ProductFormEdit from './ProductFormEdit'
import StorePrice from './StorePrice'



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
  name: 'Products',
  components: {
    AgGridVue,
    ProductActions,
    ProductFormAdd,
    ProductFormEdit,
    StorePrice
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
    ...mapState({
      productBySearch: state => state.search.productBySearch,
      categories: state => state.categories.active,
      suppliers: state => state.suppliers.active,
      taxes: state => state.taxes.all
    })
  },
  watch: {
    categories: function(values) {
      this.categoryList = []
      Vue._.forEach(values, (category) => {
        this.categoryList.push({
          label: category.categoryname,
          value: category.categoryid
        })
      });
    },
    suppliers: function(values) {
      this.supplierList = []
      Vue._.forEach(values, (supplier) => {
        this.supplierList.push({
          label: supplier.suppliername,
          value: supplier.supplierid
        })
      });
    }
  },
  data: function() {
    return {
      form: Object.assign({}, formShape),
      //submitted: false,
      canShowAddProduct: false,
      searchProduct: null,
      selectedProduct: null,
      selectedSetStorePrice: null,
      categoryList: [],
      gridOptions: {
        context: {
          componentParent: this
        },
        rowClassRules: {
          'bg-success': function(params) {
            return params.data.pending === 'No'
          }
        },
        defaultColDef: {
          sortable: true,
          resizable: true
        },
        columnDefs: [{
            headerName: 'Bar Code',
            field: 'barcode',
            filter: 'agTextColumnFilter',
            minWidth: 120
          },
          {
            headerName: 'Category',
            field: 'categoryname',
            filter: 'agTextColumnFilter',
            minWidth: 120
          },
          {
            headerName: 'Product Name',
            field: 'productname',
            filter: 'agTextColumnFilter',
            minWidth: 120
          },
          {
            headerName: 'Supplier',
            field: 'suppliername',
            filter: 'agTextColumnFilter',
            minWidth: 120
          },
          {
            headerName: 'Cost',
            field: 'cost',
            filter: 'agTextColumnFilter',
            minWidth: 120
          },
          {
            headerName: 'Sale Price',
            field: 'saleprice',
            filter: 'agTextColumnFilter',
            minWidth: 100
          },
          {
            headerName: 'Active?',
            field: 'prdactive',
            filter: 'agTextColumnFilter',
            minWidth: 100
          },
          {
            headerName: 'Updated By',
            field: 'updated_by',
            filter: 'agTextColumnFilter',
            minWidth: 100
          },
          {
            headerName: 'Actions',
            field: 'productid',
            minWidth: 200,
            cellRendererFramework: 'ProductActions'
          }

        ],
      },
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
    onSubmit(data) {
      if (this.validate()) {
        this.$nextTick(() => {
          //this.submitted = true
          this.searchProduct = data
          let params = {
            searchTerm: this.$v.form.searchTerm.$model,
            searchType: 'local'
          }
          this.$store.dispatch('search/getProductBySearch', params)
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
      this.$v.$touch()
      this.$nextTick(() => this.findFirstError())
      return this.isValid
    },
    exportNameFn() {
      return this.searchProduct ? 'MerchantPulse_' + this.$moment().format('YYYY-MM-DD') + '_' + this.searchProduct.label : ''
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showAddProduct() {
      this.canShowAddProduct = true
      this.$refs.modalAddProduct.show()
    },
    cancelAddProduct() {
      this.canShowAddProduct = false
      this.$refs.modalAddProduct.hide()
    },
    addProductSuccess() {
      this.canShowAddProduct = false
      this.$refs.modalAddProduct.hide()
      if (this.searchProduct) {
        let params = {
          searchTerm: this.$v.form.searchTerm.$model,
          searchType: 'local'
        }
        this.$store.dispatch('search/getProductBySearch', params)
      }
    },
    showSetStorePriceModal(product) {
      this.selectedSetStorePrice = product
      this.$refs.modalSetStorePrice.show()
    },
    saveSetStorePriceSuccess() {
      this.$refs.modalSetStorePrice.hide()
    },
    cancelSetStorePrice() {
      this.$refs.modalSetStorePrice.hide()
    },
    hideSetStorePrice() {
      this.selectedSetStorePrice = null
    },
    showEditModal(product) {
      this.selectedProduct = product
      this.$refs.modalEditProduct.show()
    },
    editProductSuccess() {
      this.$refs.modalEditProduct.hide()
      let params = {
        searchTerm: this.$v.form.searchTerm.$model,
        searchType: 'local'
      }
      this.$store.dispatch('search/getProductBySearch', params)
    },
    cancelEditProduct() {
      this.$refs.modalEditProduct.hide()
    },
    hideEditProduct() {
      this.selectedProduct = null
    },
  },
  created() {
    this.$store.dispatch('suppliers/getActiveSuppliers')
    this.$store.dispatch('taxes/getTaxes')
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
