<template>
<v-select :options="staffList" :value="value" @input="update" :multiple="multiple" :placeholder="getPlaceHolder()" :onChange="onChange"></v-select>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'StaffSelect',
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
    staffList() {
      return Vue._.map(this.$store.state.staffs.all, (staff) => {
        return {
          label: staff.staffname,
          value: staff.staffid
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
      return this.multiple ? "Select Staffs" : "Select Staff"
    }
  },
  created() {
    if (this.$store.state.staffs.all.length == 0) {
      this.$store.dispatch('staffs/getStaffs')
    }
  },
};
</script>
