import type { Interaction } from "discord.js";
import type { JarkarcClient } from "../client/JarkarcClient";

export async function interactionCreate(
	client: JarkarcClient,
	interaction: Interaction,
) {
	if (!interaction.isCommand()) return;
	const { commandName } = interaction;
	const command = client.commands.get(commandName);
	if (!command) return;
	try {
		await command.run(client, interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: "Coś się jebło proszę Państwa.",
			ephemeral: true,
		});
	}
}
