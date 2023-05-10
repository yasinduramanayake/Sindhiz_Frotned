<template>
  <div class="animated fadeIn">
    <b-card>
      <b-form
        v-on:submit.prevent="onSubmit"
        v-on:reset.prevent="onReset"
        novalidate
      >
        <b-row>
          <b-col sm="4">
            <b-form-group
              label="Store"
              label-for="store"
            >
              <store-select v-model="$v.form.store.$model"></store-select>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group
              label="Select Day"
            >
              <day-select
                v-model="$v.form.reportType.$model"
              ></day-select>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group
              label="Select Year"
            >
              <year-select
                v-model="$v.form.year.$model"
              ></year-select>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="4">
            <b-btn type="submit" variant="success" :disabled="$v.form.$invalid"
              >Submit</b-btn
            >
          </b-col>
        </b-row>
      </b-form>
    </b-card>

    <b-card v-if="salesOverview">
      <sales-overview-table :data="salesOverview"></sales-overview-table>
    </b-card>

  </div>
</template>

<script>
import Vue from "vue";
import { required } from "vuelidate/lib/validators";
import SalesOverviewTable from './SalesOverviewTable'

const formShape = {
  store: null,
  reportType: null,
  year: null
};

export default {
  name: "HourlySalesReport",
  components: {
      SalesOverviewTable
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    }
  },

  data: function() {
    return {
      submitted: false,
      salesOverview: null,
      dateOptionSelected: null,
      form: Object.assign({}, formShape),
    }
  },
  validations: {
    form: {
      store: {
        required
      },
      reportType: {
        required
      },
      year: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$nextTick(() => {
          this.salesOverview = null
          let params = {
            storeId: this.$v.form.store.$model.value,
            reportType: this.$v.form.reportType.$model,
            year: this.$v.form.year.$model
          };
          Vue.axios
            .post("/getHourlySalesReport", params)
            .then(response => {
              this.salesOverview = response.data
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
      component.$children.some(child => {
        focused = this.findFirstError(child);
        return focused;
      });

      return focused;
    },
    validate() {
      this.$v.$touch();
      this.$nextTick(() => this.findFirstError());
      return this.isValid;
    }
  },
  created() {
    this.form.year = this.$moment().year();
  }
};
</script>
