const { SlashCommandBuilder } = require('discord.js')
const { kopieInformatyka } = require("../config/config.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('madrosc')
		.setDescription('Prezentuje mądrości życiowe Mojej Magnificencji dr inż. Jarosława!')
		.addIntegerOption(option =>
			option
				.setName('id')
				.setDescription('Jeśli chcesz, możesz wybrać sobie mądrość po jej numerze ID.')
				.setRequired(false)
				.setMinValue(0)
		),
	async execute(interaction) {
		const wisdomID = Math.floor(interaction.options.getInteger("id")) || Math.floor(Math.random() * kopieInformatyka.length)

		if(wisdomID > kopieInformatyka.length - 1)
			return interaction.reply({content: "## Aż taki mądry jeszcze nie jestem.\nPodaj mniejszą liczbę.", ephemeral: true})

		await interaction.reply(kopieInformatyka[wisdomID])
	},
}