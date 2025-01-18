const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pocisk_na_kidosa')
		.setDescription('Łatwy sposób na zrobienie shutdown /s /t 0 mordy skidowi.'),
	async execute(interaction) {
		const pocisk = await fetch("https://grumble.jelnislaw.workers.dev/")
		interaction.reply((await pocisk.json()).grumble)
	},
}