import {
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
} from "discord.js";
import type { JarkarcClient } from "../client/JarkarcClient";

export async function run(
	_client: JarkarcClient,
	interaction: ChatInputCommandInteraction,
) {
	fetch("https://cynthia.rest/state")
		.then((res) => res.json())
		.then((result) => {
			if (result.sleeping === false)
				return interaction.reply("Cynthia jest w stanie kopiującym. Nie śpi.");
			interaction.reply("Cynthia nie kopiuje. Śpi.");
		})
		.catch((error) => {
			console.log("error", error);
			interaction.reply("Nie wiem. Ale wiem, że serwery Cynthii śpią.");
		});
}
export const data = new SlashCommandBuilder()
	.setName("czy_cynthia_spi")
	.setDescription(
		"Pozwala zweryfikować czy osoba o imieniu Cynthia jest aktualnie w trybie hibernacji.",
	);
