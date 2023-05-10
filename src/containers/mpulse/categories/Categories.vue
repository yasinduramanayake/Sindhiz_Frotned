<template>
<div className="animated">
  <b-card>
    <b-button-toolbar class="pull-right">
      <b-btn variant="primary" @click="showAddCategory">Add Category</b-btn>
    </b-button-toolbar>
  </b-card>
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="categories" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalAddCategory" title="Add Category" hide-footer @hide="hideAddCategory" no-enforce-focus>
      <category-form-add v-if="canShowAddCategory" @success="addCategorySuccess" @cancel="cancelAddCategory" />
    </b-modal>
    <b-modal ref="modalEditCategory" title="Edit Category" hide-footer @hide="hideEditCategory" no-enforce-focus>
      <category-form-edit v-if="selectedCategory" :category="selectedCategory" @success="editCategorySuccess" @cancel="cancelEditCategory" />
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
import GridButtons from '../GridButtons'
import CategoryActions from './CategoryActions'
import CategoryFormAdd from './CategoryFormAdd'
import CategoryFormEdit from './CategoryFormEdit'

export default {
  name: 'Categories',
  components: {
    AgGridVue,
    GridButtons,
    CategoryActions,
    CategoryFormAdd,
    CategoryFormEdit
  },
  computed: mapState({
    categories: state => state.categories.all
  }),
  data: function() {
    return {
      gridOptions: {
        context: {
          componentParent: this
        },
        defaultColDef: {
          sortable: true,
          resizable: true,
          filter: 'agTextColumnFilter',
          minWidth: 100
        },
        columnDefs: [{
            headerName: 'Category ID',
            field: 'categoryid',
            minWidth: 120
          },
          {
            headerName: 'Category Name',
            field: 'categoryname',
            minWidth: 120
          },
          {
            headerName: 'Est Profit',
            field: 'estprofit'
          },
          {
            headerName: 'Is Visible',
            field: 'isvisible',
            cellRenderer: function(params) {
              return params.data.isvisible ? 'Yes' : 'No'
            }
          },
          {
            headerName: 'Is Active',
            field: 'isactive',
            cellRenderer: function(params) {
              return params.data.isactive ? 'Yes' : 'No'
            }
          },
          {
            headerName: 'Product Count',
            field: 'countproduct'
          },
          {
            headerName: 'Actions',
            cellRendererFramework: 'CategoryActions',
            filter: null
          }
        ],
      },
      canShowAddCategory: false,
      selectedCategory: null,
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulseCategories_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': ['categoryid', 'categoryname', 'estprofit', 'isvisible', 'isactive', 'countproduct'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showAddCategory() {
      this.canShowAddCategory = true
      this.$refs.modalAddCategory.show()
    },
    cancelAddCategory() {
      this.$refs.modalAddCategory.hide()
    },
    addCategorySuccess() {
      this.$refs.modalAddCategory.hide()
      this.$store.dispatch('categories/getAllCategories')
    },
    hideAddCategory() {
      this.canShowAddCategory = false
    },
    showEditModal(category) {
      this.selectedCategory = category
      this.$refs.modalEditCategory.show()
    },
    editCategorySuccess() {
      this.$refs.modalEditCategory.hide()
      this.$store.dispatch('categories/getAllCategories')
    },
    cancelEditCategory() {
      this.$refs.modalEditCategory.hide()
    },
    hideEditCategory() {
      this.selectedCategory = null
    },
    showPermissionModal(category) {
      this.selectedCategoryPermissions = category
      this.$refs.modalCategoryPermission.show()
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories')
  }
};
</script>
