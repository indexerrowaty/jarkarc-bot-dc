const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('osiagniecie')
		.setDescription('Brakuje hajsu na Minecrafta? Wygeneruj se osiągnięcie na pocieszenie!')
		.addStringOption(option =>
			option
				.setName('treść')
				.setDescription('Jak ma się nazywać osiągnięcie?')
				.setRequired(true)),
	async execute(interaction) {
		const prepared = interaction.options.getString("treść")
    	const ikonka = Math.floor(Math.random() * 40)
		const zdj = new AttachmentBuilder(
			'https://minecraftskinstealer.com/achievement/'+ikonka+'/Achievement%20unlocked/'+encodeURI(prepared),
			{ name: 'osiagniecie.png' }
		)
		await interaction.reply({ files: [zdj] })
	},
}