<template>
  <div>
    <b-table :items="items" hover bordered :fields="fields">
    </b-table>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from "vuex";
export default {
  name: "PriceBoardModal",
  props: {
    hash: String
  },
  computed: mapState({
  }),
  data: () => {
    return {
      items: [],
      fields: [
        { key: "position", label: "Position" },
        { key: "subcatname", label: "Subcat" },
      ],
    };
  },
  created() {
      let params = { hash: this.hash }
      Vue.axios.post("getPriceBoardDetail", params)
      .then((response) => {
          this.items = response.data
          this.showSuccessMsg();
        })
        .catch((error) => {
          this.showErrorMsg();
        });
  }
  
};
</script>
