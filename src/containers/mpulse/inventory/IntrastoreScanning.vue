<template>
  <div className="animated">
    <b-card>
      <b-card-body>
        <b-form-group label="From store" label-cols-sm="4" label-cols-lg="3">
          <store-select v-model="fromStore"></store-select>
        </b-form-group>
        <b-form-group label="To store" label-cols-sm="4" label-cols-lg="3">
          <store-select v-model="toStore"></store-select>
        </b-form-group>
        <b-form-group
          label="Enter barcode here"
          label-cols-sm="4"
          label-cols-lg="3"
        >
          <b-form-input
            type="text"
            v-model="barcode"
            @keydown.native="handleEnterKey"
          ></b-form-input>
        </b-form-group>
        <b-button
          class="pull-right"
          variant="success"
          @click="addeIntraStoreProduct"
          :disabled="!fromStore || barcode == ''"
          >Add IntraStore Product</b-button
        >
      </b-card-body>
    </b-card>

    <b-card>
      <b-card-body>
        <b-table
          small
          :fields="fields"
          :items="items"
          outlined
          ref="table"
        >
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>

          <template #cell(quantity)="data">
            <b-form-input
              type="number"
              v-model="data.item.quantity"
              @change="updateQuantity(data.item)"
            ></b-form-input>
          </template>

          <template #cell(actions)="data">
            <b-button
              variant="danger"
              @click="removeProduct(data.item.productid)"
              size="sm"
              ><i class="fa fa-remove"></i
            ></b-button>
          </template>
          <template #custom-foot="data">
            <b-tr v-if="items.length > 0">
          <b-td></b-td>
          <b-td></b-td>
          <b-td></b-td>
          <b-td></b-td>
          <b-td></b-td>
          <b-td>{{ total }}</b-td>
          <b-td></b-td>
        </b-tr>

          </template>
        </b-table>
        <b-button
          type="submit"
          variant="primary"
          class="pull-right"
          :disabled="
            !fromStore ||
              !toStore ||
              items.length == 0 ||
              fromStore.value == toStore.value
          "
          @click="submit"
        >
          Submit
        </b-button>
      </b-card-body>
    </b-card>

    <b-modal
      ref="modalConfirm"
      title="Intrastore Confirm"
      @ok="confirm"
      no-enforce-focus
    >
      <intrastore-scanning-modal :products="items" />
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import IntrastoreScanningModal from "./IntrastoreScanningModal";

export default {
  name: "IntrastoreScanning",
  components: {
    IntrastoreScanningModal
  },
  computed: {
    ...mapState({
      stores: state => state.stores.all
    })
  },
  watch: {
    stores: function(values) {
      _.each(values, store => {
        if (store.storeid == 46) {
          this.fromStore = { label: store.storename, value: 46 };
        }
      });
    }
  },
  data: function() {
    return {
      total: 0,
      barcode: "",
      fromStore: null,
      toStore: null,
      items: [],
      fields: [
        "index",
        "productid",
        "productname",
        "price",
        "quantity",
        "total",
        "actions"
      ]
    };
  },
  methods: {
    handleEnterKey(event) {
      if (event.which == 13) {
        this.addeIntraStoreProduct();
      }
    },
    updateQuantity(item) {
      item.total = (item.price * item.quantity).toFixed(2);
      this.updateTotal()
      this.$refs.table.refresh();
    },
    updateTotal() {
      let total = 0
      _.each(this.items, item => {
        total += item.price * item.quantity
      })
      this.total = total.toFixed(2)
    },
    removeProduct(productId) {
      _.remove(this.items, item => {
        return item.productid == productId;
      });
      this.$refs.table.refresh();
    },
    addeIntraStoreProduct() {
      _.each(this.items, item => {
        if (item.barcode == this.barcode) {
          this.barcode = "";
          this.showWarnMsg({ message: "This product is in the list already" });
        }
      });

      if (this.barcode == "") {
        return;
      }
      let params = { storeId: this.fromStore.value, barcode: this.barcode };
      Vue.axios
        .post("/getIntraStoreProducts", params)
        .then(response => {
          if (typeof response.data[0] !== "undefined") {
            let item = _.clone(response.data[0]);
            item.quantity = 1;
            item.total = item.price;
            this.items.push(item);
            this.updateTotal()
            this.barcode = "";
            this.showSuccessMsg();
          } else {
            this.showWarnMsg({ message: "Not found this intra store product" });
          }
        })
        .catch(error => {
          console.log(error);
          if (error.response.status == 400) {
            this.showErrorMsg({
              message: error.response.data.message
            });
          } else {
            this.showErrorMsg();
          }
        });
    },
    submit() {
      this.$refs.modalConfirm.show();
    },
    confirm() {
      let params = {
        fromStoreId: this.fromStore.value,
        toStoreId: this.toStore.value,
        products: _.map(this.items, item => {
          return {
            productid: item.productid,
            price: item.price,
            quantity: item.quantity
          };
        })
      };

      Vue.axios
        .post("/createIntraStoreScannings", params)
        .then(response => {
          this.items = [];
          this.showSuccessMsg();
        })
        .catch(error => {
          if (error.response.status == 422) {
            this.showErrorMsg({
              message: error.response.data.message
            });
          } else {
            this.showErrorMsg();
          }
        });
    }
  },
  created() {}
};
</script>
