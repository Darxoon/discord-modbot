import { Message } from "discord.js";
import { HelpItem } from "../helpItem";


export interface Command extends HelpItem {
	
	keyword: string
	
	syntax: string

	call: (args: string[], message: Message) => void

}
/**
 * Creates a new command
 * @param keyword The keyword to identify the command
 * @param helpItem The help item
 * @param call What should happen when
 */
export function Command(keyword: string, syntax: string, helpItem: HelpItem, call: (args: string[], message: Message) => void) {
	return {
		keyword,
		syntax,
		...helpItem,
		call
	}
}