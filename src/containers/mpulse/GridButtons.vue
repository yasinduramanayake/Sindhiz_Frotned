<template>
  <b-button-toolbar key-nav aria-label="Grid Options" class="mb-1">
    <b-dropdown text="Page Size" variant="info">
      <b-dropdown-item @click="changePageSize(10)">10</b-dropdown-item>
      <b-dropdown-item @click="changePageSize(20)">20</b-dropdown-item>
      <b-dropdown-item @click="changePageSize(50)">50</b-dropdown-item>
      <b-dropdown-item @click="changePageSize(100)">100</b-dropdown-item>
    </b-dropdown>
    <b-button-group class="mx-1">
      <b-btn @click="exportCSV">Export all data</b-btn>
    </b-button-group>
  </b-button-toolbar>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'GridButtons',
    props: {
      gridOptions: Object,
      exportParams: Function
    },
    methods: {
      changePageSize(value) {
        this.gridOptions.api.paginationSetPageSize(value)
      },
      exportCSV() {
        this.gridOptions.api.exportDataAsCsv(this.exportParams());
      }
    }
  }
</script>
