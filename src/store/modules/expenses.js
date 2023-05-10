export default {
  async AddClaimForm(payload) {
    return await axios.post("/AddClaimForm", payload);
  },

  async index(payload, perpage = "", currentpage = "") {
    return await axios.post(
      `/getexpenses?per_page=${perpage}&page=${currentpage}`,
      payload
    );
  },

  async Getfile(payload) {
    return await axios.post("/getexpensesfile", payload);
  },

  async ApproveLeave(payload) {
    return await axios.post("/approveexpense", payload);
  },

  async RejectLeave(payload) {
    return await axios.post("/rejectexpense", payload);
  },
};
