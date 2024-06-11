import {
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
} from "discord.js";
import type { JarkarcClient } from "../client/JarkarcClient";

export async function run(
	_client: JarkarcClient,
	interaction: ChatInputCommandInteraction,
) {
	await interaction.reply(
		"When you say Linux, you probably mean the GNU operating system, running Linux as the kernel. You should therefore say GNU/Linux or GNU+Linux.",
	);
}
export const data = new SlashCommandBuilder()
	.setName("linux")
	.setDescription(
		"Naucz niedokopiowanych kretynów co mają tak na prawdę na myśli.",
	);
