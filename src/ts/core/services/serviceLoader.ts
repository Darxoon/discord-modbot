import fs from 'mz/fs'
import path from 'path'
import { Service } from './service'
import { ServiceManager } from './serviceManager'

export namespace ServiceLoader {

	// TODO offload into fsHelpers file
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

	export function loadFromDirectory(guild: string, dir: string) {
		const filePaths = getAllFiles(dir)
		console.log(filePaths);
		const services: Map<string, Service> = new Map

		console.log("Loading services from directory".green, dir.yellow)

		filePaths.forEach(filePath => {
			if(!filePath.endsWith('.js'))
				return
			
			const modulePath = filePath.slice(0, -'.js'.length)
			console.log(modulePath)
			const module: Service = require(modulePath)
			console.log(module)

			// TODO verify that it's a valid command

			services.set(module.id, require(modulePath))
		})

		console.log([...services])

		ServiceManager.registerServices(guild, ...Array.from(services.values()))
	}

}