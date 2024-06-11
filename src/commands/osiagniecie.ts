import {
	AttachmentBuilder,
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
} from "discord.js";
import type { JarkarcClient } from "../client/JarkarcClient";

export async function run(
	_client: JarkarcClient,
	interaction: ChatInputCommandInteraction,
) {
	const prepared = interaction.options.getString("treść");
	const ikonka = Math.floor(Math.random() * 40);
	const zdj = new AttachmentBuilder(
		`https://minecraftskinstealer.com/achievement/${ikonka}/Achievement%20unlocked/${encodeURI(prepared)}`,
		{ name: "osiagniecie.png" },
	);
	await interaction.reply({ files: [zdj] });
}

export const data = new SlashCommandBuilder()
	.setName("osiagniecie")
	.setDescription(
		"Brakuje hajsu na Minecrafta? Wygeneruj se osiągnięcie na pocieszenie!",
	)
	.addStringOption((option) =>
		option
			.setName("treść")
			.setDescription("Jak ma się nazywać osiągnięcie?")
			.setRequired(true),
	);
