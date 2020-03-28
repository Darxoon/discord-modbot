import { Service } from "./service"
import fs from "mz/fs"
import path from 'path'
import { isInside } from 'is-inside'

const dataFolderPath = './src/data/serviceData'

export class ServiceApi {

	private serviceDataLocation: string
	private service: Service
	
	public constructor(service: Service) {
		this.service = service
		this.serviceDataLocation = path.join(dataFolderPath, service.id)
	}
	
	// guild management
	public async createGuildData(guild: string): Promise<void> {
		const guildPath = path.join(this.serviceDataLocation, `guild-${guild}`)
		if(!await fs.exists(guildPath))
			await fs.mkdir(guildPath)
	}
	public async removeGuildData(guild: string): Promise<void> {
		const guildPath = path.join(this.serviceDataLocation, `guild-${guild}`)
		if(await fs.exists(guildPath))
			await fs.rmdir(guildPath)
	}
 
	// user management
	public async getUserData(guild: string, user: string): Promise<any> {
		const filePath = path.join('userdata', 'user-' + user)
		// check if file exists
		if(!await fs.exists(filePath))
			return {}
		else 
			return await this.getFileJson(guild, filePath)
	}
	public async setUserData(guild: string, user: string, value: any): Promise<void> {
		const filePath = path.join('userdata', 'user-' + user)
		await this.writeFileJson(guild, filePath, value)
	}
	
	public async removeUserData(guild: string, user: string): Promise<void> {
		const filePath = path.join('userdata', 'user-' + user)
		await this.removeFile(guild, filePath)
	}
  
	// file management
	public async getFile(guild: string, dataPath: string): Promise<string> {
		const filePath = path.join(this.serviceDataLocation, `guild-${guild}`, dataPath)
		// check if path is inside guild folder
		if(!isInside(filePath, path.join(this.serviceDataLocation, `guild-${guild}`)))
			throw new Error(`Service '${this.service.name}' tried to read file '${filePath}' outside of guild folder. Access denied.`)
		// return data
		const data = await fs.readFile(filePath, 'utf8')
		return data
	}
	public async writeFile(guild: string, dataPath: string, value: string): Promise<void> {
		const filePath = path.join(this.serviceDataLocation, `guild-${guild}`, dataPath)
		// check if path is inside guild folder
		if(!isInside(filePath, path.join(this.serviceDataLocation, `guild-${guild}`)))
			throw new Error(`Service '${this.service.name}' tried to write to file '${filePath}' outside of guild folder. Access denied.`)
		// write data
		await fs.truncate(filePath)
		await fs.writeFile(filePath, value, 'utf8')
	}
  
	public async getFileJson(guild: string, dataPath: string): Promise<any> {
		return JSON.parse(await this.getFile(guild, dataPath))
	}
	public async writeFileJson(guild: string, dataPath: string, value: any): Promise<void> {
		await this.writeFile(guild, dataPath, JSON.stringify(value))
	}
  
	public async removeFile(guild: string, dataPath: string): Promise<void> {
		const filePath = path.join(this.serviceDataLocation, `guild-${guild}`, dataPath)
		await fs.unlink(filePath)
	}

}

