const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eduskracacz')
		.setDescription('Pozwalało zadrwić z firmy VULCAN, używając ich domeny eduvulcan.pl jako URL shortenera.'),
	execute(interaction) {
    		interaction.reply(`Drodzy użytkownicy,\nzapewne wielu z Was już od początku istnienia tej komendy domyśliło się, jak skończy się ta historia.\nFirma VULCAN zablokowała możliwość przekierowania wszystkiego przez swój URL, a to oznacza, że użyta przez Ciebie komenda już nie zadziała :(\nKomenda zostanie usunięta wkrótce.`, {ephemeral: true})
	},
}
