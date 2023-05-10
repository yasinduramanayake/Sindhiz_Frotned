<template>
  <div>
    <b-card>
      <b-row>
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
      </b-row>
      <div class="second_col_expenses">
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
      </div>
      <div></div>
      <div class="expense_report_dropdown"></div>
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
            <template #cell(reciept)="data">
              <Buttonfilecomponent :item="data.item" />
            </template>

            <template #cell(dateofexpense)="data">
              {{ momentFormat(data.value, "MMMM Do YYYY") }}
            </template>

            <template #cell(comment)="data">
              {{ firstLetterUpperCase(data.value) }}
            </template>

            <template #cell(amregion)="data">
              {{ firstLetterUpperCase(data.value) }}
            </template>
            <template #cell(staff)="data">
              {{ firstLetterUpperCase(data.value.firstname) }}
              {{ firstLetterUpperCase(data.value.lastname) }}
            </template>

            <template #cell(expense_type)="data">
              {{ firstLetterUpperCase(data.value) }}
            </template>

            <template #cell(amount)="data">
              {{ getPrice(data.value) }}
            </template>

            <template #cell(approvel)="row">
              <div class="expense_mobile_padding"></div>

              <div v-if="!row.item.approvel_status">
                <b-button variant="primary" @click="approve(row.item)"
                  >Approve</b-button
                >
                &nbsp;
                <b-button
                  variant="danger"
                  class="mobile-reject"
                  v-b-modal.modal-danger1
                  @click="beforereject(row.item)"
                  >Reject</b-button
                >
              </div>

              <b-badge
                v-else-if="row.item.approvel_status === 'Approved'"
                pill
                variant="success"
                >Approved</b-badge
              >
              <b-badge
                v-else-if="row.item.approvel_status === 'Rejected'"
                pill
                variant="danger"
                >Rejected</b-badge
              >
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
            size="sm"
            class="my-0"
          />
        </b-col>
      </b-row>
    </b-card>

    <b-modal
      id="modal-danger1"
      hide-footer
      modal-class="modal-danger"
      title="Reject Approvel"
    >
      <b-card-text>
        <validation-observer ref="RejectValidation" #default="{ invalid }">
          <b-form @submit.prevent>
            <b-form-group
              label="Reason To Reject"
              label-for="v-Next_of_Kin_Name_&_Phone"
              label-cols-md="4"
            >
              <validation-provider
                #default="{ errors }"
                name="reason"
                rules="required"
              >
                <b-form-textarea
                  id="h--Next_of_Kin_Name_&_Phone"
                  v-model="rejectdata.reason"
                  placeholder="Reason To Reject"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              :disabled="invalid"
              @click="reject()"
            >
              Submit
            </b-button>
          </b-form>
        </validation-observer>
      </b-card-text>
    </b-modal>
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
import ClaimApi from "@/store/modules/expenses";
import Buttonfilecomponent from "@/containers/expenses/Buttonfilecomponent.vue";
export default {
  components: {
    Buttonfilecomponent,
    BTable,
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
      rejectdata: {
        id: "",
        reason: "",
      },
      filePath: "",
      id: "",
      form: {},
      gridApi: null,
      columnApi: null,
      perPage: "10",
      // baseurl: "https://backend.sindhizonline.com.au/public/",
      baseurl: "https://backend.sindhizonline.com.au/public/",
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
      // colomns
      json_fields: {
        "Am Region": "amregion",
        Amount: "amount",
        "Type Of Expense": "expense_type",
        Comment: "comment",
        "Date of Expensed": "dateofexpense",
      },
      fields: [
        { key: "staff", label: "Staff Name", sortable: true },
        { key: "amregion", label: "Am Region", sortable: true },
        { key: "amount", label: "Amount", sortable: true },
        { key: "reciept", label: "Reciept", sortable: true },
        { key: "dateofexpense", label: "Date", sortable: true },
        { key: "expense_type", label: "Type Of Expense", sortable: true },
        { key: "comment", label: "Comment", sortable: true },
        { key: "approvel", label: "Approvel Status", sortable: true },
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

      const res = await ClaimApi.index(
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
    },
    async clear() {
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
    async approve(item) {
      const paras = {
        id: item.id,
      };

      await ClaimApi.ApproveLeave(paras)
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
    async beforereject(item) {
      this.rejectdata.id = item.id;
    },
    async reject() {
      if (await this.$refs.RejectValidation.validate()) {
        await ClaimApi.RejectLeave(this.rejectdata)
          .then(({ response }) => {
            this.showSuccessMsg();
            this.$bvModal.hide("modal-danger1");
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
      }
      this.rejectdata = {};
    },
  },
};
</script>
<style scoped></style>
