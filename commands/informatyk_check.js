const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('informatyk_check')
		.setDescription('Pozwala sprawdzić kto w ilu procentach jest informatykiem.')
		.addUserOption(option =>
			option
				.setName('osoba')
				.setDescription('"Informatyk" do sprawdzenia')
				.setRequired(true)),
	async execute(interaction) {
		const osoba = interaction.options.getUser('osoba');
		const it = Math.floor(Math.random() * 100)
		await interaction.reply(`**${osoba.username}** jest informatykiem w \`${it}%\``)
	},
}