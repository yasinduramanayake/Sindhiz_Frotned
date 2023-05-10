<template>
  <div>
    <b-btn variant="success" :href="filePath" target="_blank"
      >Click Here to View Full Recipt</b-btn
    >
  </div>
</template>

<script>
import Vue from "vue";
import ClaimApi from "@/store/modules/expenses";
export default {
  name: "Buttonfilecomponent",
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
      const res = await ClaimApi.Getfile(params);
      this.filePath = res.data.file;
    },
  },
  async created() {
    await this.getFile(this.item);
  },
};
</script>
