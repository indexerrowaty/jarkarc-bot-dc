import { Client, GatewayIntentBits } from "discord.js";
import { loadCommands, loadEvents } from "./Loaders";
import { env } from "./env";
export class JarkarcClient extends Client {
	commands: Map<string, any> = new Map();
	events: Map<string, any> = new Map();
	constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
			],
		});
		this.init();
	}
	async init() {
		await loadEvents(this, new URL("../events", import.meta.url));
		loadCommands(this, new URL("../commands", import.meta.url)).then(
			async () => {
				console.log("Test??");
				await this.login(env.DISCORD_TOKEN);
			},
		);
	}
}
