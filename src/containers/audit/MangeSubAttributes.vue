<template>
  <div>
    <b-card>
      <!-- <b-row>
        <b-col md="1">
          <b-dropdown
            id="dropdown-1"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            text="Page Size"
            variant="primary"
          >
            <b-dropdown-item>
              <b-button
                variant="light"
                style="width: 100%"
                @click="pageresults1($event)"
                >50</b-button
              >
            </b-dropdown-item>
            <b-dropdown-item>
              <b-button
                variant="light"
                style="width: 100%"
                @click="pageresults2($event)"
                >100</b-button
              >
            </b-dropdown-item>
            <b-dropdown-item>
              <b-button
                variant="light"
                style="width: 100%"
                @click="pageresults3($event)"
                >200</b-button
              >
            </b-dropdown-item>
          </b-dropdown>
          &nbsp;
        </b-col>

        <b-col md="2"
          ><json-excel
            :data="items"
            type="csv"
            name="Expenses.xls"
            :fields="json_fields"
          >
            <div class="excel_expenses">
              <b-button variant="secondary">Export Data</b-button>
            </div>
          </json-excel></b-col
        >
      </b-row> -->
      <!-- <div class="second_col_expenses">
        <b-row>
          <b-col md="4">
            <div class="expense_mobile_padding"></div>
            <b-form-datepicker
              id="example-datepicker"
              v-model="form.startdate"
              class="expenses_filter"
              placeholder="Start Date"
            />
          </b-col>

          <b-col md="4">
            <div class="expense_mobile_padding"></div>
            <b-form-datepicker
              id="example-datepicker"
              v-model="form.enddate"
              class="expenses_filter"
              placeholder="End Date"
            />
          </b-col>

          <b-col md="4">
            <div class="expense_mobile_padding"></div>
            <b-button variant="primary" @click="index(true)">Search</b-button>
            &nbsp;
            <b-button variant="secondary" @click="clear()">Clear</b-button>
          </b-col>
        </b-row>
      </div> -->
      <div></div>
      <div class="expense_report_dropdown"></div>
      <b-card>
        <b-row>
          <b-col lg="3">
            <b-form-input
              v-model="form.Q"
              placeholder="Type Attribute Name Here.."
            ></b-form-input>
          </b-col>
          <b-col lg="3">
            <b-button variant="primary" @click="clickBtnSearch()"
              >Search</b-button
            >
            &nbsp;
            <b-button variant="secondary" @click="clickBtnClear()"
              >Clear</b-button
            >
          </b-col>

          <b-col>
            <b-button v-b-toggle.sidebar-1 class="addmodal" variant="primary"
              >Add</b-button
            >
          </b-col>
        </b-row>

        <b-sidebar
          ref="sidebarAddSubAttributes"
          right
          bg-variant="light"
          text-variant="dark"
          id="sidebar-1"
          shadow
        >
          <CreateSubAttributesModal @sidebar="hideSideBar" />
        </b-sidebar>
      </b-card>
      <b-row>
        <!-- Table -->
        <b-col cols="12">
          <b-table
            striped
            hover
            responsive
            :per-page="perPage"
            :current-page="currentPage"
            :items="items"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
          >
            <template #cell(audit_sub_attribute)="data">
              {{ firstLetterUpperCase(data.value) }}
            </template>
            <template #cell(sub_attributes_main_attribute)="data">
              {{ firstLetterUpperCase(data.value.audit_main_attribute) }}
            </template>
            <template #cell(action)="data">
              <b-button variant="primary" @click="showModal(data.item)"
                >Edit</b-button
              >&nbsp;
              <!-- <b-button variant="danger" @click="deleteAttribute(data.item)"
                >Delete</b-button
              > -->
            </template>
          </b-table>
        </b-col>

        <b-col cols="12">
          <b-pagination
            v-model="currentPage"
            :total-rows="total"
            :per-page="perPage"
            v-on:input="paginate($event)"
            align="center"
            size="md"
            class="my-0"
          />
        </b-col>

        <b-modal
          ref="modalEditSubAttributes"
          hide-footer
          size="lg"
          no-enforce-focus
        >
          <UpdateSubAttributesModal
            :attribute="selectedAttribute"
            @modal="hideModal"
          />
        </b-modal>

        <!-- <b-col cols="12">
          <b-pagination
            v-model="currentPage"
            :total-rows="total"
            :per-page="perPage"
            v-on:input="paginate($event)"
            align="center"
            size="sm"
            class="my-0"
          />
        </b-col> -->
      </b-row>
    </b-card>
  </div>
</template>
<script>
import CreateSubAttributesModal from "@/containers/audit/Components/AddSubAttributes.vue";
import UpdateSubAttributesModal from "@/containers/audit/Components/UpdateSubAttributesModal.vue";
import {
  BTable,
  BModal,
  BRow,
  BCol,
  BPagination,
  BContainer,
  BFormGroup,
  VBModal,
  BCard,
  BImg,
  BDropdown,
  BButton,
  BDropdownItem,
  BFormTextarea,
  BFormDatepicker,
  BBadge,
} from "bootstrap-vue";
import JsonExcel from "vue-json-excel";
import vSelect from "vue-select";
import {
  ValidationProvider,
  ValidationObserver,
} from "vee-validate/dist/vee-validate.full";
import Ripple from "vue-ripple-directive";
import AuditSubAttributesApi from "@/store/modules/subattribute";
export default {
  components: {
    BTable,
    CreateSubAttributesModal,
    UpdateSubAttributesModal,
    BBadge,
    BFormDatepicker,
    BFormGroup,
    BModal,
    BRow,
    BCol,
    BContainer,
    vSelect,
    BButton,
    JsonExcel,
    BImg,
    ValidationProvider,
    ValidationObserver,
    BDropdown,
    BDropdownItem,
    BPagination,
    BCard,
    BFormTextarea,
    // validations
  },
  data() {
    return {
      dir: "ltr",
      id: "",
      form: {},
      gridApi: null,
      columnApi: null,
      perPage: "10",
      currentPage: "1",
      total: "",
      sortBy: "",
      items: [],
      selectedAttribute: {},
      expenses: [],
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      // colomns
      //   json_fields: {
      //     "Am Region": "amregion",
      //     Amount: "amount",
      //     "Type Of Expense": "expense_type",
      //     Comment: "comment",
      //     "Date of Expensed": "dateofexpense",
      //   },
      fields: [
        {
          key: "audit_sub_attribute",
          label: "Sub Attribute Name",
          sortable: true,
        },
        {
          key: "sub_attributes_main_attribute",
          label: "Main Attribute Name",
          sortable: true,
        },
        {
          key: "action",
          label: "Action",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
  },
  async mounted() {
    await this.index();
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  methods: {
    async index(reset = false) {
      if (reset) {
        this.currentPage = 1;
        this.items = [];
      }

      const res = await AuditSubAttributesApi.getAllSubAttributes(
        this.form,
        this.perPage,
        this.currentPage
      );
      if (this.currentPage === 1) {
        this.items = res.data.data.data;
      } else {
        this.items = this.items.concat(res.data.data.data);
      }

      this.total = res.data.data.total;
      // this.items = res.data.data;
    },

    showModal(item) {
      this.$refs.modalEditSubAttributes.show();
      this.selectedAttribute = item;
    },

    async hideModal() {
      this.$refs.modalEditSubAttributes.hide();
      await this.index(true);
    },

    async hideSideBar() {
      this.$refs.sidebarAddSubAttributes.hide();
      await this.index(true);
    },

    async deleteAttribute(item) {
      const param = {
        id: item.id,
      };
      await AuditSubAttributesApi.DeleteSubAttributes(param)
        .then(({ response }) => {
          this.showSuccessMsg();
          this.index(true);
        })
        .catch(({ response }) => {
          if (response.status == 400) {
            this.showErrorMsg({
              message: response.data.error,
            });
          } else {
            this.showErrorMsg();
          }
        });
    },

    async clickBtnSearch() {
      await this.index(true);
    },

    async clickBtnClear() {
      this.form = {};
      await this.index(true);
    },

    paginate(e) {
      this.currentPage = e;
      this.index();
    },

    async pageresults1(e) {
      this.perPage = e.target.innerText;
      await this.index(true);
    },

    async pageresults2(e) {
      this.perPage = e.target.innerText;
      await this.index(true);
    },

    async pageresults3(e) {
      this.perPage = e.target.innerText;
      await this.index(true);
    },
  },
};
</script>
<style scoped>
.addmodal {
  float: right;
}
</style>
