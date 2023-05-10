<template>
  <div>
    <b-table :items="items" hover bordered :fields="fields">
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(actions)="data">
        <b-button size="sm" variant="success" @click="viewPriceBoard(data.item.hash)"
          >View
        </b-button>
      </template>
    </b-table>
    <b-modal
      ref="modalPriceBoard"
      title="View Price Board"
      @hide="hideModal"
      no-enforce-focus
    >
      <price-board-modal :hash="selectedHash" />
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import PriceBoardModal from "./PriceBoardModal";
export default {
  name: "PriceBoardTable",
  components: {
    PriceBoardModal
  },
  computed: mapState({}),
  data: () => {
    return {
      showModal: false,
      selectedHash: null,
      items: [],
      fields: [
        "index",
        { key: "hash", label: "Hash" },
        { key: "stores", label: "Stores" },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  methods: {
    viewPriceBoard(hash) {
    this.selectedHash = hash
      this.showModal = true;
      this.$refs.modalPriceBoard.show();
    },
    hideModal() {
      this.showModal = false;
    },
    refresh() {
      Vue.axios
      .post("getPriceBoards")
      .then(response => {
        this.items = response.data;
        this.showSuccessMsg();
      })
      .catch(error => {
        this.showErrorMsg();
      });
    }

  },
  created() {
    this.refresh()
  }
};
</script>
