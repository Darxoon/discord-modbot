import { Service } from "./service";
import { ServiceApi } from "./serviceApi";

export namespace ServiceManager {

	const services: Map<string, Service[]> = new Map

	export function addGuild(guild: string) {
		if(!services.has(guild))
			services.set(guild, [])
	}


	export function registerService(guild: string, service: Service) {
		services.get(guild).push(service)
		console.log(`Registered service`.blue, service.name.yellow)
	}

	export function registerServices(guild: string, ...servicesToPush: Service[]) {
		servicesToPush.forEach(service => registerService(guild, service))
	}


	export function getService(id: string): Service {
		return services.get(name).filter(service => service.id === id)[0] ?? null
	}

	export function hasService(id: string) {
		return getService(id) !== null
	}

	// TODO replace any with event type
	export function emit(guild: string, eventName: string, event: any) {
		services.get(guild).forEach(service => {
			if(service.events[eventName]) {
				try {
					service.events[eventName](event, new ServiceApi(service))
				} catch (e) {
					console.error(`Error while executing event '${eventName}' on service '${service.name}':`.red)
					console.error(e)
				}
			}
		})
	}

}