import discordjs, { Client } from 'discord.js'
import colors from 'colors'
import { ModBot } from './core/bot'

require('colors')

export const config: any = require('../config.json')
export const secret: any = require('../secret.json')

console.log(`=== ModBot v${config.version} ===`.green)

const client: Client = new Client;

ModBot.Bot.start(client)

client.login(secret.token)

