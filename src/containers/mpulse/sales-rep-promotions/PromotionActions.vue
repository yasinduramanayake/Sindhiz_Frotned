<template>
  <div class="h-140">
    <b-btn size="sm" class="btn-success mx-1 mb-2" @click="showViewSalesModal">View Sales</b-btn>
    <c-switch v-if="!params.data.is_paid && params.data.disabled==0 && params.data.enddate >= currentDate" class="mx-1" color="primary" variant="3d" size="sm"
      :checked="params.data.disabled==0"
      @change="toggleDisable" />
    <c-switch v-if="params.data.disabled==1 || params.data.enddate < currentDate " class="mx-1" color="success" size="sm"
      @change="calculatePayable"
     />
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Switch as cSwitch } from '@coreui/vue'
  export default {
    name: 'PromotionActions',
    components: {
      cSwitch
    },
    data: function () {
      return {
        currentDate: this.$moment().format('YYYY-MM-DD')
      }
    },
    methods: {
      calculatePayable(value) {
        this.params.context.componentParent.calculatePayable(this.params.data, value)
      },
      toggleDisable(value) {
        let currentValue = this.params.data.disabled == 0
        if(value != currentValue) {
          this.params.context.componentParent.showDisableConfirm(this.params.data)
        }
      },
      showViewSalesModal() {
        this.params.context.componentParent.showViewSales(this.params.data)
      },
      showPayRebateModal() {
        this.params.context.componentParent.showPayRebate(this.params.data)
      }
    }
  }
</script>
