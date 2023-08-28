const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pocisk_na_kidosa')
		.setDescription('Łatwy sposób na zrobienie shutdown /s /t 0 mordy skidowi.'),
	async execute(interaction) {
		fetch("https://grumble.jelnislaw.workers.dev/").then(
			async (response) => {
				const json = await response.json()
				await interaction.reply(json.grumble)
			}
		);
	},
}