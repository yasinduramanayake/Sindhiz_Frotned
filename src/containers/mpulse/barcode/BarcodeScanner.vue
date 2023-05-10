<template>
  <div className="animated">

    <b-button :id="'btnBarcodeScanner'+target" variant="success" @click="showScannerPopover = !showScannerPopover"><i class='fa fa-camera'></i></b-button>
    <!-- <b-button :id="'btnBarcodeUploader'+target" variant="info" @click="showUploaderPopover = !showUploaderPopover"><i class='fa fa-file-image-o'></i></b-button> -->

    <b-popover v-if="showScannerPopover"
      :target="'btnBarcodeScanner'+target"
      :show.sync="showScannerPopover"
      placement="bottom"
    >
      <b-row>
        <b-col sm="12">
          <barcode-readers @change="changeReaders"></barcode-readers>
        </b-col>
      </b-row>

      <b-row class="mt-1">
        <b-col sm="12">
          <quagga-scanner :onDetected="logIt" :readerSize="readerSize" :readerTypes="selectedReaderTypes"></quagga-scanner>
        </b-col>
      </b-row>
    </b-popover>

    <b-popover v-if="showUploaderPopover"
      :target="'btnBarcodeUploader'+target"
      :show.sync="showUploaderPopover"
      placement="bottom"
    >
      <b-row>
        <b-col sm="12">
          <barcode-readers @change="changeReaders"></barcode-readers>
        </b-col>
      </b-row>

      <b-row class="mt-1">
        <b-col sm="12">
          <quagga-uploader :onDetected="logIt" :readerTypes="selectedReaderTypes"></quagga-uploader>
        </b-col>
      </b-row>
    </b-popover>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  // import VueQuagga from 'vue-quaggajs'
  import BarcodeReaders from './BarcodeReaders'
  import QuaggaUploader from './QuaggaUploader'
  import QuaggaScanner from './QuaggaScanner'

  // Vue.use(VueQuagga)

  export default {
    name: 'BarcodeScanner',
    components: {
      BarcodeReaders,
      QuaggaUploader,
      QuaggaScanner
    },
    props: {
      target: String
    },
    data: function () {
      return {
        showScannerPopover: false,
        showUploaderPopover: false,
        readerSize: {
          width: 320,
          height: 320
        },
        selectedReaderTypes: [],
        detecteds: []
      }
    },
    methods: {
      logIt (data) {
        this.$emit('detected', data.codeResult.code)
        console.log('detected', data)
      },
      changeReaders(readers) {
        this.selectedReaderTypes = readers
      }
    },
    created() {
    }
  };
</script>

<style lang="scss">
.popover {
  width: 100%;
  min-height: 380px;
  max-width: 350px;
  overflow-x: hidden;
}
</style>
