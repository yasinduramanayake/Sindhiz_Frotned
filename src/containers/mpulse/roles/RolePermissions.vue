<template>
  <div>
    <b-table :items="items" hover bordered :fields="fields">
      <template v-slot:cell(status)="data">
        <c-switch class="mx-1" color="primary" variant="3d" size="sm" v-model="data.item.selected"/>
      </template>
    </b-table>
    <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
    <b-button class="ml-1" type="reset" @click="onCancel">Cancel</b-button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  import { Switch as cSwitch } from '@coreui/vue'
  export default {
    name: 'RolePermisions',
    props: {
      role: Object
    },
    components: {
      cSwitch
    },
    computed: mapState({
      permissions: state => state.permissions.all,
    }),
    data: () => {
      return {
        items: [],
        fields: [
          {key: 'display_name', label: 'Permission Name', sortable: true},
          {key: 'status', label: 'On/Off', sortable: true}
        ],
      }
    },
    methods: {
      onSubmit() {
        let rolePermissions = []
        _.forEach(this.items, (item) => {
          if (item.selected) {
            rolePermissions.push({permission_id: item.id, role_id: this.role.id})
          }
        })

        Vue.axios.post('/saveRolePermissions/'+this.role.id, rolePermissions)
        .then((response) => {
          this.$emit('success')
          this.showSuccessMsg()
        }).catch(() => {
          this.showErrorMsg
        })
      },
      onCancel() {
        this.$emit('cancel')
      }
    },
    beforeMount() {
      this.items = _.map(this.permissions, (permission) => {
        return {id: permission.id, display_name: permission.name, selected: false}
      })
      Vue.axios.get('/getRolePermissions/'+this.role.id).then((response) => {
        _.forEach(response.data, (rolePermission) => {
          var index = _.findIndex(this.items, {id: rolePermission.permission_id});
          this.items[index].selected = true
        })
      })
    }
  }
</script>
