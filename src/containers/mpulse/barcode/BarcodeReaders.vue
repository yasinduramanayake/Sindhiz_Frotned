<template>
  <div className="animated">
    <v-select multiple :options="readerTypes" v-model="selectedReaderTypes" placeholder="Select Reader Type"></v-select>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'BarcodeReaders',
    watch: {
      selectedReaderTypes: function(readers) {
        this.$emit('change', _.map(readers, (reader) => (reader.value)))
      }
    },
    data: function () {
      return {
        readerTypes: [
          {label: "EAN", value: "ean_reader"},
          {label: "UPC", value: "upc_reader"},
          {label: "EAN-8", value: "ean_8_reader"},
          {label: "Code 128", value: "code_128_reader"},
          {label: "Code 39", value: "code_39_reader"},
          {label: "Code 39 VIN", value: "code_39_vin_reader"},
          {label: "Codabar", value: "codabar_reader"},
          {label: "UPC-E", value: "upc_e_reader"},
          {label: "ITF", value: "i2of5_reader"},
          {label: "Standard 2 of 5", value: "2of5_reader"},
          {label: "Code 93", value: "code_93_reader"},
        ],
        selectedReaderTypes: [],
      }
    },
    methods: {
    },
    mounted() {
      this.selectedReaderTypes = [this.readerTypes[0], this.readerTypes[1]]
    }
  };
</script>
