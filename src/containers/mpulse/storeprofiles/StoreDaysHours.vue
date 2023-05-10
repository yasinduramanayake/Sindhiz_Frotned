<template>
  <div>
    <b-table :items="dayHours" hover bordered :fields="fields">
      <template v-slot:cell(value)="data">
        <b-form-input type="number" v-if="data.item.id == 'Mon'" v-model.lazy.number="mon_hours"></b-form-input>

        <b-form-input   type="number" v-if="data.item.id == 'Tue'" v-model.lazy.number="tue_hours"></b-form-input>

        <b-form-input  type="number" v-if="data.item.id == 'Wed'" v-model.lazy.number="wed_hours"></b-form-input>

        <b-form-input  type="number" v-if="data.item.id == 'Thur'" v-model.lazy.number="thur_hours"></b-form-input>

        <b-form-input min="0" max="24" type="number" v-if="data.item.id == 'Fri'" v-model.lazy.number="fri_hours"></b-form-input>

        <b-form-input min="0" max="24" type="number" v-if="data.item.id == 'Sat'" v-model.lazy.number="sat_hours"></b-form-input>

        <b-form-input min="0" max="24" type="number" v-if="data.item.id == 'Sun'" v-model.lazy.number="sun_hours"></b-form-input>
      </template>
    </b-table>
    <b-form-group label="Hours of Operations" label-for="hoursop">
      <b-form-input id="hoursop" readonly type="number" aria-describedby="liveFeedbackHoursop" v-model.lazy.number="hoursTotal" placeholder="Change Limit" autofocus />

    </b-form-group>
  </div>
</template>

<script>
import Vue from "vue";
import {
  required, maxValue, minValue,between
} from "vuelidate/lib/validators"
export default {
  name: "StoreDaysHours",
  props: {
    storeProfile: Object
  },
  data: () => {
    return {
      fields: [
        { key: "id", label: "Day" },
        { key: "value", label: "Hours" },

      ],
      dayHours: [],
      mon_hours: 0,
      tue_hours: 0,
      wed_hours: 0,
      thur_hours: 0,
      fri_hours: 0,
      sat_hours: 0,
      sun_hours: 0,
      total: 0,

    };
  },
  computed:{
    hoursTotal() {
      this.total = Number(this.mon_hours) + Number(this.tue_hours) + Number(this.wed_hours) + Number(this.thur_hours) + Number(this.fri_hours) + Number(this.sat_hours) + Number(this.sun_hours);
      return this.total;
    }
  },

  methods:{

  },
  created() {
    this.mon_hours = this.storeProfile.mon_hours;
    this.tue_hours = this.storeProfile.tue_hours;
    this.wed_hours= this.storeProfile.wed_hours;
    this.thur_hours= this.storeProfile.thur_hours;
    this.fri_hours= this.storeProfile.fri_hours;
    this.sat_hours= this.storeProfile.sat_hours;
    this.sun_hours= this.storeProfile.sun_hours;

    this.dayHours.push({
      id: "Mon",
      value: this.storeProfile.mon_hours,
    });
    this.dayHours.push({
      id: "Tue",
      value: this.storeProfile.tue_hours,
    });
    this.dayHours.push({
      id: "Wed",
      value: this.storeProfile.wed_hours,
    });
    this.dayHours.push({
      id: "Thur",
      value: this.storeProfile.thur_hours,
    });
    this.dayHours.push({
      id: "Fri",
      value: this.storeProfile.fri_hours,
    });
    this.dayHours.push({
      id: "Sat",
      value: this.storeProfile.sat_hours,
    });
    this.dayHours.push({
      id: "Sun",
      value: this.storeProfile.sun_hours,
    });
  }
};
</script>
