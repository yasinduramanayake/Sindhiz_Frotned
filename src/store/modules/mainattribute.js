export default {
	async addMainAttribute(payload) {
		return await axios.post("/addmainattribute", payload);
	},

	async getAllMainAttributes(payload) {
		return await axios.post("/getallmainattribute", payload);
	},

	async UpdateMainAttribute(payload, id) {
		return await axios.put(`/updatemainattribute/${id}`, payload);
	}
}