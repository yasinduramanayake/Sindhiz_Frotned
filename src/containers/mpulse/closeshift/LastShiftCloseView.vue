<<template>
  <div className="animated">
    <b-card>
      <b-form-group label="Staff Name" label-for="staffname">
        <b-form-input
          id="staffname"
          type="text"
          readonly
          v-model.lazy.trim="form.staffname"
        />
      </b-form-group>
      <b-form-group label="Store Name" label-for="storename">
        <b-form-input
          id="storename"
          type="text"
          readonly
          v-model.lazy.trim="form.storename"
        />
      </b-form-group>
      <b-form-group label="Hours Worked" label-for="hours">
        <b-form-input
          id="hours"
          type="text"
          readonly
          v-model.lazy.trim="form.hours"
        />
      </b-form-group>
      <b-form-group label="EFTPOS" label-for="eftpos">
        <b-form-input
          id="eftpos"
          type="text"
          readonly
          v-model.lazy.trim="form.eftpos"
        />
      </b-form-group>
      <b-form-group label="Other Cash" label-for="othercash">
        <b-form-input
          id="othercash"
          type="text"
          readonly
          v-model.lazy.trim="form.othercash"
        />
      </b-form-group>
      <b-form-group label="Payments" label-for="payments">
        <b-form-input
          id="payments"
          type="text"
          readonly
          v-model.lazy.trim="form.payments"
        />
      </b-form-group>
      <b-form-group label="Shift Date" label-for="shiftdate">
        <b-form-input
          id="shiftdate"
          type="text"
          readonly
          v-model.lazy.trim="form.shiftdate"
        />
      </b-form-group>
      <b-form-group label="Shift Difference" label-for="difference">
        <b-form-input
          id="difference"
          type="text"
          readonly
          v-model.lazy.trim="form.difference"
        />
      </b-form-group>
      <b-form-group label="Comments" label-for="comments">
        <b-form-input
          id="comments"
          type="text"
          readonly
          v-model.lazy.trim="form.comments"
        />
      </b-form-group>
    </b-card>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
const formShape = {
  staffname: null,
  storename: null,
  eftpos: null,
  othercash: null,
  shiftdate: null,
  difference: 0,
  shiftdate: null,
  hours:null,
  comments:null,
  payments:null

};

export default {
  name: 'LastShiftCloseView',
  data: () => {
    return {
      form: Object.assign({}, formShape),
    }
  },
  methods:{

  },
  created() {
    axios
      .get("/getCloseCashInfoByUser")
      .then((response) => {
        if (response.data.success == false) {
            this.showErrorMsg({
              message: response.data.error
            })
           this.$emit('cancel');
        }
        else if(Object.keys(response.data).length == 0){
          this.showErrorMsg({
            message: "No Data found for logged in user."
          })
          this.$emit('cancel');
        }
        else{
          this.form.storename = response.data.storename;
          this.form.staffname = response.data.firstname + ' ' + response.data.lastname;
          this.form.eftpos = response.data.eftpos;
          this.form.othercash = response.data.othercash;
          this.form.difference = response.data.difference;
          this.form.shiftdate = response.data.shiftdate;
          this.form.hours = response.data.hours;
          this.form.comments = response.data.comments;
          this.form.payments = response.data.payments;
        }
      })
      .catch((error) => {
          if(error.response != null && error.response.data.message != null){
            this.showErrorMsg({
              message: "Error Occured: " + error.response.data.message
            });
            this.$emit('cancel');
          }
          else{
            this.showErrorMsg({
              message: "Error Occured. Please contact administrator."
            });
            this.$emit('cancel');
          }
        })

  }
}
</script>
