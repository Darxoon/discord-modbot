import { Service } from "./service"
import fs from "mz/fs"
import path from 'path'

const dataFolderPath = './src/data/serviceData'

export class ServiceApi {

	private serviceDataLocation: string
	private service: Service

	// TODO make async

	// guild management
	public createGuildData(guild: string): void {
		const guildPath = path.join(this.serviceDataLocation, `guild-${guild}`)
		if(!fs.existsSync(guildPath))
			fs.mkdirSync(guildPath)
	}
	public removeGuildData(guild: string): void {
		const guildPath = path.join(this.serviceDataLocation, `guild-${guild}`)
		if(fs.existsSync(guildPath))
			fs.rmdirSync(guildPath)
	}
 
	// user management
	public createUser(guild: string, user: string): void {}
	public removeUser(guild: string, user: string): void {}
  
	public getUserData(guild: string, user: string, dataPath: string): string { return "" }
	public setUserData(guild: string, user: string, dataPath: string, value: string): void {}
  
	public getUserDataJson(guild: string, user: string, dataPath: string): any {}
	public setUserDataJson(guild: string, user: string, dataPath: string, value: any): void {}
  
	public removeUserData(guild: string, user: string, dataPath: string): string { return "" }
  
	// file management
	// TODO check that path is inside guild folder
	// TODO error checking
	public getFile(guild: string, dataPath: string): string {
		const filePath = path.join(this.serviceDataLocation, `guild-${guild}`, dataPath)
		const data = fs.readFileSync(filePath, 'utf8')
		return data
	}
	public writeFile(guild: string, dataPath: string, value: string): void {
		const filePath = path.join(this.serviceDataLocation, `guild-${guild}`, dataPath)
		fs.truncateSync(filePath)
		fs.writeFileSync(filePath, value, 'utf8')
	}
  
	public getFileJson(guild: string, dataPath: string): any {
		return JSON.parse(this.getFile(guild, dataPath))
	}
	public writeFileJson(guild: string, dataPath: string, value: any): void {
		this.writeFile(guild, dataPath, JSON.stringify(value))
	}
  
	public removeFile(guild: string, dataPath: string): void {
		const filePath = path.join(this.serviceDataLocation, `guild-${guild}`, dataPath)
		fs.unlinkSync(filePath)
	}

	public constructor(service: Service) {
		this.service = service
		this.serviceDataLocation = path.join(dataFolderPath, service.id)
	}
}

