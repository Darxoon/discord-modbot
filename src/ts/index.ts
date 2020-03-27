import discordjs, { Client } from 'discord.js'
import colors from 'colors'
import { Bot } from './core/bot'
import { CommandManager } from './core/commands/commandManager'
import { Command } from './core/commands/command'
import { CommandLoader } from './core/commands/commandLoader'

require('colors')

export const config: any = require('../config.json')
export const secret: any = require('../secret.json')

console.log(`=== ModBot v${config.version} ===`.green)

CommandLoader.loadFromDirectory('./src/data/modules/commands/')

const client: Client = new Client;

Bot.start(client)

client.login(secret.token)

