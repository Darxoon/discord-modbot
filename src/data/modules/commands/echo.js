module.exports = {
	keyword: 'echo',

	name: 'echo', 
	description: 'Echoes the message',
	syntax: 'echo <message>',

	call(args, msg) {
		msg.channel.send(args.join(' '))
	}
}