const kopieInformatyka = require('../assets/kopieInformatyka.js')
const { botnameregexp } = require("../config/config.js")

module.exports = {
	name: "messageCreate",
	execute(message, bot) {
		if (message.author.bot) return;
		if (message.content.match(botnameregexp) || message.mentions.has("1095653965221343232")) {
			message.reply(kopieInformatyka[Math.floor(Math.random() * kopieInformatyka.length)])
		}
	},
};
