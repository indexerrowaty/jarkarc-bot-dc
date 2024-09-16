const { SlashCommandBuilder } = require('discord.js')

// Code shamelessly copied from https://es.cvp.ovh/
const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=";

function encodeBase32(input) {
    let output = "";
    let buffer = 0;
    let bitsLeft = 0;

    for (let i = 0; i < input.length; i++) {
        buffer = (buffer << 8) | input.charCodeAt(i);
        bitsLeft += 8;

        while (bitsLeft >= 5) {
            output += base32Chars[(buffer >> (bitsLeft - 5)) & 31];
            bitsLeft -= 5;
        }
    }

    if (bitsLeft > 0) {
        output += base32Chars[(buffer << (5 - bitsLeft)) & 31];
    }

    while (output.length % 8 !== 0) {
        output += "=";
    }

    return output;
}

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
