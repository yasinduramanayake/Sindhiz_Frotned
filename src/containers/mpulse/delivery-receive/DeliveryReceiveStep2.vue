<template>
<div class="animated fadeIn">
  <b-card>
    <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
      <b-row>
        <b-col>
          <b-form-group label="Update images" >
              <vue-base64-file-upload v-for="(file, index) in files" :key="index" :fileId="file.id" accept="image/png,image/jpeg,application/pdf" image-class="img-thumbnail thumbnail-max-width" input-class="form-control" placeholder="Click here to upload the image"
                @load="onLoad" />
            </b-form-group>
        </b-col>
        
      </b-row>
      <b-row>
        <b-col>
          <b-btn type="submit" variant="success" class="pull-right" :disabled="!isReady">Next</b-btn>
          <b-btn type="submit" class="pull-right mr-1" @click="goBack">Back</b-btn>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</div>
</template>

<script>
import Vue from 'vue'
import {
  required
} from "vuelidate/lib/validators"
import VueBase64FileUpload from '../custom-components/VueBase64Upload'

export default {
  name: 'DeliveryReceiveStep2',
  props: {
    numOfBoxes: {
      type: Number,
      default: 1
    }
  },
  components: {
    VueBase64FileUpload
  },
  computed: {
    isReady() {
      for(var i=0; i<this.numOfBoxes; i++) {
        if (this.files[i].dataUri == null) {
          return false;
        }
      }
      return true;
    }
  },
  data: function() {
    return {
      files: [],
      submitted: false
    }
  },
  methods: {
    onSubmit() {
      let params = {
        files: this.files
      }

      this.$emit('next', params)
    },
    onLoad(dataUri, name, id) {
      let file = _.find(this.files, ["id", id])
      file.name = name
      file.dataUri = dataUri
    },
    addFile() {
      let id = this.createUniqueId()
      this.files.push({id: id, dataUri: null, name: null})
    },
    goBack() {
      this.$emit("back")
    }
  },
  created() {
    for(var i=0; i<this.numOfBoxes; i++) {
      this.addFile()
    }
  }
}
</script>

<style lang="scss">
.thumbnail-max-width {
  max-height: 200px;
  width: auto;
}
</style>

