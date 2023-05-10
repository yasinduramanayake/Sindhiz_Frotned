<template>
<v-select :options="transactionTypeList" :value="value" @input="update" :multiple="multiple" :placeholder="getPlaceHolder()" :onChange="onChange"></v-select>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'TransactionTypeSelect',
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
    transactionTypeList() {
      let list = Vue._.map(this.$store.state.transtypes.all, (transtype) => {
        return {
          label: transtype.transtypename,
          value: transtype.transtypeid
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
      return this.multiple ? "Select Transaction Types" : "Select Transaction Type"
    }
  },
  created() {
    if (this.$store.state.transtypes.all.length == 0) {
      this.$store.dispatch('transtypes/getTranstypes')
    }
  },
};
</script>
