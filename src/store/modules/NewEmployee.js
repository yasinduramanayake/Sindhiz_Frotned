export default {
    async AddNewEmployee(payload) {
      return await axios.post("/AddNewEmployee", payload);
    },
  
  };
  