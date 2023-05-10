<template>
<v-select :options="storeList" :value="value" @input="update" :multiple="multiple" :placeholder="getPlaceHolder()" :onChange="onChange"></v-select>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'StoreSelect',
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
    },
    onlyStaff: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    storeList() {
      return Vue._.map(this.$store.state.stores.all, (store) => {
        return {
          label: store.storename,
          value: store.storeid
        }
      })
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
      return this.multiple ? "Select stores" : "Select a store"
    }
  },
  created() {
    this.$store.dispatch('stores/getStores', {onlyStaff: this.onlyStaff})
  },
};
</script>
