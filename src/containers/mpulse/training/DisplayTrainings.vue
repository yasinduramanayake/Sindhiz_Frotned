<template>
  <div>
    <b-card>
      <b-row>
        <b-col sm="6">
          <b-form-group label="Training Type">
            <training-type-select v-model="selectedTrainingType" />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="Year">
            <year-select v-model="selectedYear"></year-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="">
          <b-btn type="submit" variant="success" @click="search">Search</b-btn>
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <b-table
        :items="trainings"
        :fields="fields"
        hover
        bordered
        table-responsive
      >
        <template v-slot:cell(#)="data">
          {{ data.index + 1 }}
        </template>

        <template v-slot:cell(action)="data">
          <b-btn
            variant="primary"
            tag="button"
            @click="viewTraining(data.item)"
            >View</b-btn
          >
        </template>
      </b-table>
    </b-card>
    <div>
      <b-modal
        ref="modalViewTraining"
        title="View Training"
        hide-footer
        @hide="hideViewTraining"
        size="lg"
        no-enforce-focus
      >
        <training-view
          v-if="selectedTraining"
          :training="selectedTraining"
        />
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TrainingTypeSelect from "./TrainingTypeSelect";
import TrainingView from "./TrainingView";
export default {
  name: "DisplayTrainings",
  components: {
    TrainingTypeSelect,
    TrainingView
  },
  computed: mapState({
    trainings: state => state.trainings.all
  }),
  data: () => {
    return {
      selectedTrainingType: null,
      selectedYear: null,
      selectedTraining: null,
      fields: [
        "#",
        { key: "name", label: "Training Name", sortable: true },
        {
          key: "training_type.trainingtypename",
          label: "Training Type",
          sortable: true
        },
        { key: "updated_at", label: "Updated At", sortable: true },
        "action"
      ]
    };
  },
  methods: {
    search() {
      let type = this.selectedTrainingType
        ? this.selectedTrainingType.value
        : null;
      let year = this.selectedYear ? this.selectedYear : null;
      console.log(year);
      this.$store.dispatch("trainings/getTrainings", {
        type,
        year
      });
    },
    viewTraining(training) {
      this.selectedTraining = training;
      this.$refs.modalViewTraining.show();
    },
    hideViewTraining() {
      this.selectedTraining = null;
    }
  },
  beforeDestroy() {
    this.$store.dispatch("trainings/clear");
  }
};
</script>
