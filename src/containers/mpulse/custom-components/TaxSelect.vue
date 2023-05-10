<template>
<v-select :options="taxList" :value="value" @input="update" :multiple="multiple" :placeholder="getPlaceHolder()" :onChange="onChange"></v-select>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'TaxSelect',
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
    taxList() {
      return Vue._.map(this.$store.state.taxes.all, (tax) => {
        return {
          label: tax.taxname,
          value: tax.taxid
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
      return this.multiple ? "Select Taxes" : "Select Tax"
    }
  },
  created() {
    if (this.$store.state.taxes.all.length == 0) {
      this.$store.dispatch('taxes/getTaxes')
    }
  },
};
</script>
