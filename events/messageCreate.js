const { botnameregexp, kopieInformatyka, appID, hfToken, AIprompt, AImodel } = require("../config/config.js")
const { HfInference } = require("@huggingface/inference")
const inference = new HfInference(hfToken);

module.exports = {
	name: "messageCreate",
	async execute(message) {
		if (message.author.bot) return;
		if (message.content.match(botnameregexp) || message.mentions.has(appID)) {
			message.channel.sendTyping()
			const out = await inference.chatCompletion({
				model: AImodel,
				messages: [{ role: "user", content: `${AIprompt.replaceAll("${AIusrname}", message.author.displayName)} ${message.content}`}],
				max_tokens: 2000,
			}) 
			message.channel.send(out.choices[0].message.content || kopieInformatyka[Math.floor(Math.random() * kopieInformatyka.length)]);
		}
	},
};
