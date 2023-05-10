<template>
  <div>
    <b-form-group label="Stores" label-cols-sm="3" label-cols-lg="3">
      <v-select
        multiple
        :options="storeList"
        v-model="selected"
        :onChange="changeStore"
        placeholder="Select Stores"
      ></v-select>
    </b-form-group>
    <b-table :items="items" :fields="fields" hover bordered table-responsive>
      <template v-slot:cell(#)="data">
        {{ data.index + 1 }}
      </template>
      <template v-slot:cell(action)="data">
        <b-btn
          size="sm"
          class="btn-danger mb-2 mx-1"
          @click="onRemove(data.index)"
          >Remove</b-btn
        >
      </template>
    </b-table>
    <b-button type="submit" variant="primary" @click="onSubmit"
      >Submit</b-button
    >
    <b-button class="ml-1" type="button" @click="onCancel">Cancel</b-button>
  </div>
</template>

<script>
import Vue from "vue";
import vSelect from "vue-select";
import { mapState } from "vuex";

export default {
  name: "StaffSetStores",
  props: {
    staff: Object
  },
  components: {
    vSelect
  },
  data: () => {
    return {
      stores: [],
      setStorePrice: false,
      storeList: [],
      selected: [],
      selectedStaffStores: [],
      tempValues: [],
      fields: [
        "#",
        { key: "storeName", label: "Store Name" },
        "action"
      ],
      items: []
    };
  },
  methods: {
    changeStore(store) {
      if (store) {
        this.items = [];
        Vue._.forEach(store, storePrices => {
          this.items.push({
            storeName: storePrices.label,
            store: storePrices.value,
          });
          this.tempValues.push(null);
        });
      }
    },
    onSubmit() {
      let selectedItems = [];
      _.forEach(this.items, staffStore => {
        selectedItems.push({
          staffid: this.staff.staffid,
          storeid: staffStore.store
        });
      });
      Vue.axios
        .post("/staff/stores/save/" + this.staff.staffid, selectedItems)
        .then(() => {
          this.$emit("success");
          this.showSuccessMsg();
        })
        .catch(() => {
          this.showErrorMsg();
        });
    },
    onRemove(index) {
      this.items.splice(index, 1);
      this.selected.splice(index, 1);
    },
    onCancel() {
      this.$emit("cancel");
    }
  },
  created() {
    this.$store
      .dispatch("stores/getCompanyStores", { companyId: this.staff.companyid })
      .then(stores => {
        this.stores = stores;
        this.$store
          .dispatch("staffs/getStaffStores", this.staff)
          .then(data => {
            Vue._.forEach(data, staffStore => {
              this.selectedStaffStores[
                staffStore.storeid
              ] = staffStore;
            });

            Vue._.forEach(this.stores, store => {
              this.storeList.push({
                label: store.storename,
                value: store.storeid
              });
              if (this.selectedStaffStores) {
                if (this.selectedStaffStores[store.storeid]) {
                  this.selected.push({
                    label: store.storename,
                    value: store.storeid
                  });
                  this.items.push({
                    storeName: store.storename,
                    store: store.storeid,
                  });
                  this.tempValues.push(null);
                }
              }
            });
          });
      });
  }
};
</script>
