<template>
<div>
  <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showEditRuleModal">Edit</b-btn>
  <b-btn size="sm" class="btn-success mb-2 mx-1" @click="deleteAccountRule">Delete</b-btn>

</div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'AccountRulesAction',
  methods: {
    showEditRuleModal() {
      this.params.context.componentParent.showEditRule(this.params.data)
    },
    deleteAccountRule(){
      this.params.context.componentParent.deleteAccountRule(this.params.data)
    }
  }
}
</script>
