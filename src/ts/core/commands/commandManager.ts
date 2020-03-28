import { Command } from './command'
import { Message } from 'discord.js'
import { ServiceManager } from '../services/serviceManager'
import { gname } from '../..'

export namespace CommandManager {

	const commands: Command[] = []

	export function registerCommand(command: Command) {
		commands.push(command)
		console.log(`Registered command`.green, command.name.yellow)
	}
	export function registerCommands(...commandsToPush: Command[]) {
		commandsToPush.forEach(command => {
			registerCommand(command)
		})
	}

	export function getCommand(name: string): Command {
		return commands.filter(cmd => cmd.name === name)[0] ?? null
	}

	export function hasCommand(name: string) {
		return getCommand(name) !== null
	}

	export function call(args: string[], message: Message) {
		const command = getCommand(args[0])
		if(!command) {
			console.log(`Command '${args[0]}' doesn't exist (in Message '${message.content}')`.red)
			return
		} else {
			try {
				command.call(args, message)
				console.log(`Command '${args[0]}' called (in Message '${message.content}')`.blue)
			} catch (e) {
				console.error(`Error while trying to call command '${args[0]}':`.red)
				console.error(e)
			}
		}
	}

}