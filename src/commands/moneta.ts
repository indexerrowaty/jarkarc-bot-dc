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
		`**${Math.floor(Math.random() * 2) === 0 ? "Orzeł" : "Reszka"}!**`,
	);
}
export const data = new SlashCommandBuilder()
	.setName("moneta")
	.setDescription(
		"Nie wiadomo kto pierwszy ma kopiować? Roztrzygnij ten dylemat tą komendą.",
	);
