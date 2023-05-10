<template>
  <div class="h-100">
    <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showUpdateModal">Update</b-btn>
    <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showCreateRuleModal">Create Rule</b-btn>
  </div>
</template>

<script>
  export default {
    name: 'BankFeedDetailActions',
    methods: {
      showUpdateModal() {
        this.params.context.componentParent.showUpdateModal(this.params.data)
      },
      showCreateRuleModal(){
        this.params.context.componentParent.showCreateRuleModal(this.params.data)
      }
    }
  }
</script>
