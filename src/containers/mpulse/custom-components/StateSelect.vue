<template>
<v-select :options="stateList" :value="value" @input="update" :multiple="multiple" :placeholder="getPlaceHolder()" :onChange="onChange"></v-select>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'StateSelect',
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
  },
  data: function() {
    return {
      stateList: [
        {label: 'ACT', value: 'act'},
        {label: 'NSW', value: 'nsw'},
        {label: 'NT', value: 'nt'},
        {label: 'QLD', value: 'qld'},
        {label: 'SA', value: 'sa'},
        {label: 'WA', value: 'wa'},
        {label: 'TAS', value: 'tas'},
        {label: 'VIC', value: 'vic'},
      ]
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
      return this.multiple ? "Select States" : "Select State"
    },
  },
};
</script>
