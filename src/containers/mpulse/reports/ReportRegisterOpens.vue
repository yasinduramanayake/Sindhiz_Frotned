<template>
<div class="animated fadeIn">
  <report-search-store @search="onSearch" />

  <b-card v-if="registerOpens">
    <grid-buttons :gridOptions="gridOptions" :exportParams="exportParams" />
    <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :rowData="registerOpens" :pagination="true" :paginationPageSize="20" :floatingFilter="true" :suppressNoRowsOverlay="true" @gridReady="gridReady">
    </ag-grid-vue>
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
  name: 'ReportRegisterOpens',
  components: {
    ReportSearchStore,
    AgGridVue,
    GridButtons
  },
  data: function() {
    return {
      registerOpens: null,
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
        columnDefs: [
          {
            headerName: 'Date Time',
            field: 'datetime'
          },
        ]
      }
    }
  },
  methods: {
    exportParams() {
      return {
        'fileName': 'MerchantPulse_ReportRegisterOpens_' + this.currentSearch.fromDate + '_' + this.currentSearch.toDate,
        'columnKeys': ['datetime']
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
      Vue.axios.post('/registerOpensReport', params)
        .then(response => {
          this.registerOpens = response.data
          this.showSuccessMsg()
        })
        .catch(() => {
          this.showErrorMsg()
        })
    }
  },
}
</script>
