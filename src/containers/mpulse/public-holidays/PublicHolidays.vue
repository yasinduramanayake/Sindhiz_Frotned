<template>
  <div class="animated fadeIn">
    <b-card>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        type="submit"
        variant="primary"
        class="mr-1"
        v-b-modal.modal-danger1
      >
        Add Holidays
      </b-button>
    </b-card>

    <b-modal id="modal-danger1" hide-footer title="Bulk Upload">
      <b-card-text>
        <validation-observer ref="bulkValidation" #default="{ invalid }">
          <b-form @submit.prevent>
            <b-row>
              <b-col cols="12">
                <b-form-group label="Bulk Upload" label-for="excel">
                  <b-form-file
                    placeholder="Choose a Excel or drop it here..."
                    drop-placeholder="Drop Excel here..."
                    no-drop
                    accept="*"
                    v-model="file"
                  />
                </b-form-group>
              </b-col>

              <!-- submit and reset -->
              <b-col cols="12">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  type="submit"
                  variant="primary"
                  class="mr-1"
                  :disabled="invalid"
                  @click="bulkUpload()"
                >
                  Submit
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </b-card-text>
    </b-modal>

    <b-card>
      <b-form
        v-on:submit.prevent="onSubmit"
        v-on:reset.prevent="onReset"
        novalidate
      >
        <b-row>
          <b-col sm="6">
            <b-form-group label="State">
              <state-select v-model="$v.form.state.$model"></state-select>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Year">
              <year-select v-model="$v.form.year.$model"></year-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="">
            <b-btn
              type="submit"
              variant="success"
              @click="onSubmit()"
              :disabled="$v.form.$invalid"
              >Submit</b-btn
            >
          </b-col>
        </b-row>
      </b-form>
    </b-card>

    <b-card header="Sales Purchase" v-if="reportData">
      <ag-grid-vue
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :rowData="reportData"
        :pagination="true"
        :paginationPageSize="20"
        :floatingFilter="true"
        :suppressNoRowsOverlay="true"
        @gridReady="gridReady"
      >
      </ag-grid-vue>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import {
  ValidationProvider,
  ValidationObserver,
} from "vee-validate/dist/vee-validate.full";
import Ripple from "vue-ripple-directive";
import { required } from "vuelidate/lib/validators";
import BulkApi from "@/store/modules/holidays";
import { AgGridVue } from "ag-grid-vue";
import {
  BModal, 
  VBModal
} from "bootstrap-vue";

const formShape = {
  state: null,
  year: null,
};

export default {
  name: "PublicHolidays",
  components: {
    AgGridVue,
    ValidationProvider,
    ValidationObserver,
    BModal, 
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    },
  },
  data: function () {
    return {
      file: null,
      form: Object.assign({}, formShape),
      reportData: null,
      gridOptions: {
        context: {
          componentParent: this,
        },
        defaultColDef: {
          sortable: true,
          resizable: true,
        },
        columnDefs: [
          {
            headerName: "State",
            field: "state",
            filter: "agTextColumnFilter",
            minWidth: 100,
          },
          {
            headerName: "Date",
            field: "date",
            filter: "agTextColumnFilter",
            minWidth: 100,
          },
          {
            headerName: "Holiday Name",
            field: "holidayname",
            filter: "agTextColumnFilter",
            minWidth: 150,
          },
        ],
      },
    };
  },
  validations: {
    form: {
      state: {
        required,
      },
      year: {
        required,
      },
    },
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  methods: {
    async bulkUpload() {
      let data = new FormData();
      data.append("file", this.file);

      await BulkApi.HolidaybulkSubmit(data)
        .then(({ response }) => {
          this.showSuccessMsg();
          this.$bvModal.hide("modal-danger1");
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
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    },
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          let params = {
            state: this.$v.form.state.$model.value,
            year: this.$v.form.year.$model,
          };
          Vue.axios
            .post("/getPublicHolidays", params)
            .then((response) => {
              this.reportData = response.data;
              this.showSuccessMsg();
            })
            .catch(() => {
              this.showErrorMsg();
            });
        });
      }
    },
    onReset() {
      this.form = formShape;
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    chkState(val) {
      const field = this.$v.form[val];
      return field.$dirty ? !field.$invalid : null;
    },
    findFirstError(component = this) {
      if (component.state === false) {
        if (component.$refs.input) {
          component.$refs.input.focus();
          return true;
        }
        if (component.$refs.check) {
          component.$refs.check.focus();
          return true;
        }
      }
      let focused = false;
      component.$children.some((child) => {
        focused = this.findFirstError(child);
        return focused;
      });

      return focused;
    },
    validate() {
      this.$v.$touch();
      this.$nextTick(() => this.findFirstError());
      return this.isValid;
    },
  },
  created() {},
};
</script>
