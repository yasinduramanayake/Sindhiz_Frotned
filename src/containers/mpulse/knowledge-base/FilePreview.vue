<template>
  <div>
    <vue-player
      v-if="this.fileType == 'video' && filePath"
      :src="filePath"
      :title="knowledgeBase.name"
    ></vue-player>
    <pdf-preview
      v-if="this.fileType == 'pdf' && fileContent"
      :fileContent="fileContent"
    />
    <div class="col text-center">
      <b-btn variant="success" :href="filePath" target="_blank">Download</b-btn>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import vuePlayer from "@algoz098/vue-player";
import PdfPreview from "../custom-components/PdfPreview";
export default {
  name: "FilePreview",
  components: {
    vuePlayer,
    PdfPreview
  },
  props: {
    knowledgeBase: Object
  },
  methods: {},
  data() {
    return {
      filePath: "",
      fileType: "",
      fileContent: ""
    };
  },
  created() {
    Vue.axios.get("getKnowledgeBaseFile/" + this.knowledgeBase.id).then(res => {
      this.filePath = res.data.file;
      this.fileContent = res.data.content;
    });
    let ext = this.knowledgeBase.path.split(".").pop();
    this.fileType =
      ext == "pdf"
        ? "pdf"
        : _.includes(["mp4", "avi", "mov"], ext)
        ? "video"
        : "other";
  }
};
</script>
