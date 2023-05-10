<template>
  <div className="animated">
    <b-card>
      <b-card-body>
        <b-form-group label="Store" label-cols-sm="4" label-cols-lg="3">
          <store-select
            v-model="selectedStores"
            onlyStaff
            multiple
            :change="changeStores"
          ></store-select>
        </b-form-group>
      </b-card-body>
    </b-card>

    <b-card v-if="subcats.length > 0">
      <b-card-body>
        <b-table small :fields="fields" :items="items" outlined>
          <template #cell(position)="data" class="w-25">
            {{ data.index + 1 }}
          </template>

          <template #cell(subcat)="data">
            <subcat-select v-model="selectedSubcats[data.index]" />
          </template>
        </b-table>

        <b-button
          type="submit"
          variant="primary"
          class="pull-right"
          :disabled="selectedStores.length == 0"
          @click="submit"
        >
          Submit
        </b-button>
      </b-card-body>
    </b-card>

    <b-card title="View Price Board">
      <b-card-body>
        <price-board-table ref="priceBoardTable"/>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import PriceBoardTable from "./PriceBoardTable";

export default {
  name: "PriceBoard",
  components: {
    PriceBoardTable
  },
  computed: {
    ...mapState({
      subcats: state => state.subCategories.productRanking
    })
  },
  watch: {},
  data: function() {
    return {
      selectedStores: [],
      selectedSubcats: new Array(36),
      items: _.range(36),
      fields: [{ key: "position", thClass: "w-25" }, "subcat"]
    };
  },
  methods: {
    changeStores(values) {
      if (values.length == 0) {
        this.selectedSubcats = new Array(36)
      } else {
        let lastStoreId = values[values.length-1].value
        Vue.axios
        .post("/getPriceBoardOfStore", {storeId: lastStoreId})
        .then((response) => {
          this.selectedSubcats = _.map(response.data, priceboard =>  {
            return priceboard.subcat ? {value: priceboard.subcat, label: priceboard.subcatname} : null;
          })
          
          this.showSuccessMsg();
        })
        .catch(error => {
          this.showErrorMsg();
        });
      }
    },
    submit() {
      let storeIds = _.map(this.selectedStores, store => {
        return store.value;
      });
      let subcats = _.map(this.selectedSubcats, subcat => {
        return subcat ? subcat.value : null;
      });
      let params = { storeIds, subcats };
      Vue.axios
        .post("/submitPriceBoard", params)
        .then(() => {
          this.$refs.priceBoardTable.refresh()
          this.showSuccessMsg();
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
    }
  },
  created() {
    this.$store.dispatch("subCategories/getProductRankingSubCategories");
  }
};
</script>
