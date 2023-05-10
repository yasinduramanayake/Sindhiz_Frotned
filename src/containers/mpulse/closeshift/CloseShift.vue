<template>
<div className="animated">
  <b-card>
    <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
      <b-row>
        <b-col sm="4">
          <b-form-group label="Date">
            <v-date-picker v-model="selectedDate" :input-props='{ class: "form-control" }' show-caps>
            </v-date-picker>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group label="Shift">
            <v-select :options="shiftList" v-model="selectedShift" placeholder="Select Shift"></v-select>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group label="Store" label-for="store">
            <store-select v-model="selectedStore" onlyStaff></store-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-button variant="primary" @click="showManually" v-if="canShowManually">Close Shift Manually?</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>

  <close-shift-form v-if="closeShiftData.length > 0" :closeShiftData="closeShiftData" :store="selectedStore" :shift="selectedShift" :isManually="isManually" :closingDate="selectedDate" @success="submitSuccess" />

</div>
</template>

<script>
import Vue from 'vue'
import CloseShiftForm from './CloseShiftForm'

export default {
  name: 'CloseShift',
  components: {
    CloseShiftForm
  },
  computed: {
    shiftList() {
      let list = []
      Vue._.forEach(this.$store.state.shifts.all, (shift) => {
        list.push({
          label: shift.shiftname,
          value: shift.shiftid
        })
      })
      return list
    }
  },
  watch: {
    selectedStore: function(store) {
      this.resetCloseShiftForm()
      if (store && this.selectedDate && this.selectedShift) {
        this.getCloseShiftForm(store, this.selectedDate)
      }
    },
    selectedDate: function(date) {
      this.resetCloseShiftForm()
      if (this.selectedStore && date && this.selectedShift) {
        this.getCloseShiftForm(this.selectedDate, date)
      }
    },
    selectedShift: function(shift) {
      this.resetCloseShiftForm()
      if (this.selectedStore && this.selectedDate && shift) {
        this.getCloseShiftForm(this.selectedStore, this.selectedDate)
      }
    }
  },
  data: function() {
    return {
      selectedDate: new Date(),
      selectedStore: null,
      selectedShift: null,
      closeShiftData: [],
      isManually: false,
      canShowManually: false
    }
  },
  methods: {
    getCloseShiftForm(store, date) {
      Vue.axios.post('getCloseShiftForm', {
          closingStoreId: store.value,
          closingDate: this.formatDate(date),
          isManualClosingShift: false
        }).then(response => {
          if (response.status == 204) {
            this.canShowManually = true
            this.showInfoMsg({
              message: 'No close shift data found'
            })
          } else {
            this.closeShiftData = response.data
          }
        })
        .catch((error) => {
          this.showErrorMsg()
        })
    },
    resetCloseShiftForm() {
      this.closeShiftData = []
      this.isManually = false
      this.canShowManually = false
    },
    submitSuccess() {
      this.selectedStore = null
      this.selectedShift = null
      this.resetCloseShiftForm()
    },
    showManually() {
      this.isManually = true
      Vue.axios.post('getCloseShiftForm', {
          closingStoreId: this.selectedStore.value,
          closingDate: this.formatDate(this.selectedDate),
          isManualClosingShift: true
        }).then(response => {
          this.closeShiftData = response.data
        })
        .catch((error) => {
          this.showErrorMsg()
        })
    }
  },
  created() {
    this.$store.dispatch('shifts/getShifts')
  }
};
</script>
