module.exports = {
	id: 'error', 

	name: 'Error', 
	description: 'Throws an error.',

	getTrustedServices() {
		return []
	},
	getData(path, api) {
		return null
	},
	setData(path, value, api) {

	},
	events: {
		error(event, api) {
			throw new Error(event.reason)
		},
		logApi(event, api) {
			console.log(api)
		}
	}
}