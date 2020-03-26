import { Client } from "discord.js";
import { config } from "../index"

export namespace ModBot {

	export namespace Bot {

		export function start(client: Client) {

			client.on('ready', () => {
				console.log('Logged in as'.blue, client.user.tag.yellow);
			})

			client.on('message', messsage => {
				if(messsage.author != client.user && messsage.content.startsWith(config.prefix)) {
					const text = messsage.content.slice(config.prefix.length)
					console.log(text);
					messsage.reply('ne')
				}
			})

		}

	}
}
