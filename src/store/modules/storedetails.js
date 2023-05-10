export default {
    async GetStoreById(payload) {
      return await axios.post("/getstorebyid" , payload);
    }, 
  };