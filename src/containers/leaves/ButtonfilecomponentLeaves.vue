<template>
    <div>
      <b-btn variant="success" :href="filePath" target="_blank"
        >Click Here to View Certificate</b-btn
      >
    </div>
  </template>
  
  <script>
  import Vue from "vue";
  import LeavesApi from "@/store/modules/leaves";
  export default {
    name: "ButtonfilecomponentLeaves",
    props: {
      item: Object,
    },
  
    data: () => {
      return {
        filePath: "",
      };
    },
    methods: {
      async getFile(item) {
        const params = {
          id: item.id,
        };
        const res = await LeavesApi.Getfile(params);
        this.filePath = res.data.file;
      },
    },
    async created() {
      await this.getFile(this.item);
    },
  };
  </script>
  