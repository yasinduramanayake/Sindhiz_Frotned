<template>
<div className="animated">
  <b-card>
    <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
      <b-row>
        <b-col sm="4">
          <b-form-group label="Year">
            <year-select v-model="selectedYear"></year-select>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group label="Store" label-for="store">
            <store-select v-model="selectedStore"></store-select>
          </b-form-group>
        </b-col>
        <b-col sm="4" v-if="weekData.length > 0">
          <b-form-group label="Week" label-for="week">
            <v-select :options="weekData" placeholder="Select week" v-model="selectedWeek">
              <template slot="option" slot-scope="option">
                <b v-if="option.rosterid">{{ option.label }}</b>
                <div v-else>{{ option.label }}</div>
              </template>
            </v-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-btn variant="primary" @click="showSendComm">Send Comms</b-btn>
        </b-col>
        <b-col sm="4">
          <b-btn variant="success" @click="showCopyRoster">Copy Roster</b-btn>
        </b-col>
      </b-row>
      <br/>
      <br/>
      <br/>
      <b-row v-if="storeHours > 0">
         <h2><b-badge variant="danger">Max Store hours allocation: {{storeHours}}</b-badge></h2>

      </b-row>
    </b-form>
  </b-card>

  <week-days-form v-if="canShowDays" :storeId="selectedStore" :weekDays="selectedWeekData" :storeHours="storeHours" :checkStoreHours="checkStoreHours" @success="submitSuccess" />

  <div>
    <b-modal ref="modalSendComm" title="Send Comms" hide-footer @hide="hideSendComm" size='lg' no-enforce-focus>
      <send-comm-form v-if="canShowSendComm" @success="sendCommSuccess"/>
    </b-modal>

    <b-modal ref="modalCopyRoster" title="Copy Roster" hide-footer @hide="hideCopyRoster" size='lg' no-enforce-focus>
      <copy-roster-form v-if="canShowCopyRoster" @success="copyRosterSuccess"/>
    </b-modal>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import StoreSelect from '../custom-components/StoreSelect'
import YearSelect from '../custom-components/YearSelect'
import WeekDaysForm from './WeekDaysForm'
import SendCommForm from './SendCommForm'
import CopyRosterForm from './CopyRosterForm'

export default {
  name: 'Roster',
  components: {
    StoreSelect,
    YearSelect,
    WeekDaysForm,
    SendCommForm,
    CopyRosterForm
  },
  watch: {
    selectedStore: function(store) {

      this.closeShiftData = []
      this.weekData = []
      this.canShowDays = false;
      if (store && this.selectedYear) {
        this.getRosterList(store.value, this.selectedYear)
      }
    },
    selectedYear: function(year) {
      this.closeShiftData = []
      this.weekData = []
      this.canShowDays = false;
      if (year && this.selectedStore) {
        this.getRosterList(this.selectedStore.value, year)
      }
    },
    selectedWeek: function(week) {
      this.canShowDays = false
      this.$nextTick(() => {
        if (week) {
          this.selectedWeekData = week
          this.canShowDays = true
        }

      })
    }
  },
  data: function() {
    return {
      selectedStore: null,
      selectedYear: null,
      selectedWeek: null,
      shouldSelectWeek: null,
      weekData: [],
      canShowDays: false,
      selectedWeekData: null,
      canShowSendComm: false,
      canShowCopyRoster: false,
      storeHours: 0,
      checkStoreHours: true
    }
  },
  methods: {
    submitSuccess() {
      this.selectedStore = null
      this.selectedYear = null
    },
    getRosterList(storeId, selectedYear) {
      this.storeHours = 0;
      if (Array.isArray(this.$store.state.stores.all) && this.$store.state.stores.all.length > 0) {
        this.storeHours = this.$store.state.stores.all.find(x => x.storeid === storeId).hoursop;
      }
      Vue.axios.get('getRosterList?storeId=' + storeId + '&year=' + selectedYear)
        .then(response => {
          this.weekData = []
          for (var i = 1; i <= 52; i++) {
            var week = _.find(response.data, function(o) {
              return o.weekno == i
            })
            if (!week) {
              week = {
                rosterid: "",
                weekNo: i,
                year: selectedYear,
                storeId: storeId
              }
            }

            if (this.shouldSelectWeek == i ) {
              this.selectedWeek = week
            }

            week.label = 'Week ' + i + ' - ' + this.getStartOfWeek(this.selectedYear, i) + ' to ' + this.getEndOfWeek(this.selectedYear, i)
            this.weekData.push(week)
          }
          this.shouldSelectWeek = null
        })
        .catch((error) => {
          this.showErrorMsg()
        })
    },

    showSendComm() {
      this.canShowSendComm = true
      this.$refs.modalSendComm.show()
    },
    hideSendComm() {
      this.canShowSendComm = false
    },
    sendCommSuccess() {
      this.$refs.modalSendComm.hide()
    },
    showCopyRoster() {
      this.canShowCopyRoster = true
      this.$refs.modalCopyRoster.show()
    },
    hideCopyRoster() {
      this.canShowCopyRoster = false
    },
    copyRosterSuccess(params) {
      this.selectedYear = params.year
      this.selectedStore = params.store
      this.shouldSelectWeek = params.weekNo
      this.$refs.modalCopyRoster.hide()
    }
  },
  created() {
    this.$store.dispatch('staffs/getActiveStaffs')

  }
};
</script>
<style>
@media(max-width:480px) {
  .add-shift {
    min-width: 100px;
  }
}

.card-body {
  position: relative;
}

.custom-style ul {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}

.custom-style ul li {
  display: inline-block;
  margin: 0px 1px 10px;
  padding: 0px;
}

.custom-style ul li .form-control {
  max-width: 88px;
}

.custom-style ul li .full-fld .form-control {
  max-width: 100%;
}

.f-close {
  display: inline-block;
  position: absolute;
  right: 5px;
  top: 0px;
}

/* .v-select .selected-tag {
  position: absolute;
} */

.full-field {
  margin: 0px 7px;
}

.card-body-box {
  width: 270px;
}

.add-shift {
  min-width: 90px;
}

.submit-button {
  float: none;
  display: block;
  margin: 0px auto;
  text-align: center;
  position: fixed;
  bottom: 0;
  background: #fff;
  clear: both;
  right: 0;
  left: 0;
  padding: 20px 0;
}
.custom-style ul li{vertical-align:top; }
.custom-style ul li input {
  max-width: 55px !important;
}
.c-sd ul{width:auto !important;}
.c-sd ul li{display:block !important; width:auto !important;}
.c-sd .dropdown-toggle{height:40px; width:80px !important;}
.c-sd .vs__selected-options{display: inline-block;
    width: 32px;
    padding-top: 4px;}
</style>
