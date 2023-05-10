<template>
  <div class="h-100">
    <b-btn size="sm" class="btn-success mb-2 mx-1" @click="showDetailPage">Open Bank Feed</b-btn>
  </div>
</template>

<script>
  export default {
    name: 'BankFeedActions',
    methods: {
      showDetailPage() {
        let routeData = this.$router.resolve({name: 'Bank Feed Detail', params: {id: this.params.data.bankfeedid}});
        window.open(routeData.href, '_blank');

      }
    }
  }
</script>
