import { Command } from './command'
import colors from 'colors'
import { CommandManager } from './commandManager'
import { FsHelpers } from '../../util/fsHelpers'
import path from 'path'

require('colors')

export namespace CommandLoader {

	export function loadFromDirectory(dir: string) {
		const filePaths = FsHelpers.getAllFiles(dir)
		const commands: Map<string, Command> = new Map

		console.log("\nLoading commands from directory".green, dir.yellow)

		filePaths.forEach(filePath => {
			if(!filePath.endsWith('.js'))
				return
			
			const modulePath = filePath.slice(0, -'.js'.length)
			console.log(modulePath)
			const module: Command = require(modulePath)

			const isValid = module.name && typeof module.name === 'string'
				&& module.keyword       && typeof module.keyword === 'string'
				&& module.description   && typeof module.description === 'string'
				&& module.syntax        && typeof module.syntax === 'string'
				&& module.call && module.call instanceof Function 

			if(isValid)
				commands.set(module.keyword, require(modulePath))
			else
				console.error(`Command '${path.basename(modulePath)}' could not be loaded because it doesn't `.red +
					`fulfill the structural requirements for a service.`.red)
		})

		CommandManager.registerCommands(...Array.from(commands.values()))
	}

}