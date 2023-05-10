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
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import vuePlayer from "@algoz098/vue-player";
import pdf from "vue-pdf";
export default {
  name: "TrainingDetail",
  props: {
      training: Object
  },
  components: {
    vuePlayer,
    pdf
  },
  data: () => {
    return {
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
  },
  created() {
    Vue.axios.get("getTrainingFile/" + this.training.id).then(res => {
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
