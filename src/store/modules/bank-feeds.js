const state = {
  all: [],
  detail: null
};

const getters = {};

const actions = {
  getBankFeeds({ commit }, params) {
    axios
      .get("/getBankFeeds/" + params.storeId)
      .then(response => commit("setData", response.data));
  },
  getStoresBankFeeds({ commit }, params) {
    axios
      .post("/getStoresBankFeeds", params)
      .then(response => commit("setData", response.data));
  },
  getBankFeedDetail({ commit }, params) {
    axios
      .post("/getBankFeedDetail", params)
      .then(response => commit("setDetail", response.data));
  },
  addBankFeed({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/addBankFeed", params)
        .then(response => {
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
  setDetail(state, data) {
    state.detail = data;
  },
  removeBankFeed(state, data) {
    var index = _.findIndex(state.all, { invoiceid: data.invoiceid });
    state.all.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
