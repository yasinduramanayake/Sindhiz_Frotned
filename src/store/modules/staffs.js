const state = {
  all: [],
  attributes: [],
  staffAttributes: [],
  staffStores: [],
  active: []
};

const getters = {};

const actions = {
  getStaffs({ commit }, params) {
    axios
      .get("/getStaff", { params })
      .then(response => commit("setData", response.data));
  },
  getActiveStaffs({ commit }) {
    axios
      .get("/getActiveStaff")
      .then(response => commit("setActive", response.data));
  },

  addStaff({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/addStaff", params)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },
  getAttributes({ commit }) {
    axios
      .get("/staff/attributes")
      .then(response => commit("setAttributes", response.data));
  },
  getStaffAttributes({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get("/staff/attributes/" + params.staffid)
        .then(response => {
          commit("setStaffAttributes", response.data);
          resolve(response.data);
        })
        .catch(error => reject(error));
    });
  },
  getStaffStores({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get("/staff/stores/" + params.staffid)
        .then(response => {
          commit("setStaffStores", response.data);
          resolve(response.data);
        })
        .catch(error => reject(error));
    });
  },
  toggleActive({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/disableStaff", params)
        .then(response => {
          commit("setToggleActive", params.staffid);
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },
  clear({ commit }) {
    commit("setData", []);
  }
};

const mutations = {
  setData(state, data) {
    state.all = data;
  },
  setActive(state, data) {
    state.active = data;
  },
  setAttributes(state, data) {
    state.attributes = data;
  },
  setStaffAttributes(state, data) {
    state.staffAttributes = data;
  },
  setStaffStores(state, data) {
    state.staffStores = data;
  },
  setToggleActive(state, staffid) {
    var index = _.findIndex(state.all, { staffid: staffid });
    state.all[index].isactive = state.all[index].isactive == 1 ? 0 : 1;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
