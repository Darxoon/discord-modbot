module.exports = {
	id: 'tracklist', 

	name: 'Tracklist', 
	description: 'Tracks a list of every user ever and currently on that server',

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
			console.log('tracklist2', event)
		}
	}
}