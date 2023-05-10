<template>
<v-select :options="numberList" :value="value" @input="update" :placeholder="getPlaceHolder()" :onChange="onChange"></v-select>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'StateSelect',
  props: {
    value: [Number],
    placeholder: {
      type: String,
      default: ''
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10
    },
    change: {
      type: Function
    }
  },
  computed: {
  },
  data: function() {
    let arr = [];
    for (var i=this.min; i<=this.max; i++) {
      arr.push(i)
    }
    return {
      numberList: arr
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
      return "Select a number"
    },
  },
};
</script>
