import {
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
} from "discord.js";
import type { JarkarcClient } from "../client/JarkarcClient";

export async function run(
	_client: JarkarcClient,
	interaction: ChatInputCommandInteraction,
) {
	const osoba = interaction.options.getUser("osoba");
	const it = Math.floor(Math.random() * 100);
	await interaction.reply(
		`**${osoba.username}** jest informatykiem w \`${it}%\``,
	);
}
export const data = new SlashCommandBuilder()
	.setName("informatyk_check")
	.setDescription("Pozwala sprawdzić kto w ilu procentach jest informatykiem.")
	.addUserOption((option) =>
		option
			.setName("osoba")
			.setDescription('"Informatyk" do sprawdzenia')
			.setRequired(true),
	);
