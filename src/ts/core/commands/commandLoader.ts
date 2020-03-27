import fs from 'mz/fs'
import path from 'path'
import { Command } from './command'
import colors from 'colors'
import { CommandManager } from './commandManager'

require('colors')

export namespace CommandLoader {

	function getAllFiles(dirPath: string): string[] {
		const files = fs.readdirSync(dirPath)
	   
		const arrayOfFiles: string[] = []
	   
		for(const file of files) {
			if (fs.statSync(dirPath + "/" + file).isDirectory())
				arrayOfFiles.push(...getAllFiles(dirPath + "/" + file))
			else
				arrayOfFiles.push(path.join(path.resolve(dirPath), file))
		}
	   
		return arrayOfFiles
	}

	export function loadFromDirectory(dir: string) {
		const filePaths = getAllFiles(dir)
		console.log(filePaths);
		const commands: Map<string, Command> = new Map

		console.log("Loading commands from directory '".green + dir.yellow + "'".green)

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