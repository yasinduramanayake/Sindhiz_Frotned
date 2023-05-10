export default {
  async AddLeaveForm(payload) {
    return await axios.post("/AddLeaveForm", payload);
  },

  async index(payload, perpage = "", currentpage = "") {
    return await axios.post(
      `/getleaves?per_page=${perpage}&page=${currentpage}`,
      payload
    );
  },

  async Getfile(payload) {
    return await axios.post("/getleavefile", payload);
  },

  async ApproveLeave(payload) {
    return await axios.post("/approve", payload);
  
  },

  async RejectLeave(payload) {
    return await axios.post("/reject", payload);
  },

};