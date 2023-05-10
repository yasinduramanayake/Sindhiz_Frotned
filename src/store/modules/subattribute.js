export default {
	async getAllMainAttributes() {
	  return await axios.get("/getAllMainAttributes");
	},
  
	async addSubAttribute(payload) {
	  return await axios.post("/addsubattribute", payload);
	},
  
	async getAllSubAttributes(payload, perPage, currentPage) {
	  return await axios.post(`/getallsubattribute?per_page=${perPage}&page=${currentPage}`, payload);
	},
	async UpdateSubAttributes(payload, id) {
	  return await axios.put(`/updatesubattribute/${id}`, payload);
	},
	async DeleteSubAttributes(payload) {
	  return await axios.post('/deletesubattribute' , payload);
	},
  };
  