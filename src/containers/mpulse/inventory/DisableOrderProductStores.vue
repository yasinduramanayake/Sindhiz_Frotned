<template>
  <div>
    <b-form-checkbox v-model="isCheckAll" @change="selectAllStores" class="mb-2">
      Select All Stores
    </b-form-checkbox>
    <b-table :items="stores" hover bordered :fields="fields" v-if="isReady">
      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template v-slot:cell(disable)="data">
        <c-switch
          class="mx-1"
          color="primary"
          variant="3d"
          size="sm"
          v-model="storeDisablesUpdated[data.item.storeid]"
          @change="changeStatus(data.item.storeid)"
        />
      </template>
    </b-table>
  </div>
</template>

<script>
import Vue from "vue";
import { Switch as cSwitch } from "@coreui/vue";
export default {
  name: "DisableOrderProductStores",
  components: {
    cSwitch
  },
  props: {
    product: Object,
    supplier: Object
  },
  watch: {
    stores: function(values) {
      let countDisble = 0;
      Vue._.forEach(values, store => {
        this.storeDisables[store.storeid] = store.isdisable ? true : false;
        this.storeDisablesUpdated[store.storeid] = this.storeDisables[
          store.storeid
        ];
        if (store.isdisable) countDisble++;
      });
      this.isReady = values.length ? true : false;
      this.isCheckAll = values.length == countDisble ? true : false;
    }
  },
  data: () => {
    return {
      fields: [
        { key: "index", label: "#" },
        { key: "storename", label: "Store" },
        { key: "disable", label: "Disable" }
      ],
      stores: [],
      storeDisables: {},
      storeDisablesUpdated: {},
      isReady: false,
      isCheckAll: false
    };
  },
  methods: {
    selectAllStores(value) {
      let params = {
        storeIds: _.map(this.stores, store => {
          return store.storeid;
        }),
        supplierId: this.supplier.value,
        productId: this.product.productid,
        isDisable: value ? 1 : 0
      };
      axios
        .post("/updateAllStoresDisableProduct", params)
        .then(response => {
          this.showSuccessMsg();
          this.clearData();
        })
        .catch(error => {
          this.showErrorMsg();
        });
    },
    changeStatus(storeid) {
      if (this.storeDisablesUpdated[storeid] !== this.storeDisables[storeid]) {
        let params = {
          storeId: storeid,
          supplierId: this.supplier.value,
          productId: this.product.productid,
          isDisable: this.storeDisablesUpdated[storeid] ? 1 : 0
        };
        axios
          .post("/updateDisableProduct", params)
          .then(response => {
            this.showSuccessMsg();
            this.storeDisables[storeid] = this.storeDisablesUpdated[storeid];
          })
          .catch(error => {
            this.showErrorMsg();
          });
      }
    },
    clearData() {
      this.isReady = false;
      this.stores = [];
      this.storeDisables = {};
      this.storeDisablesUpdated = {};
      this.isReady = false;
      Vue.axios
        .post("/getDisableStores", { productId: this.product.productid })
        .then(res => {
          this.stores = res.data;
        });
    }
  },
  created() {
    this.clearData();
  }
};
</script>
