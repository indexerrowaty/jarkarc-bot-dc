const { SlashCommandBuilder } = require('discord.js')
const { kopieInformatyka } = require("../config/config.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('madrosc')
		.setDescription('Prezentuje mądrości życiowe Mojej Magnificencji dr inż. Jarosława!'),
	async execute(interaction) {
		await interaction.reply(kopieInformatyka[Math.floor(Math.random() * kopieInformatyka.length)])
	},
}