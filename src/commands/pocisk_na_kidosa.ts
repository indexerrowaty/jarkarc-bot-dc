import {
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
} from "discord.js";
import type { JarkarcClient } from "../client/JarkarcClient";

export async function run(
	_client: JarkarcClient,
	interaction: ChatInputCommandInteraction,
) {
	const response = await fetch("https://grumble.jelnislaw.workers.dev/"); // .then(
	const json = await response.json();
	await interaction.reply(json.grumble);
}

export const data = new SlashCommandBuilder()
	.setName("pocisk_na_kidosa")
	.setDescription("Łatwy sposób na zrobienie shutdown /s /t 0 mordy skidowi.");
