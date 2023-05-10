// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "./polyfill";
import "./helper";
// import cssVars from 'css-vars-ponyfill'
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import VueAxios from "vue-axios";
import * as VeeValidate from "vee-validate";
import VueLodash from "vue-lodash";
import lodash from "lodash";
import App from "./App";
import CommonMixins from "@/mixins/commonmixins";
import Vuelidate from "vuelidate";
import CripLoading from "crip-vue-loading";

import vSelect from "vue-select";
import router from "./router/index";
import store from "./store";

Vue.use(VueAxios, axios);
Vue.use(CripLoading, { axios, color: "#32CD32" });
Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(VueLodash, { lodash: lodash });

// Moment JS
import VueMoment from "vue-moment";
var moment = require("moment");
// require('moment/locale/en-au');
Vue.use(VueMoment, {
  moment,
});

Vue.component("v-select", vSelect);

import VueNumberInput from "@chenfengyuan/vue-number-input";
Vue.use(VueNumberInput);

import JsonCSV from "vue-json-csv";
Vue.component("downloadCsv", JsonCSV);

import { ClientTable, Event } from "vue-tables-2";
Vue.use(ClientTable);

import { setupCalendar, DatePicker } from "v-calendar";
import "v-calendar/lib/v-calendar.min.css";
setupCalendar({
  firstDayOfWeek: 2, // Monday
  masks: {
    L: "DD/MM/YYYY",
  },
});
Vue.component("v-date-picker", DatePicker);

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Vue.axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
};

Vue.router = router;

Vue.use(require("@websanova/vue-auth"), {
  auth: require("@websanova/vue-auth/drivers/auth/bearer.js"),
  http: require("@websanova/vue-auth/drivers/http/axios.1.x.js"),
  router: require("@websanova/vue-auth/drivers/router/vue-router.2.x.js"),
  rolesVar: "permissions",
  loginData: { url: "login", fetchUser: false },
  fetchData: { url: "user" },
  refreshData: { url: "refresh" },
  parseUserData: function (data) {
    return data || {};
  },
});

import VueNotifications from "vue-notifications";
import miniToastr from "mini-toastr"; // https://github.com/se-panfilov/mini-toastr

const toastTypes = {
  success: "success",
  error: "error",
  info: "info",
  warn: "warn",
};

miniToastr.init({ types: toastTypes });

function toast({ title, message, type, timeout, cb }) {
  return miniToastr[type](message, title, timeout, cb);
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast,
};

//  mixins

Vue.mixin(CommonMixins);

// vee validation

Vue.use(VeeValidate);

require("@/assets/scss/expenses_add.scss");
require("@/assets/scss/new_employee.scss");


//  VueNotifications.setPluginOptions(options)

Vue.use(VueNotifications, options);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  template: "<App/>",
  components: {
    App,
  },
});
