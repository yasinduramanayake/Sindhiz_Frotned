<template>
  <div className="animated">
    <b-card>
      <b-button-toolbar class="pull-left">
        <c-switch class="mx-1" color="primary" variant="3d" size="sm"
      @change="changeOnlyActive" /> Show All Staff
      </b-button-toolbar>
      <b-button-toolbar class="pull-right">
        <b-btn variant="primary" @click="showAddStaff">Add Staff</b-btn>
      </b-button-toolbar>
    </b-card>
    <b-card>
      <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />

      <ag-grid-vue class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="staffs"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady"
      >
      </ag-grid-vue>
    </b-card>
    <div>
      <b-modal ref="modalAddStaff" title="Add Staff" hide-footer @hide="hideAddStaff" no-enforce-focus>
        <staff-form-add v-if="canShowAddStaff" @success="addStaffSuccess" @cancel="cancelAddStaff"/>
      </b-modal>
      <b-modal ref="modalEditStaff" title="Edit Staff" hide-footer @hide="hideEditStaff" no-enforce-focus>
        <staff-form-edit v-if="selectedStaff" :staff="selectedStaff" @success="editStaffSuccess" @cancel="cancelEditStaff"/>
      </b-modal>
      <b-modal ref="modalSetAttributes" title="Set Attributes" hide-footer @hide="hideSetAttributes" size="lg" no-enforce-focus>
        <staff-set-attributes v-if="selectedStaff" :staff="selectedStaff" @success="setAttributesSuccess" @cancel="cancelSetAttributes"/>
      </b-modal>
      <b-modal ref="modalSetStores" title="Set Stores" hide-footer @hide="hideSetStores" size="lg" no-enforce-focus>
        <staff-set-stores v-if="selectedStaff" :staff="selectedStaff" @success="setStoresSuccess" @cancel="cancelSetStores"/>
      </b-modal>
      <b-modal ref="modalConfirmSendActivation" title="Resend Activation" @ok="sendActivation" no-enforce-focus>
        <div v-if="selectedStaff" class="d-block text-center">
          <h4>Are you sure you want to resend activation?</h4>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {AgGridVue} from "ag-grid-vue";
  import { Switch as cSwitch } from '@coreui/vue'
  import { mapState } from 'vuex'
  import GridButtons from '../GridButtons'
  import StaffActions from './StaffActions'
  import StaffFormAdd from './StaffFormAdd'
  import StaffFormEdit from './StaffFormEdit'
  import StaffSetAttributes from './StaffSetAttributes'
  import StaffSetStores from './StaffSetStores'

  export default {
    name: 'Staffs',
    components: {
      AgGridVue,
      GridButtons,
      StaffActions,
      StaffFormAdd,
      StaffFormEdit,
      StaffSetAttributes,
      StaffSetStores,
      cSwitch
    },
    computed: mapState({
      staffs: state => state.staffs.all
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
            {headerName: 'First Name', field: 'firstname', filter: 'agTextColumnFilter', minWidth: 80},
            {headerName: 'Last Name', field: 'lastname', filter: 'agTextColumnFilter', minWidth: 80},
            {headerName: 'Email', field: 'email', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Stores', field: 'stores', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Roles', field: 'staffRoles', filter: 'agTextColumnFilter', minWidth: 100},
            {headerName: 'Actions', field: 'promoid', minWidth: 180, cellRendererFramework: 'StaffActions'}
          ],
        },
        canShowAddStaff: false,
        selectedStaff: null,
        selectedViewSales: null,
        isOnlyActive: false
      }
    },
    methods: {
      exportParams() {
        return {
          'fileName': 'MerchantPulseStaffs_'+ this.$moment().format('YYYY-MM-DD'),
          'columnKeys': ['firstname', 'lastname', 'stores','staffRoles', 'email']
        }
      },
      gridReady() {
        this.gridOptions.api.sizeColumnsToFit()
      },
      showAddStaff() {
        this.canShowAddStaff = true
        this.$refs.modalAddStaff.show()
      },
      cancelAddStaff() {
        this.$refs.modalAddStaff.hide()
      },
      addStaffSuccess() {
        this.$refs.modalAddStaff.hide()
        this.$store.dispatch('staffs/getStaffs')
      },
      hideAddStaff() {
        this.canShowAddStaff = false
      },
      showEditModal(staff) {
        this.selectedStaff = staff
        this.$refs.modalEditStaff.show()
      },
      editStaffSuccess() {
        this.$refs.modalEditStaff.hide()
        this.$store.dispatch('staffs/getStaffs')
      },
      cancelEditStaff() {
        this.$refs.modalEditStaff.hide()
      },
      hideEditStaff() {
        this.selectedStaff = null
      },
      showViewSales(staff) {
        this.selectedViewSales = staff
        this.$refs.modalViewSales.show()
      },
      hideViewSales() {
        this.selectedViewSales = null
      },
      showSetAttributes(staff) {
        this.selectedStaff = staff
        this.$refs.modalSetAttributes.show()
      },
      hideSetAttributes() {
        this.selectedStaff = null
      },
      setAttributesSuccess() {
        this.$refs.modalSetAttributes.hide()
      },
      cancelSetAttributes() {
        this.$refs.modalSetAttributes.hide()
      },
      showSetStores(staff) {
        this.selectedStaff = staff
        this.$refs.modalSetStores.show()
      },
      hideSetStores() {
        this.selectedStaff = null
      },
      setStoresSuccess() {
        this.$refs.modalSetStores.hide()
      },
      cancelSetStores() {
        this.$refs.modalSetStores.hide()
      },
      toggleActive(staff) {
        this.$store.dispatch('staffs/toggleActive', staff)
          .then(() => {
            this.showSuccessMsg()
          }).catch(() => {
            this.showErrorMsg()
          })
      },
      showSendActivation(staff) {
        this.selectedStaff = staff
        this.$refs.modalConfirmSendActivation.show()
      },
      sendActivation() {
        Vue.axios.post('/resendActivation', {staffId: this.selectedStaff.staffid})
        .then(() => {
          this.showSuccessMsg({message: "Please inform user to check activation email"})
        }).catch(() => {
          this.showErrorMsg()
        })
      },
      changeOnlyActive() {
        this.isOnlyActive = !this.isOnlyActive;
        this.$store.dispatch('staffs/getStaffs', {isActive: this.isOnlyActive})
      }
    },
    created () {
      this.$store.dispatch('staffs/getAttributes')
    },
    beforeMount() {
      this.$store.dispatch('staffs/clear')
    }
  };
</script>
