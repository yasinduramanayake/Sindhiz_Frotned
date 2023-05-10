<template>
  <div className="animated">
    <b-card>
      <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="knowledgeBases"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady"
      >
      </ag-grid-vue>
    </b-card>
    <div>
      <b-modal
        size="lg"
        ref="modalDetails"
        title="File Preview"
        hide-footer
        @hide="hideKnowledgeBaseDetails"
        no-enforce-focus
      >
        <file-preview
          v-if="selectedKnowledgeBase"
          :knowledgeBase="selectedKnowledgeBase"
        />
      </b-modal>
    </div>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import { mapState } from "vuex";
import GridButtons from "../GridButtons";
import MyKnowledgeBaseActions from "./MyKnowledgeBaseActions";
import FilePreview from "./FilePreview";

export default {
  name: "MyKnowledgeBase",
  components: {
    AgGridVue,
    GridButtons,
    MyKnowledgeBaseActions,
    FilePreview
  },
  computed: mapState({
    knowledgeBases: state => state.knowledgeBases.myKnowledgeBases
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
          filter: "agTextColumnFilter",
          minWidth: 80
        },
        columnDefs: [
          {
            headerName: "Name",
            field: "name",
            minWidth: 100
          },
          {
            headerName: "Created By",
            field: "created_by.staffname",
            minWidth: 80
          },
          {
            headerName: "Assigned Groups",
            field: "role.name",
            minWidth: 100,
            cellRenderer: function(params) {
              let roles = [];
              _.each(params.data.roles, role => {
                roles.push(role.name);
              });
              return _.join(roles, ", ");
            }
          },
          {
            headerName: "Actions",
            cellRendererFramework: "MyKnowledgeBaseActions",
            filter: null,
            minWidth: 100
          }
        ]
      },
      canShowAddKnowledgeBase: false,
      selectedKnowledgeBase: null
    };
  },
  methods: {
    exportParams() {
      return {
        fileName:
          "MerchantPulseKnowledgeBase_" + this.$moment().format("YYYY-MM-DD"),
        columnKeys: ["name", "created_by.staffname", "role.name"],
        allColumns: true
      };
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    },
    showDetailsModal(knowledgeBase) {
      this.selectedKnowledgeBase = knowledgeBase;
      this.$refs.modalDetails.show();
    },
    hideKnowledgeBaseDetails() {
      this.selectedKnowledgeBase = null;
    }
  },
  created() {
    this.$store.dispatch("knowledgeBases/getMyKnowledgeBases");
  }
};
</script>
