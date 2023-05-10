<template>
<div className="animated">
  <b-card>
    <b-button-toolbar class="pull-right">
      <b-btn variant="primary" @click="showAddSubCategory">Add Sub Category</b-btn>
    </b-button-toolbar>
  </b-card>
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="subcategories" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalAddSubCategory" title="Add SubCategory" hide-footer @hide="hideAddSubCategory" no-enforce-focus>
      <sub-category-form-add v-if="canShowAddSubCategory" @success="addSubCategorySuccess" @cancel="cancelAddSubCategory" />
    </b-modal>
    <b-modal ref="modalEditSubCategory" title="Edit SubCategory" hide-footer @hide="hideEditSubCategory" no-enforce-focus>
      <sub-category-form-edit v-if="selectedSubCategory" :subcategory="selectedSubCategory" @success="editSubCategorySuccess" @cancel="cancelEditSubCategory" />
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
import SubCategoryFormEdit from './SubCategoryFormEdit'
import SubCategoryFormAdd from './SubCategoryFormAdd'

export default {
  name: 'SubCategories',
  components: {
    AgGridVue,
    GridButtons,
    CategoryActions,
    SubCategoryFormEdit,
    SubCategoryFormAdd
  },
  computed: mapState({
    subcategories: state => state.categories.subcategories
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
            headerName: 'Sub Category',
            field: 'subcat',
            minWidth: 120
          },
          {
            headerName: 'Sub Category Name',
            field: 'subcat_name',
            minWidth: 120
          },

          {
            headerName: 'Actions',
            cellRendererFramework: 'CategoryActions',
            filter: null
          }
        ],
      },
      selectedSubCategory: null,
      canShowAddSubCategory: false
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulseSubCategories_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': ['subcat', 'subcat_name'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    hideAddSubCategory() {
      this.canShowAddSubCategory = false
    },
    showAddSubCategory() {
      this.canShowAddSubCategory = true
      this.$refs.modalAddSubCategory.show()
    },
    addSubCategorySuccess() {
      this.$refs.modalAddSubCategory.hide()
      this.$store.dispatch('categories/getAllSubCategories')
    },
    cancelAddSubCategory() {
      this.$refs.canShowAddSubCategory.hide()
    },
    showEditModal(subcategory) {
      this.selectedSubCategory = subcategory
      this.$refs.modalEditSubCategory.show()
    },
    editSubCategorySuccess() {
      this.$refs.modalEditSubCategory.hide()
      this.$store.dispatch('categories/getAllSubCategories')
    },
    cancelEditSubCategory() {
      this.$refs.modalEditSubCategory.hide()
    },
    hideEditSubCategory() {
      this.selectedSubCategory = null
    },
  },
  created() {
    this.$store.dispatch('categories/getAllSubCategories')
  }
};
</script>
