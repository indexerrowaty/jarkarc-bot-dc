const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js')
const http = require("node:http")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('koty_http')
		.setDescription('Wyświetla demoty z kotami symbolizującymi kod HTTP o podanym przez Ciebie numerze.')
		.addIntegerOption(option =>
			option
				.setName('kod')
				.setDescription('Masz teraz okazję popisać się swoją wiedzą kodów HTTP. Nie zepsuj tego!')
				.setRequired(false)
				.setMaxValue(511)
				.setMinValue(100)
		),
	async execute(interaction) {
		const httpCodes = Object.keys(http.STATUS_CODES)
		const prepared = interaction.options.getInteger("kod") || httpCodes[Math.floor(Math.random() * httpCodes.length)]
		if (!httpCodes.includes(String(prepared))) return interaction.reply({content: "## Gamoniu, nic nie umiesz >:(\nJeżeli nie umiesz kodów HTTP, to ich nie pisz ¯\\_(ツ)_/¯.\nPozdrawiam, JAKRARCCD!", ephemeral: true})
		await interaction.deferReply()
		const zdj = new AttachmentBuilder(
			`https://http.cat/${prepared}`,
			{ name: `${prepared}.png` }
		)
		await interaction.editReply({ files: [zdj] })
	},
}