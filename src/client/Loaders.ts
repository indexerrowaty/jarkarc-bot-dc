import { readdir } from "node:fs/promises";
import type { JarkarcClient } from "./JarkarcClient";
export async function loadCommands(client: JarkarcClient, path: URL) {
	console.log("Commands");
	const commandFiles = await readdir(path);
	for (const file of commandFiles) {
		const command = await import(`${path.toString()}/${file}`);
		if ("data" in command && "run" in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(
				`Command ${file} does not have "data" and/or "execute" properties.`,
			);
		}
	}
}

export async function loadEvents(client: JarkarcClient, path: URL) {
	const eventFiles = await readdir(path);
	for (const file of eventFiles) {
		const [eventName] = file.split(".");
		const event = await import(`${path.toString()}/${file}`);
		client.on(eventName, (...args) => event[eventName](client, ...args));
	}
}
