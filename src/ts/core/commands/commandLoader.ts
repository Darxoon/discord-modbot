import { Command } from './command'
import colors from 'colors'
import { CommandManager } from './commandManager'
import { FsHelpers } from '../../util/fsHelpers'

require('colors')

export namespace CommandLoader {

	export function loadFromDirectory(dir: string) {
		const filePaths = FsHelpers.getAllFiles(dir)
		console.log(filePaths);
		const commands: Map<string, Command> = new Map

		console.log("Loading commands from directory".green, dir.yellow)

		filePaths.forEach(filePath => {
			if(!filePath.endsWith('.js'))
				return
			
			const modulePath = filePath.slice(0, -'.js'.length)
			console.log(modulePath)
			const module: Command = require(modulePath)
			console.log(module)

			// TODO verify that it's a valid command

			commands.set(module.keyword, require(modulePath))
		})

		console.log([...commands])

		CommandManager.registerCommands(...Array.from(commands.values()))
	}

}