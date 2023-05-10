<template>
<v-select :options="accountTypeList" :value="value" @input="update" :multiple="multiple" :placeholder="getPlaceHolder()" :onChange="onChange"></v-select>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'AccountTypeSelect',
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
    accountTypeList() {
      return Vue._.map(this.$store.state.accountTypes.all, (accountType) => {
        return {
          label: accountType.account_type,
          value: accountType.account_typeid
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
      return this.multiple ? "Select Account Types" : "Select Account Type"
    }
  },
  created() {
    if (this.$store.state.accountTypes.all.length == 0) {
      this.$store.dispatch('accountTypes/getAccountTypes')
    }
  },
};
</script>
