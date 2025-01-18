const { Events } = require('discord.js')
const { genericError } = require('../config/config.js')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return

		const command = interaction.client.commands.get(interaction.commandName)
	
		if (!command)
			return console.error(`Komenda ${interaction.commandName} nie istnieje.`)
	
		try {
			await command.execute(interaction)
		} catch (error) {
			console.error(error)
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: genericError, ephemeral: true })
			} else {
				await interaction.reply({ content: genericError, ephemeral: true })
			}
		}
	},
};
