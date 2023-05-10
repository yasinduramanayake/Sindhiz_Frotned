<template>
<div className="animated">
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="tasks" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalDetails" title="Task Details" hide-footer @hide="hideTaskDetails" size="lg" no-enforce-focus>
      <task-details v-if="selectedTask" :task="selectedTask" />
    </b-modal>
    <b-modal ref="modalResolve" title="Task Resolution" hide-footer @hide="hideTaskResolve" size="lg" no-enforce-focus>
      <task-resolve v-if="selectedTask" :task="selectedTask" @success="resolveTaskSuccess" @cancel="cancelResolveTask" />
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
import MyTaskActions from './MyTaskActions'
import TaskResolve from './TaskResolve'
import TaskDetails from './TaskDetails'

export default {
  name: 'Tasks',
  components: {
    AgGridVue,
    GridButtons,
    MyTaskActions,
    TaskResolve,
    TaskDetails
  },
  computed: mapState({
    tasks: state => state.tasks.myTasks
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
            headerName: 'Task Name',
            field: 'task_name',
            minWidth: 120
          },
          {
            headerName: 'Created By',
            field: 'created_by.staffname',
            minWidth: 100
          },
          {
            headerName: 'Assigned To',
            field: 'assigned_to.staffname',
            minWidth: 100
          },
          {
            headerName: 'Due Date',
            field: 'due_date',
            minWidth: 80
          },
          {
            headerName: 'Status',
            field: 'status',
            minWidth: 80
          },
          {
            headerName: 'Updated By',
            field: 'updated_by.staffname',
            minWidth: 100
          },
          {
            headerName: 'Actions',
            cellRendererFramework: 'MyTaskActions',
            filter: null
          }
        ],
      },
      canShowAddTask: false,
      selectedTask: null,
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulseMyTasks_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': ['task_name', 'task_description', 'created_by.staffname', 'assigned_to.staffname', 'due_date', 'status'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showDetailsModal(task) {
      this.selectedTask = task
      this.$refs.modalDetails.show()
    },
    hideTaskDetails() {
      this.selectedTask = null
    },
    showResolveModal(task) {
      this.selectedTask = task
      this.$refs.modalResolve.show()
    },
    resolveTaskSuccess() {
      this.$refs.modalResolve.hide()
      this.$store.dispatch('tasks/getMyTasks')
    },
    cancelResolveTask() {
      this.$refs.modalResolve.hide()
    },
    hideTaskResolve() {
      this.selectedTask = null
    }
  },
  created() {
    this.$store.dispatch('tasks/getMyTasks')
  }
};
</script>
