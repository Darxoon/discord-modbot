import { Client } from 'discord.js'
import { Bot } from './core/bot'
import { CommandLoader } from './core/commands/commandLoader'
import { ServiceManager } from './core/services/serviceManager'
import { ServiceLoader } from './core/services/serviceLoader'

require('colors')

export const config: any = require('../config.json')
export const secret: any = require('../secret.json')

export const gname = '420304364305907722'

console.log(`=== ModBot v${config.version} ===`.green)

// register commands
CommandLoader.loadFromDirectory('./src/data/modules/commands/')


// register services
ServiceManager.addGuild(gname)
ServiceLoader.loadFromDirectory(gname, './src/data/modules/services/')


// ServiceManager.emit(gname, 'userJoined', {user: 'Darxoon'})


// start bot
const client: Client = new Client;

Bot.start(client)

client.login(secret.token)

