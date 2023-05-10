<template>
  <div>
    <!--<h6>Simple Form</h6>-->
    <b-form-group label="Store" label-cols-sm="3" label-cols-lg="3">
      <v-select multiple  :options="storeList" v-model="selected" :onChange="changeStore" placeholder="Select Store"></v-select>
    </b-form-group>
    <b-table :items="items"  :fields="fields"  hover bordered table-responsive>
      <template v-slot:cell(#)="data">
        {{ data.index + 1 }}
      </template>
      <template v-slot:cell(saleprice)="data">
        <div v-if="!data.item.editing">
          <b-button block variant="link" class="pull-left"
          @click="enableEditing(data.index)">{{data.item.saleprice}}</b-button>
        </div>
        <div v-if="data.item.editing">
          <input  type="number"
              v-model="tempValues[data.index]" class="input edit-sale-price" :key="data.index" />
          <button @click="saveEdit(data.index)" class="btn btn-primary">
            <i class="cui-check icons font-1x2"></i>
          </button>
          <b-button class="ml-1"  @click="disableEditing(data.index)">
            <i class="fa fa-close icons font-1x2"></i>
          </b-button>
        </div>
      </template>
      <template v-slot:cell(action)="data">
        <b-btn size="sm" class="btn-danger mb-2 mx-1"  @click="onRemove(data.index)">Remove</b-btn>
      </template>

    </b-table>
    <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
    <b-button class="ml-1" type="button" @click="onCancel">Cancel</b-button>
    <br/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import vSelect from 'vue-select'
  import {ClientTable, Event} from 'vue-tables-2'
  import { mapState, mapActions } from 'vuex'

  Vue.use(ClientTable)

  export default {
    name: 'SetStorePrice',
    props: {
      product: Object
    },
    components: {
      vSelect,
      ClientTable,
    },
    computed: mapState({
      storePrices: state => state.storePrices.prices,
      stores: state => state.stores.all,
    }),
    data: () => {
      return {
        storeList: [],
        selected:[],
        selectedStorePrices:[],
        tempValues: [],
        fields: [
          '#',
          { key: 'storeName', label: 'Store Name' },
          { key: 'saleprice', label: 'Sale Price' },
          'action',
        ],
       items: []
      }
    },
    methods: {
      enableEditing: function(index){
        this.tempValues[index] = this.items[index].saleprice;
        this.items[index].editing = true;
      },
      disableEditing: function(index){
        this.tempValues[index] = null;
        this.items[index].editing = false;
      },
      saveEdit: function(index){
        // However we want to save it to the database
        this.items[index].saleprice = this.tempValues[index];
        this.disableEditing(index);
      },
      changeStore(store) {
        if(store){
          this.items=[]
          _.forEach(store, (storePrices) => {
            if(this.selectedStorePrices){
              if(this.selectedStorePrices[storePrices.value]){
                var storeprice=this.selectedStorePrices[storePrices.value].saleprice;
                this.items.push({
                  storeName:storePrices.label,
                  saleprice:storeprice,
                  store:storePrices.value,
                  tempValue: null,
                  editing: false
                })
                this.tempValues.push(null)
                return;
              }
            }
            this.items.push({
              storeName:storePrices.label,
              saleprice:"0",
              store:storePrices.value,
              tempValue: null,
              editing: false
            })
          })
          this.tempValues.push(null)
        }
      },
      onSubmit() {
        let selectedItems=[]
        _.forEach(this.items, (storePrices) => {
          selectedItems.push({
            productid:this.product.productid,
            saleprice:storePrices.saleprice,
            storeid:storePrices.store
          })
        })
        Vue.axios.post('/saveStorePrices/'+this.product.productid, selectedItems)
        .then((response) => {
          this.$emit('success')
          this.showSuccessMsg()
        }).catch(() => {
          this.showErrorMsg
        })
      },
      onRemove(index) {
        this.items.splice(index, 1);
        this.selected.splice(index,1);
      },
      onCancel() {
        this.$emit('cancel')
      }
    },
    created () {
     this.$store.dispatch('stores/getStores')
      this.$store.dispatch('storePrices/getPrices', this.product)
      .then(data => {
      _.forEach(data, (storePrice) => {
        this.selectedStorePrices[storePrice.storeid] = storePrice
      })
      Vue._.forEach(this.stores, (store) => {
        this.storeList.push({label: store.storename, value: store.storeid})
          if(this.selectedStorePrices){
            if(this.selectedStorePrices[store.storeid]){
              this.selected.push({label: store.storename, value: store.storeid})
              var saleprice = this.selectedStorePrices[store.storeid].value;
              this.items.push({
                storeName: store.storename,
                saleprice: saleprice,
                store:store.storeid,
                tempValue: null,
                editing: false
              })
              this.tempValues.push(null)
            }
          }
        })
      })
    }
  }
</script>
<style >
  .edit-sale-price{
  max-width: 80px;
  margin-right: 5px;
  padding: 5px;
  display: inline-block;
  /* margin-top: 0px; */
  float: left;
  }
  @media(max-width:480px){
  .edit-sale-price{
  display:block;
  width: 100%;
  margin-bottom: 5px;
  float:none;
  }
  }
</style>
