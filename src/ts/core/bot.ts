import { Client, Message, PartialMessage } from "discord.js";
import { config } from "../index"
import { CommandManager } from "./commands/commandManager";


export namespace Bot {

	export function start(client: Client) {

		client.on('ready', () => {
			console.log('\nLogged in as'.blue, client.user.tag.yellow);
		})

		client.on('message', (message: Message) => {
			
			if(message.author != client.user && message.content.startsWith(config.prefix)) {
				const text = message.content.slice(config.prefix.length)
				const args = text.split(' ')

				console.log(text);
				
				CommandManager.call(args, message)
				
			}
		})

	}

}