const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('osiagniecie')
		.setDescription('Nie umiesz spiracić Minecrafta? Wygeneruj sobie osiągnięcie na pocieszenie!')
		.addStringOption(option =>
			option
				.setName('treść')
				.setDescription('Jaka ma być treść osiągnięcia?')
				.setRequired(true))
		.addIntegerOption(option =>
			option
				.setName('ikona')
				.setDescription('Którą ikonę mam użyć? (1-39)')
				.setRequired(false)
				.setMaxValue(39)
				.setMinValue(1)),
	async execute(interaction) {
		await interaction.deferReply()
		const prepared = interaction.options.getString("treść")
    	const ikonka = interaction.options.getInteger("ikona") || Math.floor(Math.random() * 40)
		const zdj = new AttachmentBuilder(
			'https://minecraftskinstealer.com/achievement/'+ikonka+'/Achievement%20unlocked/'+encodeURI(prepared),
			{ name: 'osiagniecie.png' }
		)
		await interaction.editReply({ files: [zdj] })
	},
}