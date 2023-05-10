<template>
<v-select :options="yearList" :value="value" @input="update" :placeholder="placeholder" :onChange="onChange" :disabled="disabled"></v-select>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'YearSelect',
  props: {
    value: [String, Number, Object, Array],
    placeholder: {
      type: String,
      default: 'Select Year'
    },
    from: {
      type: Number,
      default: 2018
    },
    change: {
      type: Function
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    yearList() {
      let list = []

      let month = Vue.moment().month() + 1;
      
      let year = Vue.moment().year();
      if(month == 12){
        year = Vue.moment().year() + 1;
      }
      for (var i = this.from; i <= year; i++) {
        list.push(i.toString())
      }
      // if (!this.value) {
      //   this.update(Vue.moment().year().toString())
      // }
      return list
    },
  },
  methods: {
    update(val) {
      this.$emit('input', val)
    },
    onChange(val) {
      if (this.change) {
        this.change(val)
      }
    }
  }
};
</script>
