export default {
    async GetInhouseOrderDetail(payload) {
      return await axios.post("/getInhouseOrdersDetails", payload);
    },
  };
  