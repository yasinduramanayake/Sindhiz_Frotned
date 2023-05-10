<template>
  <div>
    <b-card sub-title="Rule Details (Field, Operator, Value, Condition)">
      <div v-for="(v, index) in $v.rules.$each.$iter" :key="index">
        <hr v-if="index > 0" class="rule-row"/>
        <b-row >
          <b-col><v-select :options="fieldList" v-model="v.field.$model" placeholder="Select Field"></v-select></b-col>
          <b-col><v-select :options="operatorList" v-model="v.operator.$model"  placeholder="Select Operator"></v-select></b-col>
          <b-col><b-form-input :type="v.field != null && v.field.$model != null ? v.field.$model.type  : 'text'" class="form-control" v-model="v.value.$model"  placeholder="Value" ></b-form-input></b-col>
          <b-col><v-select :options="LogicOpList" v-model="v.logicop.$model" placeholder="Select Logical Operator"></v-select></b-col>

        </b-row>
      </div>
    </b-card>

    <div class="alert alert-danger" v-if="!$v.rules.required && $v.rules.$dirty">Please provide at least one Rule</div>
  </div>

</template>

<script>
import Vue from 'vue'

import {
  required
} from "vuelidate/lib/validators"

export default {
  name: 'RuleList',
  computed: {
    isValid() {
      return !this.$v.rules.$anyError
    },
    isDirty() {
      return this.$v.rules.$anyDirty
    },
    fieldList() {
      let list = [];
      Vue._.forEach(this.$store.state.accounts.fields, field => {
        list.push({
          label: field.field,
          value: field.srcfieldid,
          type: field.type
        });
      });
      return list;
    },
    operatorList() {
      let list = [];
      Vue._.forEach(this.$store.state.accounts.operators, operator => {
        list.push({
          label: operator.description,
          value: operator.ruleoptid
        });
      });
      return list;
    },
    LogicOpList() {
      let list = [];
      Vue._.forEach(this.$store.state.accounts.logicoperators, logop => {
        list.push({
          label: logop.logicop,
          value: logop.logicopid
        });
      });
      return list;
    },
  },
  data: function () {
    return {
      total: 0,
      rules: [],
    };
  },
  validations: {
    rules: {
      required,
      $each: {
        field: {
          required,
        },
        operator: {
          required
        },
        value: {
          required
        },
        logicop:{
          required
        }
      }
    }
  },
  methods: {

    addRule() {
      this.rules.push({field: null, operator: null, value: null, logicop: null, sequence: this.rules.length + 1})
    },
    removeRule() {
      this.rules.pop()
    },
    getRules() {
      let returnValue = true;
      let totalLogOp = 0;
      Vue._.forEach(this.rules, logop => {
        if(logop.field == null || logop.value == null || logop.operator == null){
          returnValue = false;
          return;
        }
        if(logop.logicop != null && logop.logicop.value != null){
          ++totalLogOp
        }

      });
      console.log(returnValue)
      console.log(totalLogOp);
      console.log(this.rules.length);
      if(returnValue && this.rules.length > 0 && ( (this.rules[this.rules.length -1]['logicop'] != null && this.rules[this.rules.length -1]['logicop'].value != null ) || totalLogOp != (this.rules.length -1) )){
        returnValue = false;
      }

      if(returnValue)
        return this.rules
      else
        return []
    },
    setRule(rule) {
      console.log(rule)
      this.rules.push({field: rule.field, operator: rule.operator, value: rule.value, logicop:rule.logicop, sequence: rule.ruleseqno})
    },
    onReset() {
      this.rules = []
      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    chkState(val, index) {
      const field = this.$v.rules.$each[index][val]
      return field.$dirty ? !field.$invalid : null
    },
    findFirstError(component = this) {
      if (component.state === false) {
        if (component.$refs.input) {
          component.$refs.input.focus()
          return true
        }
        if (component.$refs.check) {
          component.$refs.check.focus()
          return true
        }
      }
      let focused = false
      component.$children.some((child) => {
        focused = this.findFirstError(child)
        return focused
      })

      return focused
    },
    validate() {
      this.$v.$touch()
      this.$nextTick(() => this.findFirstError())
      return this.isValid
    }
  },
  created() {
    this.$store.dispatch("accounts/getFields");
    this.$store.dispatch("accounts/getOperators");
    this.$store.dispatch("accounts/getLogicOperators");
  },
}
</script>

<style>
.rule-row {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
