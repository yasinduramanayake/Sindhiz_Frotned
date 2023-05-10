<template>
  <div>
    <div class="expense_report_dropdown"></div>
    <b-card>
      <b-row class="mb-3">
        <b-col lg="3">
          <v-select v-model="selected" label="storename" :options="stores" />
        </b-col>
        <b-col lg="3">
          <b-form-datepicker
            id="example-datepicker"
            v-model="form.startdate"
            class=""
            placeholder="Start Date"
          />
        </b-col>
        <b-col lg="3">
          <b-form-datepicker
            id="example-datepicker"
            v-model="form.enddate"
            class=""
            placeholder="End Date"
          />
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
      </b-row>
      <b-row v-if="items != ''" class="mb-3">
        <b-col>
          <center>
            <b
              ><div>
                FULL SCORE = {{ full_total }} <br /><br>
                PERCENTAGE =
                {{ (full_total / 174) * 100 + "%" }}
              </div></b
            >
          </center>
        </b-col>
      </b-row>

      <b-row v-if="items != ''">
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

        <b-col md="2">
          <json-excel
            :data="items"
            type="csv"
            name="Audits.csv"
            :fields="json_fields"
          >
            <div class="">
              <b-button variant="secondary">Export Data</b-button>
            </div>
          </json-excel>
        </b-col>
      </b-row>

      <b-row v-if="items != ''">
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
            <template #cell(store)="data">
              {{ firstLetterUpperCase(data.value.storename) }}
            </template>
            <template #cell(fields_sub_attribute)="data">
              {{ firstLetterUpperCase(data.value.audit_sub_attribute) }}
            </template>
            <template #cell(score)="data">
              {{ firstLetterUpperCase(data.value) }}
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
      </b-row>
    </b-card>
  </div>
</template>
<script>
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
  BFormDatepicker,
} from "bootstrap-vue";
import JsonExcel from "vue-json-excel";
import vSelect from "vue-select";
import {
  ValidationProvider,
  ValidationObserver,
} from "vee-validate/dist/vee-validate.full";
import Ripple from "vue-ripple-directive";
import AuditApi from "@/store/modules/audit";
export default {
  components: {
    BTable,
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
    BFormDatepicker,
  },
  data() {
    return {
      dir: "ltr",
      rejectdata: {
        id: "",
        reason: "",
      },
      full_total: 0,
      id: "",
      form: {},
      gridApi: null,
      columnApi: null,
      perPage: "1000000",
      currentPage: "1",
      total: "",
      sortBy: "",
      items: [],
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
      stores: [],
      selected: "Select a Store",
      // colomns
      json_fields: {
        Store: "store.storename",
        Attribute: "fields_sub_attribute.audit_sub_attribute",
        Score: "score",
        Comment: "comment",
      },
      fields: [
        { key: "store", label: "Store", sortable: true },
        { key: "fields_sub_attribute", label: "Attribute", sortable: true },
        { key: "score", label: "Score", sortable: true },
        { key: "comment", label: "Comment", sortable: true },
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
    await this.initialTableLoad();
    // await this.index(true);
    await this.getStores();
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

      const res = await AuditApi.getAudit(
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

      // this.items = res.data.data.data;
      this.full_total = this.items[0].full_total;
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
    async getStores() {
      const res = await AuditApi.getAllStores();
      this.stores = res.data;
    },
    async clickBtnSearch() {
      this.form.store_id = this.selected.storeid;
      await this.index(true);
    },
    async clickBtnClear() {
      this.form = {};
      this.selected = "Select a Store";
      this.items = [];
      this.full_total = 0;
    },
    async initialTableLoad() {
      this.items = [];
    },
  },
};
</script>
<style scoped></style>
