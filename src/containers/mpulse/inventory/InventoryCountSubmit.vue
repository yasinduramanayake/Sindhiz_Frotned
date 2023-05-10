<template>
  <div className="animated">
    <b-card>
      <b-form
        v-on:submit.prevent="onSubmit"
        v-on:reset.prevent="onReset"
        novalidate
      >
        <b-row>
          <b-col sm="4">
            <b-button
              variant="primary"
              :disabled="!selectedStore || !selectedSupplier"
              @click="submit"
              >Submit</b-button
            >
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <div>
      <b-modal
        ref="modalConfirm"
        title="Confirm Submission"
        @ok="commitSubsission"
        no-enforce-focus
      >
        <inventory-count-confirmation :products="selectedProducts" />
        <div class="d-block text-center"></div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import InventoryCountConfirmation from "./InventoryCountConfirmation";

export default {
  name: "InventoryCountSubmit",
  components: {
    InventoryCountConfirmation
  },
  props: {
    cartonQtys: Object,
    packetQtys: Object,
    products: Array,
    selectedSupplier: Object,
    selectedStore: Object
  },
  computed: {
    storeList() {
      let list = [];
      Vue._.forEach(this.$store.state.stores.all, store => {
        list.push({ label: store.storename, value: store.storeid });
      });
      return list;
    }
  },
  data: function() {
    return {
      selectedProducts: []
    };
  },
  methods: {
    submit() {
      this.selectedProducts = [];

      _.each(this.products, product => {
        if (
          this.cartonQtys[product.productid] > 0 ||
          this.packetQtys[product.productid] > 0
        ) {
          this.selectedProducts.push({
            productId: product.productid,
            cartonQty: this.cartonQtys[product.productid],
            packetQty: this.packetQtys[product.productid],
            productName: product.productname
          });
        }
      });

      if (this.selectedProducts.length == 0) {
        this.showWarnMsg({
          message: "Please update the carton or packet quality"
        });
        return;
      }

      this.$refs.modalConfirm.show();
    },
    commitSubsission() {
      let productData = [];

      _.each(this.products, product => {
        if (
          this.cartonQtys[product.productid] > 0 ||
          this.packetQtys[product.productid] > 0
        ) {
          productData.push({
            productId: product.productid,
            cartonQty: this.cartonQtys[product.productid],
            packetQty: this.packetQtys[product.productid]
          });
        }
      });

      let params = {
        productData: productData,
        storeId: this.selectedStore.value,
        supplierId: this.selectedSupplier.value
      };

      axios
        .post("/createInventoryCount", params)
        .then(response => {
          this.selectedStore = null;
          this.$emit("success");
          this.showSuccessMsg({
            message: "Inventory Count Submitted Successfully",
            timeout: 30000
          });
        })
        .catch(error => {
          this.showErrorMsg();
        });
    }
  }
};
</script>
