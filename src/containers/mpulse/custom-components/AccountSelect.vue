<template>
<v-select :options="accountList" :value="value" @input="update" :multiple="multiple" :placeholder="getPlaceHolder()" :onChange="onChange"></v-select>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'AccountSelect',
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
    payable: {
      type: Boolean,
      default: false
    },
    receivable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    accountList() {
      let accounts = this.$store.state.accounts.all
      if (this.payable) {
        accounts = this.$store.state.accounts.payables
      } else if (this.receivable) {
        accounts = this.$store.state.accounts.receivables
      }
      return Vue._.map(accounts, (account) => {
        return {
          label: account.accountname,
          value: account.accountid
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
      return this.multiple ? "Select Accounts" : "Select Account"
    }
  },
  created() {
    if (this.$store.state.accounts.all.length == 0) {
      this.$store.dispatch('accounts/getAccounts')
    }
  },
};
</script>
