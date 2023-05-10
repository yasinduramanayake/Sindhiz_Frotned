<template>
  <div className="animated">
    <b-card>
      <b-button-toolbar class="pull-right">
        <b-btn variant="primary" @click="showAddTraining">Add Training</b-btn>
      </b-button-toolbar>
    </b-card>
    <b-card>
      <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
      <ag-grid-vue
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="trainings"
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
        ref="modalAddTraining"
        title="Add Training"
        hide-footer
        @hide="hideAddTraining"
        size="lg"
        no-enforce-focus
      >
        <training-form-add
          v-if="canShowAddTraining"
          @success="addTrainingSuccess"
          @cancel="cancelAddTraining"
        />
      </b-modal>
      <b-modal
        ref="modalEditTraining"
        title="Edit Training"
        hide-footer
        @hide="hideEditTraining"
        size="lg"
        no-enforce-focus
      >
        <training-form-edit
          v-if="selectedTraining"
          :training="selectedTraining"
          @success="editTrainingSuccess"
          @cancel="cancelEditTraining"
        />
      </b-modal>
      <b-modal
        ref="modalViewTrainingReport"
        title="View Report"
        hide-footer
        size="lg"
        @hide="hideViewTrainingReport"
        no-enforce-focus
      >
        <training-report-view
          v-if="selectedTraining"
          :trainingid="selectedTraining.id"
        />
      </b-modal>
      <b-modal
        ref="modalDelete"
        title="Delete File"
        @ok="deleteKnowledgeBase"
        @hide="hideDeleteModal"
        no-enforce-focus
      >
        <div v-if="selectedTraining" class="d-block text-center">
          <h4>
            Are you sure you want to delete this training:
            {{ selectedTraining.name }}?
          </h4>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import { mapState } from "vuex";
import GridButtons from "../GridButtons";
import TrainingActions from "./TrainingActions";
import TrainingFormAdd from "./TrainingFormAdd";
import TrainingFormEdit from "./TrainingFormEdit";
import TrainingReportView from "./TrainingReportView";

export default {
  name: "Trainings",
  components: {
    AgGridVue,
    GridButtons,
    TrainingActions,
    TrainingFormAdd,
    TrainingFormEdit,
    TrainingReportView
  },
  computed: mapState({
    trainings: state => state.trainings.all
  }),
  data: function() {
    return {
      gridOptions: {
        context: {
          componentParent: this
        },
        defaultColDef: {
          sortable: true,
          resizable: true
        },
        columnDefs: [
          {
            headerName: "Name",
            field: "name",
            filter: "agTextColumnFilter",
            minWidth: 150
          },
          {
            headerName: "Training Type",
            field: "training_type.trainingtypename",
            filter: "agTextColumnFilter",
            minWidth: 120
          },
          {
            headerName: "Assigned Role(s)",
            field: "roles",
            filter: "agTextColumnFilter",
            minWidth: 200,
            cellRenderer: function(params) {
              return _.map(params.data.roles, role => role.name).join(", ");
            }
          },
          {
            headerName: "Added By",
            field: "fullname",
            filter: "agTextColumnFilter",
            minWidth: 150
          },
          {
            headerName: "Updated at",
            field: "updated_at",
            filter: "agTextColumnFilter",
            minWidth: 150
          },
          {
            headerName: "Actions",
            field: "id",
            minWidth: 80,
            cellRendererFramework: "TrainingActions"
          }
        ]
      },
      canShowAddTraining: false,
      selectedTraining: null
    };
  },
  methods: {
    exportParams() {
      return {
        fileName:
          "MerchantPulseTrainings_" + this.$moment().format("YYYY-MM-DD"),
        columnKeys: ["name", "roles", "updated_at", "fullname"],
        processCellCallback: function(params) {
          if (_.isArray(params.value)) {
            return _.map(params.value, role => role.name).join(", ");
          }
          return params.value;
        }
      };
    },
    showViewTrainingReport(data) {
      this.selectedTraining = data;
      this.$refs.modalViewTrainingReport.show();
    },
    hideViewTrainingReport() {
      this.selectedTraining = null;
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    },
    showAddTraining() {
      this.canShowAddTraining = true;
      this.$refs.modalAddTraining.show();
    },
    cancelAddTraining() {
      this.$refs.modalAddTraining.hide();
    },
    addTrainingSuccess() {
      this.$refs.modalAddTraining.hide();
      this.$store.dispatch("trainings/getTrainings");
    },
    hideAddTraining() {
      this.canShowAddTraining = false;
    },
    showEditModal(promotion) {
      this.selectedTraining = promotion;
      this.$refs.modalEditTraining.show();
    },
    editTrainingSuccess() {
      this.$refs.modalEditTraining.hide();
      this.$store.dispatch("trainings/getTrainings");
    },
    cancelEditTraining() {
      this.$refs.modalEditTraining.hide();
    },
    hideEditTraining() {
      this.selectedTraining = null;
    },
    showDeleteModal(knowledgeBase) {
      this.selectedTraining = knowledgeBase;
      this.$refs.modalDelete.show();
    },
    hideDeleteModal() {
      this.selectedTraining = null;
    },
    deleteKnowledgeBase() {
      this.$store
        .dispatch("trainings/deleteTraining", {
          id: this.selectedTraining.id
        })
        .then(() => {
          this.$store.dispatch("trainings/getTrainings");
          this.showSuccessMsg();
        })
        .catch(error => {
          this.showErrorMsg();
        });
    }
  },
  created() {
    this.$store.dispatch("trainings/getTrainings");
    this.$store.dispatch("roles/getRoles");
  },
  beforeMount() {
    this.$store.dispatch("trainings/clear");
  }
};
</script>
