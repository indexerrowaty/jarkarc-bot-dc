const kopieInformatyka = require('../assets/kopieInformatyka.js')
const { botnameregexp } = require("../config/config.js")

module.exports = {
	name: "messageCreate",
	execute(message) {
		if (message.author.bot) return;
		if (message.content.match(botnameregexp) || message.mentions.has(bot.user.id)) {
			message.reply(kopieInformatyka[Math.floor(Math.random() * kopieInformatyka.length)])
		}
	},
};
