const state = {
  all: [],
  global: [],
  min_stock: [],
  inventory: [],
  byBarcode: [],
  bySubcat: [],
  stocktake: [],
  stocktakebystore:[],
  min_stock_qty_products: [],
  disable_products: [],
  inhouseproducts: [],
  inhousestproducts:[]
}

const getters = {}

const actions = {
  deleteInhouseProduct({ commit }, params)
  {
    return new Promise((resolve, reject) => {
    axios
      .post("/deleteInhouseProduct", params, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
      .then(response => {resolve(response)})
      .catch ( error => (reject(error)));
  })
},
  updateInhouseProductsQty({ commit }, params)
  {
    return new Promise((resolve, reject) => {
    axios
      .post("/updateInhouseProductsQty", params, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
      .then(response => {resolve(response)})
      .catch ( error => (reject(error)));
  })
},
storeInhouseStockTakeProducts({ commit }, params)
{
  return new Promise((resolve, reject) => {
  axios
    .post("/storeInhouseStockTakeProducts", params, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
    .then(response => {resolve(response)})
    .catch ( error => (reject(error)));
})
},
  storeInhouseProducts({ commit }, params)
  {
    return new Promise((resolve, reject) => {
    axios
      .post("/storeInhouseProducts", params, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
      .then(response => {resolve(response)})
      .catch ( error => (reject(error)));
  })
},
storeInhouseProductsOrder({ commit }, params)
{
  return new Promise((resolve, reject) => {
  axios
    .post("/storeInhouseProductsOrder", params, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
    .then(response => {resolve(response)})
    .catch ( error => (reject(error)));
})
},

getInhouseOrderProducts({ commit }, params)
{
  return new Promise((resolve, reject) => {
  axios
    .post("/getInhouseOrderProducts", params, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
    .then(response => {resolve(response)})
    .catch ( error => (reject(error)));
})
},
  getAllProducts ({ commit }, params) {
    axios
      .get("/listAllProducts", {params})
      .then(response => (commit('setData', response.data)));
  },
  getGlobalProducts ({ commit }) {
    axios
      .get("/getGlobalProducts")
      .then(response => (commit('setGlobal', response.data)));
  },
  getStockTakeProducts ({ commit }, params) {
    axios
      .post("/getStockTakeProducts", params)
      .then(response => (commit('setStockTake', response.data)));
  },
  getStockTakeProductsByStore({ commit }, params) {
    axios
      .post("/getStockTakeProductsByStore", params)
      .then(response => (commit('setStockTakeByStore', response.data)));
  },
  getMinStockQtyProducts ({ commit }, params) {
    axios
      .post("/getMinStockQtyProducts", params)
      .then(response => (commit('setMinStockQty', response.data)));
  },
  getDisableProducts ({ commit }, params) {
    axios
      .post("/getDisableProducts", params)
      .then(response => (commit('setDisableProducts', response.data)));
  },
  getByBarcode ({ commit }, params) {
    axios
      .get("/getProductsByBarcode/"+params)
      .then(response => (commit('setByBarcode', response.data)));
  },
  getBySubcat ({ commit }, params) {
    axios
      .get("/getProductsBySubcat/"+params)
      .then(response => (commit('setBySubcat', response.data)));
  },
  getInventoryProducts ({ commit }) {
    axios
      .get("/listInventoryProducts")
      .then(response => (commit('setInventory', response.data)));
  },
  getInhouseProducts({ commit }, params) {
  axios
    .get("/getInhouseProducts/"+params)
    .then(response => (commit('setInHouseProducts', response.data)));
  },
  getInhouseStockTakeProducts({ commit }, params) {
  axios
    .get("/getInhouseStockTakeProducts/"+params)
    .then(response => (commit('setInHouseStProducts', response.data)));
  },
  getMinStockQtys ({ commit }, params) {
    axios
      .get("/listMinStockQtys/"+params.storeId)
      .then(response => (commit('setMinStock', response.data)));
  },
  update ({ commit }, params) {
    commit('setRowData', params)
  },
  remove ({ commit }, params) {
    commit('removeProduct', params)
  },
  clear ({ commit }) {
    commit('setData', [])
    commit('setMinStock', [])
  },
  clearBySubcat ({ commit }) {
    commit('setBySubcat', [])
  },
  clearStockTakeProducts({ commit }) {
    commit('setStockTake', [])
  },
  clearMinStockQtyProducts({ commit }) {
    commit('setMinStockQty', [])
  },
  clearDisableProducts({ commit }) {
    commit('setDisableProducts', [])
  }
}

const mutations = {
  setData (state, data) {
    state.all = data
  },
  setGlobal (state, data) {
    state.global = data
  },
  setStockTake (state, data) {
    state.stocktake = data
  },
  setStockTakeByStore(state, data) {
    state.stocktakebystore = data
  },
  setMinStockQty (state, data) {
    state.min_stock_qty_products = data
  },
  setInventory (state, data) {
    state.inventory = data
  },
  setMinStock (state, data) {
    state.min_stock = data
  },
  setDisableProducts (state, data) {
    state.disable_products = data
  },
  setRowData(state, data) {
    var index = _.findIndex(state.all, {productid: data.productid});
    state.all.splice(index, 1, data);
  },
  setByBarcode(state, data) {
    state.byBarcode = data
  },
  setBySubcat(state, data) {
    state.bySubcat = data
  },
  removeProduct(state, data) {
    var index = _.findIndex(state.all, {productid: data.productid});
    state.all.splice(index, 1);
  },
  setInHouseProducts(state, data){
    state.inhouseproducts = data
  },
  setInHouseStProducts(state,data){
    state.inhousestproducts = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
