<template>
  <div class="animated fadeIn">

    <b-card-group deck>
      <b-card header="Welcome to Sindhiz Online">
        <b-card-body>
          Hello, {{ $auth.user().firstname }}!
          <b-card-text>
            <div class="mt-3">
              <b-btn variant="primary" @click="showLastShiftClose" tag="button" class="mr-1">Last Shift Close</b-btn>
            </div>
          </b-card-text>

        </b-card-body>
      </b-card>
      <b-card header="Assigned Tasks">
        <b-card-body :class="notResolvedTasks.length > 0 ? 'bg-danger': 'bg-success'">
          <span v-if="notResolvedTasks.length == 0">No assigned, pending or feedback tasks!</span>
          <div v-if="notResolvedTasks.length > 0">
            <b-card-text>
              <li v-if="assignedTasks">You have {{assignedTasks}} assigned task(s)</li>
              <li v-if="pendingTasks">You have {{pendingTasks}} pending task(s)</li>
              <li v-if="feedbackTasks">You have {{feedbackTasks}} feedback task(s)</li>
            </b-card-text>
            <b-btn class="mr-1" variant="primary" :to="{name: 'My Tasks'}" tag="button">View</b-btn>
          </div>
        </b-card-body>
      </b-card>

      <b-card header="Tasks">
        <b-card-body >
          <div>
            <b-btn variant="primary" @click="showAddTask" tag="button" class="mr-1">Add Task</b-btn>
            <b-btn variant="success" :to="{name: 'Manage Tasks'}" tag="button">Manage Tasks</b-btn>
          </div>
        </b-card-body>
      </b-card>
      <b-card header="Trainings" v-if="isTrainingLoaded">
        <b-card-body :class="pendingTrainings.length > 0 ? 'bg-danger': 'bg-success'">
          <span v-if="pendingTrainings.length == 0">You're Up to Date!</span>
          <div v-if="pendingTrainings.length > 0">
            <b-card-text>You have {{pendingTrainings.length}} Pending Training(s)</b-card-text>
            <b-btn variant="primary" :to="{name: 'Pending Trainings'}" tag="button">New</b-btn>
          </div>
          <div  class="mt-3">
            <b-btn   variant="primary" :to="{name: 'Display Trainings'}" tag="button">Old</b-btn>
          </div>
      </b-card-body>
      </b-card>
    </b-card-group>

    <div class="mt-3">
      <shortcut-tiles></shortcut-tiles>
    </div>

    <b-modal ref="modalAddTask" title="Add Task" hide-footer @hide="hideAddTask" no-enforce-focus>
      <task-form-add v-if="canShowAddTask" @success="addTaskSuccess" @cancel="cancelAddTask" />
    </b-modal>
    <div>
    <b-modal ref="modalLastShiftCloseView"
             title="Last Shift Details"
             hide-footer
             no-enforce-focus
             no-close-on-backdrop
             centered
             size="lg">
      <last-shift-close-view @success="acceptLastShiftCloseView" @cancel="cancelLastShiftCloseView"  />
    </b-modal>
  </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
import ShortcutTiles from './ShortcutTiles'
import TaskFormAdd from './mpulse/tasks/TaskFormAdd'
import LastShiftCloseView from './mpulse/closeshift/LastShiftCloseView'


export default {
  name: 'Dashboard',
  components: {
    ShortcutTiles,
    TaskFormAdd,
    LastShiftCloseView
  },
  computed: mapState({
    pendingTrainings: state => state.trainings.pendingTrainings,
    notResolvedTasks: state => state.tasks.notResolvedTasks
  }),
  watch: {
    notResolvedTasks: function(tasks) {
      this.assignedTasks =  0
      this.pendingTasks =  0
      this.feedbackTasks =  0
      _.each(tasks, (task) => {
        switch (task.status) {
          case 'assigned':
            this.assignedTasks++;
            break;
          case 'pending':
            this.pendingTasks++;
            break;
          case 'feedback':
            this.feedbackTasks++;
            break;
        }
      })
    }
  },
  data: () => {
    return {
      isTrainingLoaded: false,
      assignedTasks: 0,
      pendingTasks: 0,
      feedbackTasks:0,
      canShowAddTask: false,
    }
  },
  mounted() {
    // updated
    if (localStorage.new_employee_status === "new_employee") {
      this.$router.push("/newemployee");
    } else {
      this.$router.push("/dashboard");
    }
    // end update
  },
  methods: {
    showLastShiftClose(){
      this.$refs.modalLastShiftCloseView.show();
    },
    acceptLastShiftCloseView(){
      this.$refs.modalLastShiftCloseView.hide();
    },
    cancelLastShiftCloseView(){
      this.$refs.modalLastShiftCloseView.hide();
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
      this.$store.dispatch('tasks/getNotResolvedTasks')
    },
    hideAddTask() {
      this.canShowAddTask = false
    },
  },
  created() {
    this.$store.dispatch('trainings/getPendingTrainings').then(() => {
      this.isTrainingLoaded = true
    })

    this.$store.dispatch('tasks/getNotResolvedTasks')
  }
}
</script>
