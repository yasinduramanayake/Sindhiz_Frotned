<template>
  <v-select :options="subCategoryList" :value="value" @input="update" :multiple="multiple" :placeholder="getPlaceHolder()" :onChange="onChange"></v-select>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'SubcatSelect',
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
    },
    onlyStaff: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    subCategoryList() {
      return Vue._.map(this.$store.state.subCategories.productRanking, (subCategory) => {
        return {
          label: subCategory.subcat_name,
          value: subCategory.subcat
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
      return this.multiple ? "Select Sub Categories" : "Select Sub Category"
    }
  },
  created() {
    if (this.$store.state.subCategories.productRanking.length == 0) {
      this.$store.dispatch('subCategories/getProductRankingSubCategories')
    }
  },
};
</script>
