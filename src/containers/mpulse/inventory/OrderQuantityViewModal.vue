<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-form-group label="Weeks Average">
        <v-select :options="weekList" v-model="selectedWeek"></v-select>
      </b-form-group>
      <b-form-group label="Public Holiday Quota">
          <v-select :options="percentOPtions" v-model="extraPercent" placeholder="Select Percentage"></v-select>
      </b-form-group>
      <b-button variant="success" class="pull-right mb-2" :disabled="!selectedWeek || !extraPercent" @click="getData">Get Order Quantity</b-button>
      </b-col>
    </b-row>
    <b-row v-if="items!=null && items.length > 0">
      <b-col>
        <b-form-checkbox v-model="showAllProducts"  @change="toggleProducts" size="lg">Show All Products</b-form-checkbox>
      </b-col>
    </b-row>
    <br/>

    <b-row>
      <b-col lg="12">
        <b-table :items="items" hover bordered :fields="fields">
          <template v-slot:cell(index)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(minorder)="data">
            <b>{{ data.value }}</b>
          </template>
          <template #cell(avgorder)="data">
            <b>{{ data.value }}</b>
          </template>
        </b-table>
      </b-col>

    </b-row>

  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from "vuex";
import { Switch as cSwitch } from "@coreui/vue";

export default {
  name: "OrderQuantityViewModal",
  props: {
    stocktake: Object,
    storeId: Number
  },
  computed:
{
  percentOPtions() {
    let list = []
    list.push({
        label: '0%',
        value: 0
      })

    list.push({
        label: '10%',
        value: 10
      })

      list.push({
          label: '20%',
          value: 20
        })

    list.push({
        label: '30%',
        value: 30
      })
      list.push({
          label: '40%',
          value: 40
        })
        list.push({
            label: '50%',
            value: 50
          })
          list.push({
              label: '60%',
              value: 60
            })
            list.push({
                label: '70%',
                value: 70
              })
              list.push({
                  label: '80%',
                  value: 80
                })
                list.push({
                    label: '90%',
                    value: 90
                  })
                  list.push({
                      label: '100%',
                      value: 100
                    })

    return list
  },

},

  data: () => {
    return {
      extraPercent: {    label: '0%',value: 0},
      showAllProducts: false,
      items: [],
      actualItems: [],
      fields: [
        { key: "index", label: "#" },
        { key: "prodName", label: "Product" },
        { key: "curstock", label: "Current Stock" },
        { key: "avgsale", label: "Avg Sale" },
        { key: "avgorder", label: "Order by Avg Sale", variant: 'secondary' },
      ],
      weekList: [2, 4, 6, 8],
      selectedWeek: 4
    };
  },
  methods: {
    toggleProducts(){
      if(this.showAllProducts == true){
        this.items = this.actualItems;
      }
      else{
        if(this.actualItems.length > 0){
          this.items = this.actualItems.filter(prd =>{
            return prd.avgorder > 0
          })
        }
      }
    },
    getData() {
      Vue.axios.post('/getOrderQuantity', {
        stocktakehash: this.stocktake.stocktakehash,
        supplierId: this.stocktake.supplierid,
        storeId: this.storeId,
        numOfWeek: this.selectedWeek,
        extraPercent: this.extraPercent.value
      }).then((res) => {
        this.actualItems = res.data
        if(this.showAllProducts == true){
          this.items = this.actualItems
        }
        else{
          if(this.actualItems.length > 0){
            this.items = this.actualItems.filter(prd =>{
              return prd.avgorder > 0
            })
          }
        }
        this.showSuccessMsg()
      });
    }
  },
  beforeMount() {

  }
};
</script>
