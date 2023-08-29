const { botnameregexp, kopieInformatyka, appID } = require("../config/config.js")

module.exports = {
	name: "messageCreate",
	execute(message) {
		if (message.author.bot) return;
		if (message.content.match(botnameregexp) || message.mentions.has(appID)) {
			message.reply(kopieInformatyka[Math.floor(Math.random() * kopieInformatyka.length)])
		}
	},
};
