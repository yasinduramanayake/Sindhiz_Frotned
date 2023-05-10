export default {
  async bulkSubmit(payload) {
    return await axios.post("/bulkupload", payload);
  },
  async bulkSubmitcapping(payload) {
    return await axios.post("/cappingbulkupload", payload);
  },
  async bulkSubmitpromotion(payload) {
    return await axios.post("/promotionbulkupload", payload);
  },
};
