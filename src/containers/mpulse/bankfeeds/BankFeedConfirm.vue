<template>
  <div>
    <table class="table">
      <tr>
        <td>Store</td>
        <td>{{ bankFeed.store.label }}</td>
      </tr>
      <tr>
        <td>Date From</td>
        <td>{{ bankFeed.dateFrom }}</td>
      </tr>
      <tr>
        <td>Date To</td>
        <td>{{ bankFeed.dateTo }}</td>
      </tr>
      <tr>
        <td colspan="2">
          <b-table :items="bankFeed.lines" hover bordered :fields="fields">
            <template v-slot:cell(index)="data">
              {{ data.index + 1 }}
            </template>
          </b-table>
        </td>
      </tr>
    </table>

    <b-button variant="primary" @click="onConfirm">
      Confirm
    </b-button>  
    <b-button class="ml-1" type="reset" @click="onCancel"
      >Cancel</b-button
    >
    
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "BankFeedConfirm",
  props: {
    bankFeed: Object
  },
  data: function() {
    return {
      fields: [
        { key: "index", label: "#" },
        { key: "transdate", label: "Trans Date" },
        { key: "description", label: "Description" },
        { key: "amount", label: "Amount" },
        { key: "balance", label: "Balance" }
      ]
    };
  },
  methods: {
    onConfirm() {
      let params = {
        storeId: this.bankFeed.store.value,
        dateFrom: this.bankFeed.dateFrom,
        dateTo: this.bankFeed.dateTo,
        lines: this.bankFeed.lines
      };
      Vue.axios
        .post("/confirmAddingBankFeeds", params)
        .then(response => {
          this.$emit("success");
        })
        .catch(error => {
          if (error.response.status == 400) {
            this.showErrorMsg({
              message: error.response.data.message
            });
          } else {
            this.showErrorMsg();
          }
        });
    },
    onCancel() {
      this.$emit("cancel");
    }
  },
  created() {}
};
</script>
