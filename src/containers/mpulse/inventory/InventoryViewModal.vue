<template>
  <div>
    <b-btn variant="success" class="mb-1 pull-right" @click="fixAllDifferences">Fix All Differences</b-btn>
    <b-table
      :items="products"
      hover
      bordered
      :fields="fields"
      :tbody-tr-class="rowClass"
    >
      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template v-slot:cell(actions)="data">
        <b-btn
          v-if="
              data.item.staffcount != 'NA' &&
              data.item.systemcount != 'NA' &&
              data.item.staffcount != data.item.systemcount
          "
          @click="fixDifferent(data.item)"
          >Fix Difference</b-btn
        >
      </template>
    </b-table>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
export default {
  name: "InventoryViewModal",
  props: {
    inventory: Object
  },
  computed: mapState({
    products: state => state.inventories.detail
  }),
  data: () => {
    return {
      fields: [
        { key: "index", label: "#" },
        { key: "productname", label: "Product" },
        { key: "staffcountpk", label: "Staff Count" },
        { key: "systemcountpk", label: "System Count" },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.staffcount != item.systemcount) return "table-warning";
    },
    fixDifferent(product) {
      let params = {
        productId: product.productid,
        storeId: this.inventory.storeid,
        units: product.staffcount - product.systemcount
      };

      Vue.axios
        .post("/fixDifference", params)
        .then(response => {
          this.showSuccessMsg({ message: "Inserted into Inventory Log" });
        })
        .catch(error => {
          this.showErrorMsg();
        });
    },
    fixAllDifferences() {
      let differences = []
      _.each(this.products, (product) => {
        if (product.staffcount != 'NA' &&
              product.systemcount != 'NA' &&
              product.staffcount != product.systemcount) {
          differences.push({
            productId: product.productid,
            units: product.staffcount - product.systemcount
          })
        }
        
      })

      let params = {
        storeId: this.inventory.storeid,
        differences: differences
      }

      Vue.axios
        .post("/fixAllDifferences", params)
        .then(response => {
          this.$emit("success");
          this.showSuccessMsg({ message: "Fixed all differences" });
        })
        .catch(error => {
          this.showErrorMsg();
        });

    }
  },
  beforeMount() {
    this.$store
      .dispatch("inventories/getInventoryDetail", {
        inventoryhash: this.inventory.inventoryhash,
        supplierId: this.inventory.supplierid,
        storeId: this.inventory.storeid
      })
      .then(() => {
        // this.showSuccessMsg();
      })
      .catch(error => {
        this.showErrorMsg();
      });
  },
  beforeDestroy() {
    this.$store.dispatch("inventories/clearDetail");
  }
};
</script>
