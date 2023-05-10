<template>
  <div>
    <div v-if="training">
      <h2>{{ training.name }}</h2>
      <b-card v-if="training.path" header="File">
        <b-card-body>
          <vue-player
            v-if="this.fileType == 'video' && filePath"
            :src="filePath"
            :title="knowledgeBase.name"
          ></vue-player>
          <div v-if="this.fileType == 'pdf' && fileContent">
            <b-btn @click="back">Back</b-btn>
            {{ currentPage }} / {{ pageCount }}
            <b-btn @click="next">Next</b-btn>
            <pdf
              ref="myPdfComponent"
              :src="fileContent"
              @num-pages="pageCount = $event"
              @page-loaded="currentPage = $event"
              :page="currentPage"
            ></pdf>
          </div>
          <div class="col text-center">
            <b-btn variant="success" :href="filePath" target="_blank"
              >Download</b-btn
            >
          </div>
        </b-card-body>
      </b-card>
      <b-card header="Content">
        <b-card-body>
          <span v-html="training.content"></span>
        </b-card-body>
      </b-card>
      <b-card>
        <b-form-group>
          <b-form-checkbox id="accept" v-model="acknowledge">
            <span>Read and understood module of “{{ training.name }}”</span>
            <br />
            <strong>I acknowledge</strong>
          </b-form-checkbox>
        </b-form-group>
        <b-button variant="primary" :disabled="!acknowledge" @click="submit">
          Submit
        </b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import vuePlayer from "@algoz098/vue-player";
import pdf from "vue-pdf";
export default {
  name: "TrainingDetail",
  components: {
    vuePlayer,
    pdf
  },
  computed: mapState({
    pendingTrainings: state => state.trainings.pendingTrainings
  }),
  watch: {
    pendingTrainings: function(value) {
      _.forEach(value, training => {
        if (training.id == this.$route.params.id) {
          this.training = training;
        }
      });
    }
  },
  data: () => {
    return {
      training: null,
      acknowledge: false,
      filePath: "",
      fileType: "",
      fileContent: "",
      pageCount: 0,
      currentPage: 1
    };
  },
  methods: {
    back() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    next() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    submit() {
      Vue.axios
        .post("/acknowledgeTraining", this.training)
        .then(() => {
          this.showSuccessMsg();
          this.$router.push({ name: "Home" });
        })
        .catch(() => {
          this.showErrorMsg();
        });
    }
  },
  created() {
    this.$store.dispatch("trainings/getPendingTrainings");
    Vue.axios.get("getTrainingFile/" + this.$route.params.id).then(res => {
      this.filePath = res.data.file;
      let ext = this.filePath.split(".").pop();
      this.fileType =
        ext == "pdf"
          ? "pdf"
          : _.includes(["mp4", "avi", "mov"], ext)
          ? "video"
          : "other";
      this.fileContent = res.data.content;
    });
  }
};
</script>
