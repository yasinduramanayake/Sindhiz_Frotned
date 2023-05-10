<template>
  <div>
    <table class="table">
      <tr>
        <td>Task ID</td>
        <td>{{task.taskid}}</td>
      </tr>
      <tr>
        <td>Task Name</td>
        <td>{{task.task_name}}</td>
      </tr>
      <tr>
        <td>Task Description</td>
        <td>{{task.task_description}}</td>
      </tr>
      <tr>
        <td>Due Date</td>
        <td>{{task.due_date}}</td>
      </tr>
      <tr>
        <td>Created By</td>
        <td>{{task.created_by.staffname}}</td>
      </tr>
      <tr>
        <td>Assigned To</td>
        <td>{{task.assigned_to ? task.assigned_to.staffname : ''}}</td>
      </tr>
      <tr v-if="task.updated_by">
        <td>Updated By</td>
        <td>{{task.updated_by ? task.updated_by.staffname : ''}} at {{ task.updated_at }}</td>
      </tr>
      <tr>
        <td>Status</td>
        <td>{{task.status}}</td>
      </tr>
      <tr>
        <td>Comments</td>
        <td>
          <b-table :items="task.comments" :fields="fields">
          </b-table>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'TaskDetails',
    props: {
      task: Object
    },
    methods: {
    },
    data() {
      return {
        fields: [
          {
            key: 'comment',
            label:"Comment"
          },
          {
            key: 'staffname',
            label: 'Staff'
          },
          {
            key: 'created_at',
            label: 'Date'
          }
        ]
      }
    },
  }
</script>
