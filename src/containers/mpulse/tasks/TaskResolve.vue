<template>
  <div>
    <b-card no-body>
      <b-card-body>
        <b-form-group label="Comment" label-for="comment">
          <b-form-textarea id="comment" v-model="comment" placeholder="Add your resolution comment here" rows="3" max-rows="6"></b-form-textarea>
        </b-form-group>

        <b-form-group label="Status">
          <v-select :options="statusOptions" v-model="status"></v-select>
        </b-form-group>

        <b-button variant="primary" @click="submit" :disabled="!status">
          Submit
        </b-button>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'TaskResolve',
    props: {
      task: Object
    },
    data() {
      return {
        comment: "",
        status: null,
        statusOptions: [
          "assigned",
          "pending",
          "feedback",
          "resolved"
        ]
      }
    },
    methods: {
      submit() {
        let params = {
          taskId: this.task.taskid,
          status: this.status,
          comment: this.comment
        }
        this.$store.dispatch('tasks/updateMyTask', params)
          .then(() => {
            this.$emit('success')
            this.showSuccessMsg()
          })
          .catch((error) => {
            if (error.response.status == 400) {
              this.showErrorMsg({
                message: error.response.data.message
              })
            } else {
              this.showErrorMsg()
            }
          })
      }
    },
    created() {
      this.status = this.task.status
    }
  }
</script>
