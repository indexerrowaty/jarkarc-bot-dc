const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js')
const { readdir } = require("node:fs/promises")
const { readFileSync } = require("node:fs")
const { voiceNotesDir } = require("../config/config.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rozmowa')
		.setDescription('Jestem taki mądry, że gadam! Śmiało! Wysłuchaj co mam Ci do powiedzenia!')
        .addIntegerOption(option =>
			option
				.setName('id')
				.setDescription('Jeśli chcesz, możesz wybrać sobie głosówkę po jej numerze ID.')
				.setRequired(false)
				.setMinValue(1)),
	execute(interaction) {
        readdir(voiceNotesDir).then(async files => {
            const voiceNoteID = Math.floor(interaction.options.getInteger("id")) || Math.floor(Math.random() * files.length) + 1
            if(voiceNoteID > files.length + 1) return interaction.reply({content: "## Informatyka tak daleko nie dotarła.\nPodaj mniejszą liczbę.", ephemeral: true})
            const voiceNote = readFileSync(`${voiceNotesDir}/${voiceNoteID}.ogg`)

            const attachment = new AttachmentBuilder(
                voiceNote, {name: "informatyk.ogg"}
            )

            await interaction.reply({ files: [attachment], flags: 8192 })
        })  
	},
}