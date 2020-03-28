module.exports = {
	id: 'autorole', 

	name: 'AutoRole', 
	description: 'Gives every user a role',

	getTrustedServices() {
		return []
	},
	getData(path, api) {
		return null
	},
	setData(path, value, api) {

	},
	events: {
		userJoined(event, api) {
			console.log('autorole2', event)
		}
	}
}