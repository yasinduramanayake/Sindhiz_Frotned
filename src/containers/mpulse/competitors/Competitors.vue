<template>
<div className="animated">
  <b-card>
    <b-button-toolbar class="pull-right">
      <b-btn variant="primary" @click="showAddCompetitor">Add Competitor</b-btn>
    </b-button-toolbar>
  </b-card>
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="competitors" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalAddCompetitor" title="Add Competitor" hide-footer @hide="hideAddCompetitor" no-enforce-focus>
      <Competitor-form-add v-if="canShowAddCompetitor" @success="addCompetitorSuccess" @cancel="cancelAddCompetitor" />
    </b-modal>
    <b-modal ref="modalEditCompetitor" title="Edit Competitor" hide-footer @hide="hideEditCompetitor" no-enforce-focus>
      <Competitor-form-edit v-if="selectedCompetitor" :competitor="selectedCompetitor" @success="editCompetitorSuccess" @cancel="cancelEditCompetitor" />
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
import CompetitorActions from './CompetitorActions'
import CompetitorFormAdd from './CompetitorFormAdd'
import CompetitorFormEdit from './CompetitorFormEdit'

export default {
  name: 'Competitors',
  components: {
    AgGridVue,
    GridButtons,
    CompetitorActions,
    CompetitorFormAdd,
    CompetitorFormEdit
  },
  computed: mapState({
    competitors: state => state.competitors.all
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
        columnDefs: [
          {
            headerName: 'Competitor Name',
            field: 'competitorname',
            minWidth: 120
          },
          {
            headerName: 'Actions',
            cellRendererFramework: 'CompetitorActions',
            filter: null
          }
        ],
      },
      canShowAddCompetitor: false,
      selectedCompetitor: null,
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulseCompetitor_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': [ 'competitorname'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showAddCompetitor() {
      this.canShowAddCompetitor = true
      this.$refs.modalAddCompetitor.show()
    },
    cancelAddCompetitor() {
      this.$refs.modalAddCompetitor.hide()
    },
    addCompetitorSuccess() {
      this.$refs.modalAddCompetitor.hide()
      this.$store.dispatch('competitors/getCompetitors')
    },
    hideAddCompetitor() {
      this.canShowAddCompetitor = false
    },
    showEditModal(Competitor) {
      this.selectedCompetitor = Competitor
      this.$refs.modalEditCompetitor.show()
    },
    editCompetitorSuccess() {
      this.$refs.modalEditCompetitor.hide()
      this.$store.dispatch('competitors/getCompetitors')
    },
    cancelEditCompetitor() {
      this.$refs.modalEditCompetitor.hide()
    },
    hideEditCompetitor() {
      this.selectedCompetitor= null
    },
  },
  created() {
    this.$store.dispatch('competitors/getCompetitors')
  }
};
</script>
