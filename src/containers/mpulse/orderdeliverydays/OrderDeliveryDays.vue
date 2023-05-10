<template>
  <div className="animated">
    <b-card>
      <b-form-group label="Store" label-cols-sm="4" label-cols-lg="3">
        <v-select
          :options="storeList"
          :onChange="changeStore"
          placeholder="Select Store"
        ></v-select>
      </b-form-group>
      <b-button-toolbar class="pull-right">
        <b-button variant="primary" class="mr-1" @click="showAddDay"
          >Add Day</b-button
        >
      </b-button-toolbar>
    </b-card>
    <b-card>
      <grid-buttons
        v-if="selectedStore"
        :gridOptions="gridOptions"
        :exportParams="exportParams"
      />
      <ag-grid-vue
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="orderDeliveryDays"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady"
      >
      </ag-grid-vue>
    </b-card>
    <div>
      <b-modal ref="modalAddDay" title="Add Day" hide-footer no-enforce-focus>
        <day-form-add
          v-if="canShowAddDay"
          @success="addDaySuccess"
          @cancel="cancelAddDay"
        />
      </b-modal>
      <b-modal
        ref="modalEditDay"
        title="Edit Category"
        hide-footer
        @hide="hideEditDay"
        no-enforce-focus
      >
        <day-form-edit
          v-if="selectedDay"
          :day="selectedDay"
          @success="editDaySuccess"
          @cancel="cancelEditDay"
        />
      </b-modal>
      <b-modal
        ref="modalConfirm"
        title="Delete Day"
        @ok="deleteDay"
        no-enforce-focus
      >
        <div v-if="selectedDay" class="d-block text-center">
          <h4>
            Are you sure you want to delete this day: #{{ selectedDay.dayid }}
          </h4>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import vSelect from "vue-select";
import { AgGridVue } from "ag-grid-vue";
import { mapState, mapActions } from "vuex";
import GridButtons from "../GridButtons";
import DayFormAdd from "./DayFormAdd";
import DayFormEdit from "./DayFormEdit";
import OrderDeliveryDayActions from "./OrderDeliveryDayActions";

export default {
  name: "OrderDeliveryDays",
  components: {
    vSelect,
    AgGridVue,
    DayFormAdd,
    DayFormEdit,
    OrderDeliveryDayActions,
    GridButtons
  },
  computed: mapState({
    stores: state => state.stores.all,
    orderDeliveryDays: state => state.orderDeliveryDays.all
  }),
  watch: {
    stores: function(values) {
      this.storeList = [];
      Vue._.forEach(values, store => {
        this.storeList.push({ label: store.storename, value: store.storeid });
      });
    }
  },
  data: function() {
    return {
      storeList: [],
      days: {
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday",
        sun: "Sunday"
      },
      selectedStore: null,
      canShowAddDay: false,
      selectedDay: null,
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
            headerName: "Distributor Name",
            field: "distributorname",
            filter: "agTextColumnFilter",
            minWidth: 120
          },
          {
            headerName: "Day",
            field: "day",
            filter: "agTextColumnFilter",
            minWidth: 120,
            cellRenderer: params => {
              let day = params.value;
              return this.days[day] ? this.days[day] : "";
            }
          },
          {
            headerName: "Classification",
            field: "classification",
            filter: "agTextColumnFilter",
            minWidth: 120
          },
          {
            headerName: "Actions",
            cellRendererFramework: "OrderDeliveryDayActions",
            filter: null
          }
        ]
      }
    };
  },
  methods: {
    exportParams() {
      return {
        fileName: this.selectedStore
          ? "MerchantPulse_OrderDeliveryDays" +
            this.$moment().format("YYYY-MM-DD") +
            "_" +
            this.selectedStore.label
          : "",
        columnKeys: ["distributorname", "day", "classification"]
      };
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    },
    changeStore(store) {
      this.selectedStore = store;
      if (store) {
        this.$store.dispatch("orderDeliveryDays/getOrderDeliveryDays", {
          storeId: store.value
        });
      } else {
        this.$store.dispatch("orderDeliveryDays/clear");
      }
    },
    showAddDay() {
      this.canShowAddDay = true;
      this.$refs.modalAddDay.show();
    },
    cancelAddDay() {
      this.canShowAddDay = false;
      this.$refs.modalAddDay.hide();
    },
    addDaySuccess() {
      this.canShowAddDay = false;
      this.$refs.modalAddDay.hide();
      if (this.selectedStore) {
        this.$store.dispatch("orderDeliveryDays/getOrderDeliveryDays", {
          storeId: this.selectedStore.value
        });
      }
    },
    showEditModal(day) {
      this.selectedDay = day;
      this.$refs.modalEditDay.show();
    },
    editDaySuccess() {
      this.$refs.modalEditDay.hide();
      if (this.selectedStore) {
        this.$store.dispatch("orderDeliveryDays/getOrderDeliveryDays", {
          storeId: this.selectedStore.value
        });
      }
    },
    cancelEditDay() {
      this.$refs.modalEditDay.hide();
    },
    hideEditDay() {
      this.selectedDay = null;
    },
    showDeleteModal(day) {
      this.selectedDay = day;
      this.$refs.modalConfirm.show();
    },
    deleteDay() {
      Vue.axios
        .post("/deleteOrderDeliveryDay", { dayId: this.selectedDay.dayid })
        .then(() => {
          this.selectedDay = null;
          this.$store.dispatch("orderDeliveryDays/getOrderDeliveryDays", {
            storeId: this.selectedStore.value
          });
          this.showSuccessMsg();
        })
        .catch(() => {
          this.showErrorMsg();
        });
    }
  },
  created() {
    this.$store.dispatch("stores/getStores");
  },
  beforeMount() {
    this.$store.dispatch("orderDeliveryDays/clear");
  }
};
</script>
