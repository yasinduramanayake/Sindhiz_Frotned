<template>
<v-select :options="distributorList" :value="value" @input="update" :multiple="multiple" :placeholder="getPlaceHolder()" :onChange="onChange"></v-select>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'DistributorSelect',
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
    distributorList() {
      return Vue._.map(this.$store.state.distributors.unassigned, (distributor) => {
        return {
          label: distributor.distributorname,
          value: distributor.distributorid
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
      return this.multiple ? "Select Distributors" : "Select Distributor"
    }
  },
  created() {
    this.$store.dispatch('distributors/getUnAssignedDistributors')
  },
};
</script>
