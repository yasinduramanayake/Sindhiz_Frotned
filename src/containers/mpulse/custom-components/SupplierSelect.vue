<template>
<v-select :options="supplierList" :value="value" @input="update" :multiple="multiple" :placeholder="getPlaceHolder()" :onChange="onChange"></v-select>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'supplierSelect',
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
    supplierList() {
      return Vue._.map(this.$store.state.suppliers.global, (supplier) => {
        return {
          label: supplier.suppliername,
          value: supplier.supplierid
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
      return this.multiple ? "Select suppliers" : "Select supplier"
    }
  },
  created() {
    this.$store.dispatch('suppliers/getGlobalSuppliers')
  },
};
</script>
