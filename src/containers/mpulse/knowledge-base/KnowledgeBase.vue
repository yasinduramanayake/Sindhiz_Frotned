<template>
<div className="animated">
  <b-card>
    <b-button-toolbar class="pull-right">
      <b-btn variant="primary" @click="showAddKnowledgeBase">Add File</b-btn>
    </b-button-toolbar>
  </b-card>
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="knowledgeBases" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalAddKnowledgeBase" title="Add File" hide-footer @hide="hideAddKnowledgeBase" no-enforce-focus>
      <knowledge-base-form-add v-if="canShowAddKnowledgeBase" @success="addKnowledgeBaseSuccess" @cancel="cancelAddKnowledgeBase" />
    </b-modal>
    <b-modal size="lg" ref="modalDetails" title="File Preview" hide-footer @hide="hideKnowledgeBaseDetails" no-enforce-focus>
      <file-preview v-if="selectedKnowledgeBase" :knowledgeBase="selectedKnowledgeBase" />
    </b-modal>
    <b-modal ref="modalDelete" title="Delete File" @ok="deleteKnowledgeBase" @hide="hideDeleteModal" no-enforce-focus>
      <div v-if="selectedKnowledgeBase" class="d-block text-center">
        <h4>Are you sure you want to delete this file: {{selectedKnowledgeBase.name}}?</h4>
      </div>
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
  mapState
} from 'vuex'
import GridButtons from '../GridButtons'
import KnowledgeBaseActions from './KnowledgeBaseActions'
import KnowledgeBaseFormAdd from './KnowledgeBaseFormAdd'
import FilePreview from './FilePreview'

export default {
  name: 'KnowledgeBase',
  components: {
    AgGridVue,
    GridButtons,
    KnowledgeBaseActions,
    KnowledgeBaseFormAdd,
    FilePreview
  },
  computed: mapState({
    knowledgeBases: state => state.knowledgeBases.all
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
          minWidth: 80
        },
        columnDefs: [{
            headerName: 'Name',
            field: 'name',
            minWidth: 100
          },
          {
            headerName: 'Created By',
            field: 'created_by.staffname',
            minWidth: 80
          },
          {
            headerName: 'Assigned Groups',
            field: 'role.name',
            minWidth: 100,
            cellRenderer: function(params) {
              let roles = [];
              _.each(params.data.roles, (role) => {
                roles.push(role.name);
              })
              return _.join(roles, ', ');
            }
          },
          {
            headerName: 'Actions',
            cellRendererFramework: 'KnowledgeBaseActions',
            filter: null,
            minWidth: 100
          }
        ],
      },
      canShowAddKnowledgeBase: false,
      selectedKnowledgeBase: null,
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulseKnowledgeBases_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': ['name', 'created_by.staffname', 'role.name'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showAddKnowledgeBase() {
      this.canShowAddKnowledgeBase = true
      this.$refs.modalAddKnowledgeBase.show()
    },
    cancelAddKnowledgeBase() {
      this.$refs.modalAddKnowledgeBase.hide()
    },
    addKnowledgeBaseSuccess() {
      this.$refs.modalAddKnowledgeBase.hide()
      this.$store.dispatch('knowledgeBases/getKnowledgeBases')
    },
    hideAddKnowledgeBase() {
      this.canShowAddKnowledgeBase = false
    },
    showDetailsModal(knowledgeBase) {
      this.selectedKnowledgeBase = knowledgeBase
      this.$refs.modalDetails.show()
    },
    hideKnowledgeBaseDetails() {
      this.selectedKnowledgeBase = null
    },
    showDeleteModal(knowledgeBase) {
      this.selectedKnowledgeBase = knowledgeBase
      this.$refs.modalDelete.show()
    },
    hideDeleteModal() {
      this.selectedKnowledgeBase = null
    },
    deleteKnowledgeBase() {
      this.$store.dispatch('knowledgeBases/deleteKnowledgeBase', {id: this.selectedKnowledgeBase.id})
        .then(() => {
          this.$store.dispatch('knowledgeBases/getKnowledgeBases')
          this.showSuccessMsg()
        })
        .catch((error) => {
          this.showErrorMsg()
        })
    }
  },
  created() {
    this.$store.dispatch('knowledgeBases/getKnowledgeBases')
  }
}
</script>
