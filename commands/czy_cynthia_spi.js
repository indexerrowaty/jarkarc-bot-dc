const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('czy_cynthia_spi')
		.setDescription('Pozwala zweryfikować czy osoba o imieniu Cynthia jest aktualnie w trybie hibernacji.'),
	async execute(interaction) {
		await fetch(`https://cynthia.rest/state`)
			.then(res => res.text())
			.then(result => {
        		let sleeping = JSON.parse(result).sleeping
				if (sleeping === false)
					return interaction.reply("Cynthia jest w stanie kopiującym. Nie śpi.")
				interaction.reply("Cynthia nie kopiuje. Śpi.")
			})
			.catch(error => {
				console.log('error', error)
				interaction.reply("Nie wiem. Ale wiem, że serwery Cynthii śpią.")
			})
	},
}