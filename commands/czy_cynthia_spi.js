const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('czy_cynthia_spi')
		.setDescription('Pozwala zweryfikować czy osoba o imieniu Cynthia jest aktualnie w stanie hibernacji.'),
	async execute(interaction) {
		await fetch(`https://cynthia.rest/state`)
			.then(res => res.json())
			.then(result => 
				interaction.reply(`Cynthia teraz **${result.sleeping ? "hibernuje" : "kopiuje"}**.`)
			)
			.catch(error => {
				console.log('error', error)
				interaction.reply("Nie wiem. Ale wiem, że serwery Cynthii hibernują.")
			})
	},
}