<template>
<v-select :options="trainingTypeList" :value="value" @input="update" :multiple="multiple" :placeholder="getPlaceHolder()" :onChange="onChange"></v-select>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'TrainingTypeSelect',
  props: {
    value: [String, Object, Array],
    placeholder: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    change: {
      type: Function
    }
  },
  computed: {
    trainingTypeList() {
      return Vue._.map(this.$store.state.trainingTypes.all, (trainingType) => {
        return {
          label: trainingType.trainingtypename,
          value: trainingType.trainingtypeid
        }
      })
    }
  },
  methods: {
    update(val) {
      this.$emit('input', val)
    },
    onChange(val) {
      if (this.change) {
        this.change(val)
      }
    },
    getPlaceHolder() {
      if (this.placeholder) {
        return this.placeholder
      }
      return this.multiple ? "Select training types" : "Select a training type"
    }
  },
  created() {
    if (this.$store.state.trainingTypes.all.length == 0) {
      this.$store.dispatch('trainingTypes/getTrainingTypes')
    }
  },
};
</script>
