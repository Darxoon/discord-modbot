module.exports = {
	keyword: 'help',

	name: 'help', 
	description: 'Shows the help menu.',
	syntax: 'help [<category|command>]',

	call(args, msg) {
		msg.channel.send('This is a help menu.')
	}
}