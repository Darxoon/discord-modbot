import discordjs, { Client, User } from 'discord.js'
import colors from 'colors'
import { Bot } from './core/bot'
import { CommandManager } from './core/commands/commandManager'
import { Command } from './core/commands/command'
import { CommandLoader } from './core/commands/commandLoader'
import { ServiceManager } from './core/services/serviceManager'
import { Service } from './core/services/service'

require('colors')

export const config: any = require('../config.json')
export const secret: any = require('../secret.json')

export const gname = '420304364305907722'

console.log(`=== ModBot v${config.version} ===`.green)

// register commands
CommandLoader.loadFromDirectory('./src/data/modules/commands/')


// register services
ServiceManager.addGuild(gname)
ServiceManager.registerService(gname, Service('autorole', {name: 'AutoRole', description: 'Assigns a default role to every user'}, [], {
	userJoined(event, api) {
		console.log('autorole', event)
	}
}))
ServiceManager.registerService(gname, Service('tracklist', {name: 'Tracklist', description: 'Tracks a list of every user ever on this server'}, [], {
	userJoined(event, api) {
		console.log('tracklist', event)
	}
}))


ServiceManager.emit(gname, 'userJoined', {user: 'Darxoon'})

// start bot
const client: Client = new Client;

Bot.start(client)

client.login(secret.token)

