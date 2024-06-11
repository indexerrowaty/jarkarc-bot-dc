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
	const prepared = interaction.options.getNumber("kod");
	const zdj = new AttachmentBuilder(`https://http.cat/${prepared}`, {
		name: "kot.png",
	});
	await interaction.reply({ files: [zdj] });
}

export const data = new SlashCommandBuilder()
	.setName("koty_http")
	.setDescription(
		"Wyświetla demoty z kotami symbolizującymi kod HTTP o podanym przez Ciebie numerze.",
	)
	.addNumberOption((option) =>
		option
			.setName("kod")
			.setDescription(
				"No, informatyku. Masz teraz okazję wykazać się swoją wiedzą kodów HTTP. Nie zjeb tego!",
			)
			.setRequired(true)
			.setMaxValue(511)
			.setMinValue(100),
	);
