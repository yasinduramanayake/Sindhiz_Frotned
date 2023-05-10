<template>
  <div className="animated">
    <b-card>
      <b-button-toolbar class="pull-right">
        <b-btn variant="primary" @click="showAddRole">Add Role</b-btn>
      </b-button-toolbar>
    </b-card>
    <b-card>
      <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />

      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="roles"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady"
      >
      </ag-grid-vue>
    </b-card>
    <div>
      <b-modal ref="modalAddRole" title="Add Role" hide-footer @hide="hideAddRole" no-enforce-focus>
        <role-form-add v-if="canShowAddRole" @success="addRoleSuccess" @cancel="cancelAddRole"/>
      </b-modal>
      <b-modal ref="modalEditRole" title="Edit Role" hide-footer @hide="hideEditRole" no-enforce-focus>
        <role-form-edit v-if="selectedRole" :role="selectedRole" @success="editRoleSuccess" @cancel="cancelEditRole"/>
      </b-modal>
      <b-modal ref="modalRolePermission" title="Role's Permissions" hide-footer @hide="hideRolePermissions" no-enforce-focus>
        <role-permissions v-if="selectedRolePermissions" :role="selectedRolePermissions" @success="editRolePermissionSuccess" @cancel="cancelRolePermissions"/>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {AgGridVue} from "ag-grid-vue";
  import { mapState, mapActions } from 'vuex'
  import GridButtons from '../GridButtons'
  import RoleActions from './RoleActions'
  import RoleFormAdd from './RoleFormAdd'
  import RoleFormEdit from './RoleFormEdit'
  import RolePermissions from './RolePermissions'

  export default {
    name: 'Roles',
    components: {
      AgGridVue,
      GridButtons,
      RoleActions,
      RoleFormAdd,
      RoleFormEdit,
      RolePermissions
    },
    computed: mapState({
      roles: state => state.roles.all
    }),
    data: function () {
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
            {headerName: 'Role', field: 'name', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Description', field: 'description', filter: 'agTextColumnFilter', minWidth: 150},
            {headerName: 'Actions', cellRendererFramework: 'RoleActions', minWidth: 150}
          ],
        },
        canShowAddRole: false,
        selectedRole: null,
        selectedRolePermissions: null
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': 'MerchantPulseRoles_'+ this.$moment().format('YYYY-MM-DD'),
          'columnKeys': ['id', 'name', 'description'],
          'allColumns': true
        }
      },
      gridReady() {
        this.gridOptions.api.sizeColumnsToFit()
      },
      showAddRole() {
        this.canShowAddRole = true
        this.$refs.modalAddRole.show()
      },
      cancelAddRole() {
        this.$refs.modalAddRole.hide()
      },
      addRoleSuccess() {
        this.$refs.modalAddRole.hide()
        this.$store.dispatch('roles/getRoles')
      },
      hideAddRole() {
        this.canShowAddRole = false
      },
      showEditModal(role) {
        this.selectedRole = role
        this.$refs.modalEditRole.show()
      },
      editRoleSuccess() {
        this.$refs.modalEditRole.hide()
        this.$store.dispatch('roles/getRoles')
      },
      cancelEditRole() {
        this.$refs.modalEditRole.hide()
      },
      hideEditRole() {
        this.selectedRole = null
      },
      showPermissionModal(role) {
        this.selectedRolePermissions = role
        this.$refs.modalRolePermission.show()
      },
      editRolePermissionSuccess() {
        this.$refs.modalRolePermission.hide()
      },
      cancelRolePermissions() {
        this.$refs.modalRolePermission.hide()
      },
      hideRolePermissions() {
        this.selectedRolePermissions = null
      }
    },
    created () {
      this.$store.dispatch('roles/getRoles')
      this.$store.dispatch('permissions/getPermissions')
    },
    notifications: {
      toggleDisableSuccess: {
        type: 'success',
        message: 'Toggle disabled successfully'
      },
      toggleDisableFailed: {
        type: 'error',
        message: 'Toggle disabled failed'
      }
    }
  };
</script>
