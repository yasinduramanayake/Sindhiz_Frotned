<template>
<div class="animated fadeIn">
  <b-card no-body>
    <b-card-body>
      <b-row>
        <b-col lg="12">
          <h3 class="center"> Week #{{ weekDays.weekNo }} selected</h3>
          <div class="table-responsive">
            <table class="table ">
              <thead>
                <tr>
                  <th v-for="(day,index) in weekDaysByKeys">{{ day }} <br/> Max Hours: {{dayAllocatedHours[index]}}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-for="(day, index) in weekDaysByKeys">
                    <div class="card-body-box" v-for="(shiftdata, indexInner) in selectedShifts[day]">
                      <b-card bg-variant="light">
                        <div class="custom-style">
                          <span class="f-close">
                            <i class="fa fa-times delete-shift-btn" v-on:click="removeSelectedShifts(indexInner, day)"></i>
                          </span>
                          <ul>
                            <li>
                              <number-input v-model="shiftdata.shiftStartHours" :min="0" :max="12" placeholder="HH" ></number-input>
                            </li>
                            <li>
                              <number-input v-model="shiftdata.shiftStartMinutes" :min="0" :max="59" placeholder="MM" ></number-input>
                            </li>
                              <li>
                                <v-select :options="meridiemList" placeholder="Select Meridiem" class="c-sd" v-model="shiftdata.shiftStartMeridiem"></v-select>
                              </li>
                          </ul>
                          <ul>
                            <li>
                              <number-input v-model="shiftdata.shiftEndHours" :min="0" :max="12" placeholder="HH" ></number-input>
                            </li>
                            <li>
                              <number-input v-model="shiftdata.shiftEndMinutes" :min="0" :max="59" placeholder="MM" ></number-input>
                            </li>
                            <li>
                              <v-select :options="meridiemList" placeholder="Select Meridiem" class="c-sd" v-model="shiftdata.shiftEndMeridiem"></v-select>
                            </li>
                          </ul>
                        </div>
                        <b-row>
                          <b-col sm="12">
                            <v-select :options="staffList" placeholder="Select Staff" class="full-field" v-model="shiftdata.staff"></v-select>
                            </li>
                          </b-col>
                        </b-row>
                      </b-card>
                    </div>
                    <b-button default variant="primary" type="button" class="add-shift" v-on:click="addNewShift(index,day)" size="sm">Add Shift</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="submit-button">
            <b-button type="button" variant="primary" @click="submitRoster(false)">Save Draft</b-button>
            <b-button class="ml-1" type="button" variant="success" @click="submitRoster(true)">Schedule Roster</b-button>
          </div>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</div>
</template>

<script>
import Vue from 'vue'
import {
  mapState,
  mapActions
} from 'vuex'
import vSelect from 'vue-select'

const weekDaysByKey = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday"
}
export default {
  name: "WeekDaysForm",
  components: {
    vSelect,
  },
  props: {
    weekDays: Object,
    storeHours: {type:Number,required:false,default:0},
    checkStoreHours: {type:Boolean, required:false, default:false},
    storeId: Object
  },
  data() {
    return {
      staffList: [],
      weekDaysByKeys: Object.assign({}, weekDaysByKey),
      selectedRoster: null,
      selectedShifts: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
      },
      meridiemList:['AM', 'PM'],
      totalShiftsMinutes: 0
    }
  },
  computed: mapState({
    staffs: state => state.staffs.active,
    rosterData: state => state.roster.rosterData,
    dayAllocatedHours: state => state.roster.storeDayHours,
  }),
  methods: {
    submitRoster(isSchedule) {
      this.totalShiftsMinutes = 0
      let processedData = this.processShifts(this.selectedShifts);
      if (!processedData.hasError) {
        if(this.checkStoreHours == true && (Math.abs(this.totalShiftsMinutes/60)) > this.storeHours){
          this.showErrorMsg({
            message: "Allocated hours exceeded, please adjust your hours or contact office to discuss."
            }
          )
          return;
        }
        if (!this.weekDays.rosterid) {
          Vue.axios.post('/addRosterInstance', {
            weekNo: this.weekDays.weekNo,
            year: this.weekDays.year,
            storeId: this.weekDays.storeId,
            isScheduled: isSchedule
          }).then((response) => {
            // Update rosterid before submitting
            this.weekDays.rosterid = response.data.rosterid
            _.forEach(processedData.shifts, (shift) => {
              shift.rosterid = response.data.rosterid
            })
            _.forEach(this.selectedShifts, (shift) => {
              _.forEach(shift, (day) => {
                day.rosterid = response.data.rosterid
              })
            })
            this.modifyRosterData(isSchedule, processedData.shifts)
          }).catch(() => {
            this.showErrorMsg({
              message: "Can't create the roster"
            })
          })
        } else {
          this.modifyRosterData(isSchedule, processedData.shifts)
        }

      } else {
        this.showErrorMsg({
          message: processedData.message
        })
      }
    },
    modifyRosterData(isSchedule, shifts) {
      Vue.axios.post('/modifyRosterData/' + this.weekDays.rosterid + '/scheduled/' + isSchedule, shifts)
        .then(() => {
          var message = isSchedule ? 'scheduled' : 'saved';
          this.showSuccessMsg({
            message: 'Roster ' + message + ' successfully'
          });
        })
        .catch(() => {
          this.showErrorMsg()
        })
    },
    addNewShift: function(index, day) {
      this.selectedShifts[day].push({
        shiftStartHours: 0,
        shiftStartMinutes: 0,
        shiftEndHours: 0,
        shiftEndMinutes: 0,
        shiftStartMeridiem:"AM",
        shiftEndMeridiem:"PM",
        staff: '',
        day: day,
        rosterid: this.weekDays.rosterid,
        dayNo: index
      });
    },
    removeSelectedShifts: function(index, day) {
      Vue.delete(this.selectedShifts[day], index);
    },
    processShifts: function(shifts) {
      var shiftDayHours = [];
      var days = Object.keys(shifts);
      var processShifts = {
        shifts: [],
        hasError: false,
        message: ''
      };
      var shiftFound = false;
      for (var index = 0; index < days.length; index++) {
        if (shifts[days[index]].length > 0) {
          shiftFound = true;
        }
      }
      if (!shiftFound) {
        processShifts.hasError = true;
        processShifts.message = 'Please fill shift';
      }
      for (var index = 0; index < days.length; index++) {
        var dayShifts = shifts[days[index]];
        for (var i = 0; i < dayShifts.length; i++) {
          var shift = dayShifts[i];
          if (!shift.staff || !shift.staff.value) {
            processShifts.hasError = true;
            processShifts.message = 'Shift should have staff Id';
            processShifts.shift = shift;
          }

          if (!shift.shiftStartHours) {
            processShifts.hasError = true;
            processShifts.message = 'Shift start hours time missing';
            return processShifts;
          }

          if (!shift.shiftStartMinutes) {
            shift.shiftStartMinutes = 0;
          }
          if (!shift.shiftStartMeridiem) {
            processShifts.hasError = true;
            processShifts.message = 'Shift start AM/PM Meridiem missing';
            return processShifts;
          }

          if (!shift.shiftEndHours) {
            processShifts.hasError = true;
            processShifts.message = 'Shift end time missing';
            processShifts.shift = shift;
          }

          if (!shift.shiftEndMinutes) {
            shift.shiftEndMinutes = 0;
          }
          if (!shift.shiftEndMeridiem) {
            processShifts.hasError = true;
            processShifts.message = 'Shift end AM/PM Meridiem missing';
            return processShifts;
          }

          if (!processShifts.hasError) {
            let currentShift = null;
            currentShift = {
              rosterid: shift.rosterid,
              dayno: shift.dayNo,
              staffid: shift.staff.value,
              shiftstarttime: this.ampmToHours(shift.shiftStartHours + ':' + shift.shiftStartMinutes+" "+ shift.shiftStartMeridiem) + ':00',
              shiftendtime: this.ampmToHours(shift.shiftEndHours + ":" + shift.shiftEndMinutes + " " + shift.shiftEndMeridiem) + ':00'
            }
            let dt1 = new Date("October 13, 2014 " + currentShift.shiftstarttime);
            let dt2 = new Date("October 13, 2014 " + currentShift.shiftendtime);
            let shiftMinutes =  this.diff_minutes(dt1, dt2);
            this.totalShiftsMinutes = this.totalShiftsMinutes + shiftMinutes;
            shiftDayHours[shift.dayNo] = (shiftDayHours[shift.dayNo] == null ||shiftDayHours[shift.dayNo] != undefined ? 0 : shiftDayHours[shift.dayNo] ) + shiftMinutes;
            processShifts.shifts.push(currentShift)
          } else {
            return processShifts;
          }
        }
      }
    
      if(!processShifts.hasError && shiftDayHours){
        for (var index = 0; index < shiftDayHours.length; index++) {
          if (shiftDayHours[index] > Math.abs(this.dayAllocatedHours[index] * 60)) {
            processShifts.hasError = true;
            processShifts.message =  weekDaysByKey[index] + ' Hours must be less than ' +  this.dayAllocatedHours[index] + ' allocated hours for day.';
            return processShifts;
          }
        }
      }
      else{
        processShifts.hasError = true;
        processShifts.message = 'Error in checking shift day hours allocation';
        return processShifts;
      }
      return processShifts;
    },
    diff_minutes(dt2, dt1)
    {

        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));

    },
    ampmToHours(time) {
      var hours = Number(time.match(/^(\d+)/)[1]);
      var minutes = Number(time.match(/:(\d+)/)[1]);
      var AMPM = time.match(/\s(.*)$/)[1];
      if (AMPM == "PM" && hours < 12) hours = hours + 12;
      if (AMPM == "AM" && hours == 12) hours = hours - 12;
      var sHours = hours.toString();
      var sMinutes = minutes.toString();
      if (hours < 10) sHours = "0" + sHours;
      if (minutes < 10) sMinutes = "0" + sMinutes;
      return (sHours +':'+sMinutes);
    },
    hoursAmpm(time) {
      var hours = Number(time.match(/^(\d+)/)[1]);
      var min = Number(time.match(/:(\d+)/)[1]);
      if (hours < 12) {
        return hours + ':' + min + ':AM';
      } else {
        hours=hours - 12;
        hours=(hours.length < 10) ? '0'+hours:hours;
        return hours+ ':' + min + ':PM';
      }
    }
  },

  created() {
    _.forEach(this.staffs, (staff) => {
      this.staffList.push({
        label: staff.firstname + ' ' + staff.lastname,
        value: staff.staffid
      })
    })

    if (this.$store.state.roster.storeDayHours.length == 0) {
      this.$store.dispatch("roster/getStoreDayHours", {storeId: this.storeId.value});
    }
    if (this.weekDays.rosterid) {
      this.$store.dispatch('roster/getRosterData', this.weekDays.rosterid)
        .then(data => {
          _.forEach(data, (shift) => {
            let staff = _.find(this.staffList, {
              value: shift.staffid
            });
            var shiftStartTime = this.hoursAmpm(shift.shiftstarttime).split(':');
            var shiftEndTime = this.hoursAmpm(shift.shiftendtime).split(':');

            this.selectedShifts[this.weekDaysByKeys[shift.dayno]].push({
              shiftStartHours: parseInt(shiftStartTime[0]),
              shiftStartMinutes: parseInt(shiftStartTime[1]),
              shiftEndHours: parseInt(shiftEndTime[0]),
              shiftEndMinutes: parseInt(shiftEndTime[1]),
              shiftStartMeridiem: shiftStartTime[2],
              shiftEndMeridiem: shiftEndTime[2],
              staff: staff ? staff : null,
              day: this.weekDaysByKeys[shift.dayno],
              rosterid: shift.rosterid,
              dayNo: shift.dayno
            });
          })
        })
    }
  }
}
</script>

<style>
table th,
td {
  text-align: center;
}
</style>
