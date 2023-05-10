<template>
  <div >
    <b-card title="Sales Overview">
      <b-table :items="salesOverview" hover bordered :fields="fields" class="report-table" responsive sticky-header no-border-collapse>
        <template v-slot:head(name)="scope">
          <div class="text-nowrap">{{scope.label}}</div>
        </template>
      </b-table>
    </b-card>

    <b-card title="Customer Overview" >
      <b-table :items="customerOverview" hover bordered :fields="fields" class="report-table" responsive sticky-header no-border-collapse>
        <template v-slot:head(name)="scope">
          <div class="text-nowrap">{{scope.label}}</div>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'SalesOverviewTable',
    props: {
      data: Object
    },
    data: () => {
      return {
        fields: [],
        salesOverview: [],
        customerOverview: []
      }
    },
    created() {
      let header = [{key: 'name', label: this.data.name, thStyle: {"min-width": "120px"}, stickyColumn:true}]

      _.each (this.data.labels, (label) => {
        header.push(label.toString())
      })
      this.fields = header

      for (let key in this.data.sales_overview) {
        let line = {}
        line.name = key

        _.each (this.data.labels, (label) => {
          line[label] = 0
        })
        for (let item in this.data.sales_overview[key]) {
          line[item] = this.data.sales_overview[key][item]
        }
        this.salesOverview.push(line)
      }

      for (let key in this.data.customer_overview) {
        let line = {}
        line.name = key
        _.each (this.data.labels, (label) => {
          line[label] = 0
        })
        for (let item in this.data.customer_overview[key]) {
          line[item] = this.data.customer_overview[key][item]
        }
        this.customerOverview.push(line)
      }

    }
  }
</script>

<style lang="scss">
.report-table td {
  padding: 0.25rem;
}
</style>
