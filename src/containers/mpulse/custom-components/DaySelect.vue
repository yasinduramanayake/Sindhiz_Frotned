<template>
<v-select :options="dayList" :value="value" @input="update" :placeholder="placeholder" :onChange="onChange" :disabled="disabled"></v-select>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'DaySelect',
  props: {
    value: [String, Number, Object, Array],
    placeholder: {
      type: String,
      default: 'Select Day'
    },
    change: {
      type: Function
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      dayList: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
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
    }
  }
};
</script>
