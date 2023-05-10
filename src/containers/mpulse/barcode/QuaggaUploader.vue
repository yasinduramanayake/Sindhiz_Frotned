<template>
<div id="interactive" class="viewport scanner">
  <b-form-file @change="uploadFile" placeholder="Choose a file..." drop-placeholder="Drop file here..."></b-form-file>
</div>
</template>

<script>
import Quagga from 'quagga';
export default {
  name: 'QuaggaUploader',
  props: {
    onDetected: {
      type: Function,
      default (result) {
        console.log('detected: ', result);
      },
    },
    readerTypes: {
      type: Array,
      default: () => ['code_128_reader'],
    }
  },
  data: function() {
    return {
      quaggaState: {
        inputStream: {
          size: 400,
          singleChannel: false
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 2,
        frequency: 10,
        decoder: {
          readers: this.readerTypes,
        },
        locate: true,
        src: null
      },
    };
  },
  methods: {
    uploadFile(e) {
      console.log(this.readerTypes)
      console.log('start upload file')
      if (e.target.files && e.target.files.length) {
        this.decode(URL.createObjectURL(e.target.files[0]));
      }
    },
    decode(src) {
      let config = Object.assign({}, this.quaggaState, {
        src: src
      })
      Quagga.decodeSingle(config, (result) => {
        // this.onDetected(result)
        console.log('decode single')
        console.log(result)
      });
    }
  },
  mounted() {
  }
};
</script>

<style scoped>
.viewport {
  position: relative;
}

.viewport canvas,
.viewport video {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
