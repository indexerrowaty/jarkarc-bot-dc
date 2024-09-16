const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eduskracacz')
		.setDescription('Pozwala zadrwić z firmy VULCAN, używając ich domeny eduvulcan.pl jako URL shortenera.')
    .addStringOption(option =>
			option
				.setName('url')
				.setDescription('Gdzie ma przekierowywać VULCAN?')
				.setRequired(true)
    ),
	execute(interaction) {
    const plainText = interaction.options.getString("url")
    let encodedText = encodeBase32(plainText);
    encodedText = encodedText.replace(/=+$/, '');
    interaction.reply(`https://eduvulcan.pl/dziennik/${encodedText}`)
	},
}
