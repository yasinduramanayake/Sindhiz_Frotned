export default {
    async HolidaybulkSubmit(payload) {
      return await axios.post("/addHolidays", payload);
    },
  };
  