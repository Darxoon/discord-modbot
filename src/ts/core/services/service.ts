import { HelpItem } from "../helpItem";
import { ServiceApi } from "./serviceApi";

export interface Service extends HelpItem {
	id: string

	getTrustedServices(): string[]

	getData<T>(path: string, api: ServiceApi): T
	setData<T>(path: string, value: T, api: ServiceApi): void 
	
	// TODO replace any with types
	events: {[eventName: string]: (event: any, api: ServiceApi)  => void}
}

export function Service(id: string, helpItem: HelpItem, trustedServices: string[], events: {[eventName: string]: (event: any, api: ServiceApi) => void}): Service {
	return {
		id, 
		...helpItem,
		getTrustedServices() {
			return trustedServices
		},
		getData<T>(path: string, api: ServiceApi) {
			return null;
		},
		setData<T>(path: string, value: T, api: ServiceApi) {

		},
		events
	}
}