<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-row>
        <b-col lg="12">
          <!--<h6>Simple Form</h6>-->
          <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>

            <b-form-group label="Store Name">
              <store-select v-model="$v.form.store.$model"></store-select>
            </b-form-group>
            <b-form-group label="Task Name">
              <b-form-input type="text" v-model.lazy.trim="$v.form.taskName.$model" placeholder="Task Name" autofocus />
            </b-form-group>

            <b-form-group label="Task Description">
              <b-form-textarea id="taskDescription" v-model="$v.form.taskDescription.$model" placeholder="Task Description" rows="3" max-rows="6"></b-form-textarea>
            </b-form-group>

            <b-form-group label="Due Date">
              <v-date-picker
                v-model="$v.form.dueDate.$model"
                :input-props='{ class: "form-control" }'
                show-caps>
              </v-date-picker>
            </b-form-group>

            <b-form-group label="Assigned Group">
                <v-select :options="roleList" v-model="$v.form.role.$model" :onChange="changeRole" placeholder="Select Role"></v-select>
            </b-form-group>

            <b-form-group label="Assigned To">
              <v-select :options="staffList" v-model="$v.form.assignedTo.$model" placeholder="Select Staff"></v-select>
            </b-form-group>

            <b-button type="submit" variant="primary" :disabled="$v.form.$invalid">
              Submit
            </b-button>
            <b-button class="ml-1" type="reset" @click="onCancel">Cancel</b-button>
          </b-form>
          <br />
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</div>
</template>

<script>
import Vue from 'vue'

import {
  required
} from "vuelidate/lib/validators"

const formShape = {
  store: null,
  taskName: "",
  taskDescription: "",
  dueDate: null,
  role: null,
  assignedTo: null
}

export default {
  name: "TaskFormAdd",
  data() {
    return {
      form: Object.assign({}, formShape),
      submitted: false,
      staffList: []
    }
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
    roleList() {
      let list = []
      Vue._.forEach(this.$store.state.roles.active, (role) => {
        if(role.id != 3 && role.id != 4 && role.id != 6 && role.id != 11){
          list.push({label: role.name, value: role.id})
        }

      })
      return list
    }
  },
  validations: {
    form: {
      store: {
        required
      },
      taskName: {
        required
      },
      taskDescription: {
        required
      },
      dueDate: {},
      role: {
        required
      },
      assignedTo: {}
    }
  },
  methods: {
    changeRole(role) {
      this.staffList = []
      if (role != null) {
        _.each(this.$store.state.staffs.active, (staff) => {
          _.each(staff.roles, (staffRole) => {
            if (staffRole.id == role.value) {
              this.staffList.push({value: staff.staffid, label: staff.staffname})
              return false;
            }
          })
        })
      }
    },
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.submitted = true
          let params = {
            storeId: this.$v.form.store.$model.value,
            taskName: this.$v.form.taskName.$model,
            taskDescription: this.$v.form.taskDescription.$model,
            dueDate: this.$v.form.dueDate.$model,
            roleId: this.$v.form.role.$model.value,
            assignedTo: this.$v.form.assignedTo.$model ? this.$v.form.assignedTo.$model.value : null
          }

          this.$store.dispatch('tasks/addTask', params)
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
        })
      }
    },
    onCancel() {
      this.$emit('cancel')
    },
    onReset() {
      // Reset validation
      this.form = formShape
      this.submitted = false
      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    chkState(val) {
      const field = this.$v.form[val]
      return field.$dirty ? !field.$invalid : null
    },
    findFirstError(component = this) {
      if (component.state === false) {
        if (component.$refs.input) {
          component.$refs.input.focus()
          return true
        }
        if (component.$refs.check) {
          component.$refs.check.focus()
          return true
        }
      }
      let focused = false
      component.$children.some((child) => {
        focused = this.findFirstError(child)
        return focused
      })

      return focused
    },
    validate() {
      this.$v.$touch()
      this.$nextTick(() => this.findFirstError())
      return this.isValid
    }
  },
  created() {
    if (this.$store.state.roles.all.length == 0) {
      this.$store.dispatch('roles/getActiveRoles')
    }
    if (this.$store.state.staffs.active.length == 0) {
      this.$store.dispatch('staffs/getActiveStaffs')
    }
  }
}
</script>
