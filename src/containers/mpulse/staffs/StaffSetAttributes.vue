<template>
  <div>
    <b-form-group label="Attributes" label-cols-sm="3" label-cols-lg="3">
        <v-select multiple :options="attributeList" v-model="selected" :onChange="changeAttribute" placeholder="Select Attributes"></v-select>
    </b-form-group>
    <b-table :items="items" :fields="fields" hover bordered table-responsive>
        <template v-slot:cell(#)="data">
          {{ data.index + 1 }}
        </template>
        <template v-slot:cell(attributeValue)="data">
          <div v-if="!data.item.editing">
           <b-button block variant="link" class="pull-left" @click="enableEditing(data.index)">{{data.item.attributeValue}}</b-button>
          </div>
          <div v-if="data.item.editing">
            <b-input type="text" v-model="tempValues[data.index]" class="input edit-attribute" :key="data.index"/>
            <button @click="saveEdit(data.index)" class="btn btn-primary"><i class="cui-check icons font-1x2"></i></button>
            <b-button class="ml-1" @click="disableEditing(data.index)"><i class="fa fa-close icons font-1x2"></i></b-button>
          </div>
        </template>
        <template v-slot:cell(action)="data">
          <b-btn size="sm" class="btn-danger mb-2 mx-1" @click="onRemove(data.index)">Remove</b-btn>
        </template>

    </b-table>
    <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
    <b-button class="ml-1" type="button" @click="onCancel">Cancel</b-button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import vSelect from 'vue-select'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'StaffSetAttributes',
    props: {
      staff: Object
    },
    components: {
      vSelect
    },
    computed: mapState({
      attributes: state => state.staffs.attributes
    }),
    data: () => {
      return {
        setStorePrice:false,
        attributeList: [],
        selected:[],
        selectedStaffAttributes:[],
        tempValues: [],
        fields: [
          '#',
          { key: 'attributeName', label: 'Attribute Name' },
          { key: 'attributeValue', label: 'Value' },
          'action',
        ],
        items: []
      }
    },
    methods: {
        enableEditing: function(index) {
          this.tempValues[index] = this.items[index].attributeValue;
          this.items[index].editing = true;
        },
        disableEditing: function(index) {
          this.tempValues[index] = null;
          this.items[index].editing = false;
        },
        saveEdit: function(index) {
          this.items[index].attributeValue = this.tempValues[index];
          this.disableEditing(index);
        },
        changeAttribute(attribute) {
          if(attribute) {
            this.items=[]
            _.forEach(attribute, (attributePrices) => {
              if(this.selectedStaffAttributes) {
                if(this.selectedStaffAttributes[attributePrices.value]) {
                  var attributeValue = this.selectedStaffAttributes[attributePrices.value].value;
                  this.items.push({
                    attributeName: attributePrices.label,
                    attributeValue:attributeValue,
                    attribute: attributePrices.value,
                    editing: false
                  })
                  this.tempValues.push(null)
                  return;
                }
              }
              this.items.push({
                attributeName: attributePrices.label,
                attributeValue: "0",
                attribute: attributePrices.value,
                editing: false
              })
              this.tempValues.push(null)
            })
          }
        },
        onSubmit() {
          let selectedItems=[]
          _.forEach(this.items, (staffAttribute) => {
            selectedItems.push({
             staffid: this.staff.staffid,
             value: staffAttribute.attributeValue,
             attributeid: staffAttribute.attribute
            })
          })
          Vue.axios.post('/staff/attributes/save/'+this.staff.staffid, selectedItems)
          .then((response) => {
            this.$emit('success')
            this.showSuccessMsg()
          }).catch(() => {
            this.showErrorMsg()
          })
        },
        onRemove(index) {
          this.items.splice(index, 1);
          this.selected.splice(index,1);
          // this.tempValues.splice(index,1);
        },
        onCancel() {
          this.$emit('cancel')
        }
    },
    created () {
      this.$store.dispatch('staffs/getStaffAttributes', this.staff)
        .then(data => {
          _.forEach(data, (staffAttribute) => {
              this.selectedStaffAttributes[staffAttribute.attributeid] = staffAttribute
          })

          Vue._.forEach(this.attributes, (attribute) => {
            this.attributeList.push({label: attribute.attributename, value: attribute.attributeid})
            if(this.selectedStaffAttributes){
              if(this.selectedStaffAttributes[attribute.attributeid]){
                this.selected.push({label: attribute.attributename, value: attribute.attributeid})
                var attributeValue = this.selectedStaffAttributes[attribute.attributeid].value;
                this.items.push({
                  attributeName: attribute.attributename,
                  attributeValue: attributeValue,
                  attribute:attribute.attributeid,
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
<style lang="scss">
.edit-attribute{
  max-width: 80px;
  margin-right: 5px;
  padding: 5px;
  display: inline-block;
  float: left;
}
@media(max-width:480px){
  .edit-attribute{
    display:block;
    width: 100%;
    margin-bottom: 5px;
    float:none;
  }
}
</style>
