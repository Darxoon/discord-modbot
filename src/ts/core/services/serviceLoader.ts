import fs from 'mz/fs'
import path from 'path'
import { Service } from './service'
import { ServiceManager } from './serviceManager'
import { FsHelpers } from '../../util/fsHelpers'

export namespace ServiceLoader {

	export function loadFromDirectory(guild: string, dir: string) {
		const filePaths = FsHelpers.getAllFiles(dir)
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

			// TODO verify that it's a valid service

			services.set(module.id, require(modulePath))
		})

		console.log([...services])

		ServiceManager.registerServices(guild, ...Array.from(services.values()))
	}

}