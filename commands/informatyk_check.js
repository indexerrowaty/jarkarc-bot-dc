const { SlashCommandBuilder } = require('discord.js')
const { appID } = require("../config/config.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('informatyk_check')
		.setDescription('Pozwala sprawdzić kto w ilu procentach jest informatykiem.')
		.addUserOption(option =>
			option
				.setName('osoba')
				.setDescription('"Informatyk" do sprawdzenia')
				.setRequired(false)),
	async execute(interaction) {
		const osoba = interaction.options.getUser('osoba');
		const it = osoba.id === appID ? 100 : Math.floor(Math.random() * 100)
		await interaction.reply(`**${!osoba ? "Jesteś**" : osoba.username + "** jest"} informatykiem w \`${it}%\``)
	},
}