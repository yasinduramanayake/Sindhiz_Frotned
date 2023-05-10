const state = {
  all: [],
  staff: [],
  allCompanies: [],
  companystores:[],
};

const getters = {
  getStoreById: state => storeid => {
    return state.all.find(store => store.storeid === storeid);
  }
};

const actions = {
  getStores({ commit }, params) {
    axios
      .get("/stores", {params})
      .then(response => commit("setStores", response.data));
  },
  getAllStores({ commit }, params) {
    axios
      .get("/getAllStores", {params})
      .then(response => commit("setAllStores", response.data));
  },
  getCompanyStores({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get("/stores", {params})
        .then(response => {
          commit("setCompanyStores", response.data)
          resolve(response.data);
        })
        .catch(error => reject(error));
    });
  },
  addStore({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/addStore", params)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },
};

const mutations = {
  setStores(state, data) {
    state.all = data;
  },
  setAllStores(state, data) {
    state.allCompanies = data;
  },
  setStaffStores(state, data) {
    state.staff = data;
  },
  setCompanyStores(state, data) {
    state.companystores = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
