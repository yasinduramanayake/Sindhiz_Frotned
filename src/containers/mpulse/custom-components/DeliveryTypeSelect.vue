<template>
<v-select :options="deliveryTypeList" :value="value" @input="update" :multiple="multiple" :placeholder="getPlaceHolder()" :onChange="onChange"></v-select>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'DeliveryTypeSelect',
  props: {
    value: [String, Object, Array],
    placeholder: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    change: {
      type: Function
    }
  },
  computed: {
    deliveryTypeList() {
      let list = Vue._.map(this.$store.state.deliveryTypes.all, (deliveryType) => {
        return {
          label: deliveryType.deliverytypename,
          value: deliveryType.deliverytypeid
        }
      })
      this.$emit('loaded', list)
      return list
    }
  },
  methods: {
    update(val) {
      this.$emit('input', val)
    },
    onChange(val) {
      if (this.change) {
        this.change(val)
      }
    },
    getPlaceHolder() {
      if (this.placeholder) {
        return this.placeholder
      }
      return this.multiple ? "Select Delivery Types" : "Select Delivery Type"
    }
  },
  created() {
    if (this.$store.state.deliveryTypes.all.length == 0) {
      this.$store.dispatch('deliveryTypes/getDeliveryTypes')
    }
  },
};
</script>
