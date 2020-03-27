module.exports = {
	keyword: 'kick',

	name: 'kick', 
	description: 'Kicks a user.',
	syntax: 'kick <@user>',

	call(args, msg) {
		msg.channel.send('kicking ' + args[1])
	}
}