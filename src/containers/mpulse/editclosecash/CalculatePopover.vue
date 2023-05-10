<template>
  <div className="animated">

    <b-button :id="target" @click="showPopover = !showPopover"><i class='cui-calculator'></i></b-button>

    <b-popover
      :target="target"
      :show.sync="showPopover"
      placement="auto"
      @shown="onShown"
    >
      <b-form v-on:submit.prevent="calculate" novalidate>
      <div v-for="type in types" class="field">
        <label>{{ type.label }}</label>
        <b-input type="number" :ref="type.ref" v-model="type.data" class="form-control"/>
      </div>
      <div class="field">
        <b-btn type="submit" class="mt-4" variant="primary" size="sm" @click="calculate">Calculate</b-btn>
      </div>
    </b-form>

    </b-popover>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'CalculatePopover',
    props: {
      target: String
    },
    computed: {
    },
    watch: {

    },
    data: function () {
      return {
        showPopover: false,
        types: [
          {label: '$100', value: '100', data: '', ref: "input100"},
          {label: '$50', value: '50', data: '', ref: "input50"},
          {label: '$20', value: '20', data: '', ref: "input20"},
          {label: '$10', value: '10', data: '', ref: "input10"},
          {label: '$5', value: '5', data: '', ref: "input5"},
          {label: '$2', value: '2', data: '', ref: "input2"},
          {label: '$1', value: '1', data: '', ref: "input1"},
          {label: '$0.50', value: '0.5', data: '', ref: "input05"},
          {label: '$0.20', value: '0.2', data: '', ref: "input02"},
          {label: '$0.10', value: '0.1', data: '', ref: "input01"},
          {label: '$0.05', value: '0.05', data: '', ref: "input005"},
        ]
      }
    },
    methods: {
      calculate() {
        let total = 0
        let denomination = []
        _.forEach(this.types, (type) => {
          total += type.value * type.data
          if (type.data > 0) {
            denomination.push({value: type.value, count: type.data})
          }
        })

        total = Number((total).toFixed(2))
        this.showPopover = false
        this.$emit('ok', total, denomination)
      },
      onShown() {
        this.focusRef(this.$refs.input100[0])
      },
      focusRef(ref) {
        this.$nextTick(() => {
          this.$nextTick(() => {
            ref.focus()
          })
        })
      }
    },
    created() {
    }
  };
</script>

<style lang="scss">
.popover-body .field {
  max-width: 60px;
  display: inline-block;
  vertical-align: middle;
  margin: 1px 4px 5px;
}
.popover-body .field label {
    display: block;
    text-align: center;
    background: 1px #c4bed8;
    border-radius: 20px;
    color: #000;
}
</style>
