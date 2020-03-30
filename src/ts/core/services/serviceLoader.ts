import fs, { truncateSync } from 'mz/fs'
import path from 'path'
import { Service } from './service'
import { ServiceManager } from './serviceManager'
import { FsHelpers } from '../../util/fsHelpers'

export namespace ServiceLoader {

	export function loadFromDirectory(guild: string, dir: string) {
		const filePaths = FsHelpers.getAllFiles(dir)
		const services: Map<string, Service> = new Map

		console.log("\nLoading services from directory".green, dir.yellow)

		filePaths.forEach(filePath => {
			if(!filePath.endsWith('.js'))
				return
			
			const modulePath = filePath.slice(0, -'.js'.length)
			console.log(modulePath)
			const module: Service = require(modulePath)
			// console.log(module)

			// check that it's a valid service
			const isValid = module.id && typeof module.id === 'string' 
				&& module.name        && typeof module.name === 'string' 
				&& module.description && typeof module.description === 'string' 
				&& module.events      && typeof module.events === 'object' 
				&& Object.values(module.events).reduce<boolean>((prev, current) => prev && current instanceof Function, true)
				&& module.getTrustedServices && module.getTrustedServices instanceof Function
				&& module.getData && module.getData instanceof Function
				&& module.setData && module.setData instanceof Function

			if(isValid)
				services.set(module.id, require(modulePath))
			else
				console.error(`Service '${path.basename(modulePath)}' could not be loaded because it doesn't `.red +
					`fulfill the structural requirements for a service.`.red)

		})

		// console.log([...services])

		ServiceManager.registerServices(guild, ...Array.from(services.values()))
	}

}