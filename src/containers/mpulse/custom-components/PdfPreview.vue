<template>
  <div>
    <b-btn @click="back" size="sm">Back</b-btn>
    {{ currentPage }} / {{ pageCount }}
    <b-btn @click="next" size="sm">Next</b-btn>
    <pdf
      ref="myPdfComponent"
      :src="fileContent"
      @num-pages="pageCount = $event"
      @page-loaded="currentPage = $event"
      :page="currentPage"
    ></pdf>
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  name: "PdfPreview",
  components: {
    pdf
  },
  props: {
    fileContent: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
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
    }
  }
};
</script>
