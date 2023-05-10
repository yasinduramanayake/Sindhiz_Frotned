<template>
<div class="animated fadeIn">
  <b-card>
    <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
      <b-row>
        <b-col sm="6">
          <b-form-group label="Competitor List" label-for="competitorList" :state="chkState('competitorList')">
            <v-select :options="competitorListList" v-model="$v.form.competitorList.$model" placeholder="Select Competitor List"></v-select>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="Comparison Store" label-for="store" :state="chkState('store')">
            <v-select :options="storeList" v-model="$v.form.store.$model" placeholder="Select Store"></v-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <b-form-group label="Reduce Ctn By ($)" label-for="reduceCtnBy">
            <b-form-input id="reduceCtnBy" type="number" :state="chkState('reduceCtnBy')" v-model.lazy.trim="$v.form.reduceCtnBy.$model" aria-describedby="liveFeedbackReduceCtnBy" placeholder="Example: 0.05" />
            <b-form-invalid-feedback id="liveFeedbackReduceCtnBy">
              This is a required field
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="Reduce Pkt By ($)" label-for="reducePktBy">
            <b-form-input id="reducePktBy" type="number" :state="chkState('reducePktBy')" v-model.lazy.trim="$v.form.reducePktBy.$model" aria-describedby="liveFeedbackReducePktBy" placeholder="Example: 0.05" />
            <b-form-invalid-feedback id="liveFeedbackReducePktBy">
              This is a required field
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="6">
          <b-form-group label="Carton Percentage (%)" label-for="cartonPercentage">
            <b-form-input id="cartonPercentage" type="number" :state="chkState('cartonPercentage')" v-model.lazy.trim="$v.form.cartonPercentage.$model" aria-describedby="liveFeedbackCartonPercentage" placeholder="Example: 2.0" />
            <b-form-invalid-feedback id="liveFeedbackCartonPercentage">
              This is a required field
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="Packet Percentage (%)" label-for="packetPercentage">
            <b-form-input id="packetPercentage" type="number" :state="chkState('packetPercentage')" v-model.lazy.trim="$v.form.packetPercentage.$model" aria-describedby="liveFeedbackPacketPercentage" placeholder="Example: 2.0" />
            <b-form-invalid-feedback id="liveFeedbackPacketPercentage">
              This is a required field
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="4">
          <b-btn type="submit" variant="success" :disabled="$v.form.$invalid">Compare</b-btn>
        </b-col>
      </b-row>
    </b-form>
  </b-card>

  <b-card v-if="comparingData">
    <bulk-promotions-form :comparingData="comparingData" @success="onSuccess"></bulk-promotions-form>
  </b-card>

</div>
</template>

<script>
import Vue from 'vue'
import {
  mapState,
  mapActions
} from 'vuex'
import {
  required
} from "vuelidate/lib/validators"
import BulkPromotionsForm from './BulkPromotionsForm'

const formShape = {
  competitorList: null,
  store: null,
  reduceCtnBy: 0.05,
  reducePktBy: 0.05,
  cartonPercentage: 2,
  packetPercentage: 2
}

export default {
  name: 'BulkPromotions',
  components: {
    BulkPromotionsForm
  },
  data: function() {
    return {
      form: Object.assign({}, formShape),
      comparingData: null
    }
  },
  computed: {
    isValid() {
      return !this.$v.form.$anyError
    },
    isDirty() {
      return this.$v.form.$anyDirty
    },
    competitorListList() {
      let list = []
      Vue._.forEach(this.$store.state.marketPriceLists.active, (priceList) => {
        list.push({
          label: priceList.listname,
          value: priceList.listid
        })
      })
      return list
    },
    storeList() {
      let list = []
      Vue._.forEach(this.$store.state.stores.all, (store) => {
        list.push({
          label: store.storename,
          value: store.storeid
        })
      })
      return list
    }
  },
  validations: {
    form: {
      competitorList: {
        required
      },
      store: {
        required
      },
      reduceCtnBy: {
        required
      },
      reducePktBy: {
        required
      },
      cartonPercentage: {
        required
      },
      packetPercentage: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.comparingData = null
        this.$nextTick(() => {
          let params = {
            'listId': this.$v.form.competitorList.$model.value,
            'storeId': this.$v.form.store.$model.value,
            'reduceCtnBy': this.$v.form.reduceCtnBy.$model,
            'reducePktBy': this.$v.form.reducePktBy.$model,
            'cartonPercentage': this.$v.form.cartonPercentage.$model,
            'packetPercentage': this.$v.form.packetPercentage.$model,
          }

          Vue.axios.post('/bulk-promotions/compare', params)
            .then((response) => {
              this.comparingData = response.data
              this.showSuccessMsg()
            })
            .catch((error) => {
              this.showErrorMsg()
            })
        })
      }
    },
    onSuccess() {
      this.comparingData = null
    },
    onReset() {
      this.form = formShape
      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    chkState(val) {
      const field = this.$v.form[val]
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
    this.$store.dispatch('stores/getStores')
    this.$store.dispatch('marketPriceLists/getActivePriceLists')
  }
}
</script>
