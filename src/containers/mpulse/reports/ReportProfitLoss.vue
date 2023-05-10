<template>
<div class="animated fadeIn">
  <report-search-store @search="onSearch" />

  <b-card v-if="profitloss">
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="profitloss" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
  </b-card>
  <b-card v-if="profitloss">
    <h1> Total Income = {{totalIncome}}</h1>
    <br/>
    <h1> Total Expense = {{totalExpense}}</h1>
    <br/>
    <h1> Profit = {{totalIncome}} - {{totalExpense}} = {{profit}}</h1>
  </b-card>
</div>
</template>

<script>
import Vue from 'vue'
import ReportSearchStore from './ReportSearchStore'
import {
  AgGridVue
} from "ag-grid-vue"
import GridButtons from '../GridButtons'

export default {
  name: 'ReportProfitLoss',
  components: {
    ReportSearchStore,
    AgGridVue,
    GridButtons
  },
  computed: {
               totalExpense: function () {
                   var sum = 0;
                   this.profitloss.forEach(e => {
                     if(e.ispayable == 'Yes'){
                       sum += e.amount;
                     }

                   });
                   if(sum < 0){
                     sum = sum * (-1);
                   }
                   return Math.round(sum)
               },
               totalIncome: function () {
                   var sum = 0;
                   this.profitloss.forEach(e => {
                     if(e.ispayable == 'No'){
                       sum += e.amount;
                     }

                   });
                   return Math.round(sum)
               },
               profit: function(){
                 return Math.round(this.totalIncome - this.totalExpense);
               }
  },
  data: function() {
    return {
      profitloss: null,
      currentSearch: null,
      gridOptions: {
        context: {
          componentParent: this
        },
        defaultColDef: {
          sortable: true,
          resizable: true,
          filter: 'agTextColumnFilter',
          minWidth: 120
        },
        columnDefs: [{
            headerName: 'Account Type',
            field: 'account_type',
              minWidth: 150
          },
          {
            headerName: 'Amount',
            field: 'amount'
          },
          {
            headerName: 'Expense?',
            field: 'ispayable'
          },
          {
            headerName: 'Distributor',
            field: 'distributorname'
          },

        ]
      }
    }
  },
  methods: {

    exportParams() {
      return {
        'fileName': 'MerchantPulse_ReportProfitLoss_' + this.currentSearch.fromDate + '_' + this.currentSearch.toDate,
        'columnKeys': ['accounttype', 'amount']
      }
    },
    gridReady() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    onSearch(data) {
      this.currentSearch = data
      let params = {
        storeId: data.store.value,
        fromDate: data.fromDate,
        toDate: data.toDate,
      }
      Vue.axios.post('/profitlossreport', params)
        .then(response => {
          this.profitloss = response.data
          this.showSuccessMsg()
        })
        .catch(() => {
          this.showErrorMsg()
        })
    }
  },
}
</script>
