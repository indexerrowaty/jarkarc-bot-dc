const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('koty_http')
		.setDescription('Wyświetla demoty z kotami symbolizującymi kod HTTP o podanym przez Ciebie numerze.')
		.addNumberOption(option =>
			option
				.setName('kod')
				.setDescription('No, informatyku. Masz teraz okazję wykazać się swoją wiedzą kodów HTTP. Nie zjeb tego!')
				.setRequired(true)
				.setMaxValue(511)
				.setMinValue(100)),
	async execute(interaction) {
		const prepared = interaction.options.getNumber("kod")
		const zdj = new AttachmentBuilder(
			`https://http.cat/${prepared}`,
			{ name: 'kot.png' }
		)
		await interaction.reply({ files: [zdj] })
	},
}