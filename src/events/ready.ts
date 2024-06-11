import type { JarkarcClient } from "../client/JarkarcClient";
import { env } from "../client/env";

export async function ready(client: JarkarcClient) {
	console.log("Commands loaded.");
	const commandsData = [];
	for (const [, value] of client.commands) {
		console.log(value);
		commandsData.push(value.data.toJSON());
	}
	if (env.NODE_ENV === "development") {
		this.guilds.cache.get(env.TESTING_GUILD_ID)?.commands.set(commandsData);
	} else {
		console.log(await client.application?.commands.set(commandsData));
	}

	if (env.ACTIVITY_NAME && env.ACTIVITY_TYPE)
		client.user.setActivity(env.ACTIVITY_NAME, { type: env.ACTIVITY_TYPE });
	console.log(`Dzień dobry! Zalogowano jako: ${client.user.tag}`);
}
