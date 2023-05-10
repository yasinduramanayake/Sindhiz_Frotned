<template>
<div className="animated">
  <b-card v-if="$auth.check('edit-task')">
    <b-button-toolbar class="pull-right">
      <b-btn variant="primary" @click="showAddTask">Add Task</b-btn>
    </b-button-toolbar>
  </b-card>
  <b-card>
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="tasks" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <div>
    <b-modal ref="modalAddTask" title="Add Task" hide-footer @hide="hideAddTask" no-enforce-focus>
      <task-form-add v-if="canShowAddTask" @success="addTaskSuccess" @cancel="cancelAddTask" />
    </b-modal>
    <b-modal ref="modalEditTask" title="Update Task" hide-footer @hide="hideEditTask" no-enforce-focus>
      <task-form-edit v-if="selectedTask" :task="selectedTask" @success="editTaskSuccess" @cancel="cancelEditTask" />
    </b-modal>
    <b-modal ref="modalDetails" title="Task Details" hide-footer @hide="hideTaskDetails" no-enforce-focus>
      <task-details v-if="selectedTask" :task="selectedTask" />
    </b-modal>
    <b-modal ref="modalDelete" title="Delete Task" @ok="deleteTask" @hide="hideDeleteModal" no-enforce-focus>
      <div v-if="selectedTask" class="d-block text-center">
        <h4>Are you sure you want to delete this task?</h4>
        <table class="table">
          <tr>
            <td>Task Name</td>
            <td>{{selectedTask.task_name}}</td>
          </tr>
          <tr>
            <td>Task Description</td>
            <td>{{selectedTask.task_description}}</td>
          </tr>
        </table>
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
import TaskActions from './TaskActions'
import TaskFormAdd from './TaskFormAdd'
import TaskFormEdit from './TaskFormEdit'
import TaskDetails from './TaskDetails'

export default {
  name: 'Tasks',
  components: {
    AgGridVue,
    GridButtons,
    TaskActions,
    TaskFormAdd,
    TaskFormEdit,
    TaskDetails
  },
  computed: mapState({
    tasks: state => state.tasks.all
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
            headerName: 'store',
            field: 'store.storename',
            minWidth: 100
          },
          {
            headerName: 'Created By',
            field: 'created_by.staffname',
            minWidth: 100
          },
          {
            headerName: 'Assigned Group',
            field: 'role.name',
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
            cellRendererFramework: 'TaskActions',
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
        'fileName': 'MerchantPulseTasks_' + this.$moment().format('YYYY-MM-DD'),
        'columnKeys': ['task_name', 'task_description', 'created_by.staffname', 'assigned_to.staffname', 'due_date', 'status'],
        'allColumns': true
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    showAddTask() {
      this.canShowAddTask = true
      this.$refs.modalAddTask.show()
    },
    cancelAddTask() {
      this.$refs.modalAddTask.hide()
    },
    addTaskSuccess() {
      this.$refs.modalAddTask.hide()
      this.$store.dispatch('tasks/getTasks')
    },
    hideAddTask() {
      this.canShowAddTask = false
    },
    showUpdateModal(task) {
      this.selectedTask = task
      this.$refs.modalEditTask.show()
    },
    editTaskSuccess() {
      this.$refs.modalEditTask.hide()
      this.$store.dispatch('tasks/getTasks')
    },
    cancelEditTask() {
      this.$refs.modalEditTask.hide()
    },
    hideEditTask() {
      this.selectedTask = null
    },
    showDetailsModal(task) {
      this.selectedTask = task
      this.$refs.modalDetails.show()
    },
    hideTaskDetails() {
      this.selectedTask = null
    },
    showDeleteModal(task) {
      this.selectedTask = task
      this.$refs.modalDelete.show()
    },
    hideDeleteModal() {
      this.selectedTask = null
    },
    deleteTask() {
      this.$store.dispatch('tasks/deleteTask', {taskId: this.selectedTask.taskid})
        .then(() => {
          this.$store.dispatch('tasks/getTasks')
          this.showSuccessMsg()
        })
        .catch((error) => {
          this.showErrorMsg()
        })
    }
  },
  created() {
    this.$store.dispatch('tasks/getTasks')
  }
}
</script>
