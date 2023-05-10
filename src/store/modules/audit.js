export default {
  async addAudit(payload) {
    return await axios.post("/addaudit", payload);
  },
  async getAudit(payload, perPage, currentPage) {
    return await axios.post(`/getaudit?per_page=${perPage}&page=${currentPage}`, payload);
  },

  async getAllStores() {
    return await axios.get("/getAllStores");
  },
};
