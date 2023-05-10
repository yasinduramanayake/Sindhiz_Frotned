<template>
  <div>
    <b-table :items="orders" hover bordered :fields="fields">
      <template v-slot:cell(orderpercent)="data">
        <b-form-input type="number" v-if="data.item.id == 45" v-model="bata_order_percent"></b-form-input>
        <b-form-input type="number" v-if="data.item.id == 46" v-model="ita_order_percent"></b-form-input>
        <b-form-input type="number" v-if="data.item.id == 47" v-model="pml_order_percent"></b-form-input>
      </template>
      <template v-slot:cell(tobpercent)="data">
        <b-form-input type="number" v-if="data.item.id == 45" v-model="bata_tob_percent"></b-form-input>
        <b-form-input type="number" v-if="data.item.id == 46" v-model="ita_tob_percent"></b-form-input>
        <b-form-input type="number" v-if="data.item.id == 47" v-model="pml_tob_percent"></b-form-input>
      </template>
    </b-table>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "StoreOrder",
  props: {
    storeProfile: Object
  },
  data: () => {
    return {
      fields: [
        { key: "supplier", label: "Company" },
        { key: "order_per_week", label: "Order Per Week" },
        { key: "orderpercent", label: "Order %%" },
        { key: "tobpercent", label: "Tobacco %%" }

      ],
      orders: [],
      bata_order_percent: null,
      ita_order_percent: null,
      pml_order_percent: null,
      bata_tob_percent: null,
      ita_tob_percent: null,
      pml_tob_percent: null
    };
  },
  created() {
    this.bata_order_percent = this.storeProfile.bata_order_percent;
    this.ita_order_percent = this.storeProfile.ita_order_percent;
    this.pml_order_percent = this.storeProfile.pml_order_percent;
    this.bata_tob_percent = this.storeProfile.bata_tob_percent;
    this.ita_tob_percent = this.storeProfile.ita_tob_percent;
    this.pml_tob_percent = this.storeProfile.pml_tob_percent;
    Vue.axios
      .post("/getStoreOrderPerWeek", {
        storeId: this.storeProfile.storeid
      })
      .then(res => {
        _.forEach(res.data, item => {
          {
            this.orders.push({
              id: item.distributorid,
              supplier: item.distributorname,
              order_per_week: item.order_per_week
            });
          }
        });
      });
  }
};
</script>
