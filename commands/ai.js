const { SlashCommandBuilder } = require('discord.js')
const { hfToken, AIprompt, AImodel } = require("../config/config.js")
const { HfInference } = require("@huggingface/inference")
const inference = new HfInference(hfToken)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ai')
		.setDescription('OMG AI!!! INWESTORZY, DAWAĆ HAJS! Możesz za pomocą tej komendy pogadać z AI.')
        .addStringOption(option =>
			option
				.setName('zapytanie')
				.setDescription('O co chcesz zapytać SMART AI TECHNOLOGY jArkarc Intelligence®?')
				.setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply()
		const out = await inference.chatCompletion({
            model: AImodel,
            messages: [
                {role: "system", content: AIprompt.replaceAll("${AIusrname}", interaction.user.displayName)},
                {role: "user", content: interaction.options.getString("zapytanie")}
            ],
            max_tokens: 600,
        })
        interaction.editReply(out.choices[0].message.content)
	},
}