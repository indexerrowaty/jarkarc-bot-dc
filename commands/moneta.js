const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moneta')
		.setDescription('Nie wiadomo kto pierwszy ma kopiować? Roztrzygnij ten dylemat za pomocą tej komendy!'),
	async execute(interaction) {
		await interaction.reply(`**${Math.floor(Math.random() * 2) == 0 ? "Orzeł" : "Reszka"}!**`)
	},
}