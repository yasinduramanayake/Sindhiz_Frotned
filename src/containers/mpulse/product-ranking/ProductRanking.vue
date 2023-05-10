<template>
  <div className="animated">
    <b-card>
      <b-form-group label="Sub Category" label-cols-sm="4" label-cols-lg="3">
        <subcat-select :change="changeSubcat" />
      </b-form-group>
    </b-card>
    
    <b-card v-if="loaded">
      <v-client-table :columns="columns" :data="products" :options="options" :theme="theme" id="dataTable">
        <b-form-input type="number" @update="checkRank" :ref="'qty'+props.index" :key="props.row.productid" slot="rank" slot-scope="props" :value="productRanks[props.row.productid]" v-model="productRanks[props.row.productid]" size="sm" class="col-xs-2"></b-form-input>
      </v-client-table>
      <b-button class="mb-1" type="submit" variant="primary" @click="submit" :disabled="!selectedSubcat">Submit</b-button>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import { mapState } from "vuex";
import GridButtons from "../GridButtons";
export default {
  name: "ProductRanking",
  components: {
    AgGridVue,
    GridButtons,
  },
  computed: mapState({
    products: (state) => state.products.bySubcat,
  }),
  watch: {
    products: function(values) {
      Vue._.forEach(values, (product) => {
        this.productRanks[product.productid] = product.colorrank
      });
      this.loaded = true
    }
  },
  data: function () {
    return {
      loaded: false,
      selectedSubcat: null,
      productRanks: {},
      columns: ['barcode', 'productname', 'rank'],
      options: {
        headings: {
          barcode: 'Barcode',
          productname: 'Product Name',
          categoryname: 'Category Name',
          suppliername: 'Supplier Name',
          rank: 'Rank'
        },
        sortable: [],
        filterable: ['barcode', 'productname'],
        sortIcon: {
          base: 'fa',
          up: 'fa-sort-asc',
          down: 'fa-sort-desc',
          is: 'fa-sort'
        },
        pagination: {
          chunk: 5,
          edge: true,
          nav: 'scroll'
        },
        uniqueKey: "productid"
      },
      theme: 'bootstrap4',
    };
  },
  methods: {
    changeSubcat(subcat) {
      this.selectedSubcat = subcat;
      if (subcat) {
        this.$store.dispatch("products/getBySubcat", subcat.value);
      } else {
        this.$store.dispatch("products/clearBySubcat");
      }
    },
    checkRank(value) {
      console.log(value)
      if (value != "" && (parseInt(value) < 1 || parseInt(value) > 10)) {
          this.showErrorMsg({message: "Rank value shoule be from 1 to 10"})
        }
    },
    submit() {
      let productData = []
      let error = false;
      _.forOwn(this.productRanks, function(value, key) {
        if (value != "" && (parseInt(value) < 1 || parseInt(value) > 10)) {
          error = true
        }
        productData.push({
          productId: key,
          rank: value
        })
      });

      if (error) {
        this.showErrorMsg({message: "Rank value shoule be from 1 to 10"})
        return
      }

      axios
        .post("/submitProductRank", productData)
        .then(response => {
          this.showSuccessMsg()
        })
        .catch(error => {
          this.showErrorMsg()
        })
    }
  },
};
</script>
