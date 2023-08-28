const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('linux')
		.setDescription('Naucz niedokopiowanych kretynów co mają tak na prawdę na myśli.'),
	async execute(interaction) {
		await interaction.reply('When you say Linux, you probably mean the GNU operating system, running Linux as the kernel. You should therefore say GNU/Linux or GNU+Linux.')
	},
}