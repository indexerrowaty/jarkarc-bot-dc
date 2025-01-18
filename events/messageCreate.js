const { botnameregexp, kopieInformatyka, appID, gnuLinuxCopypasta } = require("../config/config.js")
const gnulinuxRegexp = /(?<!gnu[\/\+ ])\blinux\b/gi

module.exports = {
	name: "messageCreate",
	async execute(message) {
		if (message.author.bot) return;
		if (gnulinuxRegexp.test(message.content)) message.reply(gnuLinuxCopypasta)
		if (message.content.match(botnameregexp) || message.mentions.has(appID, {ignoreEveryone: true, ignoreRoles: true}))
			message.reply(kopieInformatyka[Math.floor(Math.random() * kopieInformatyka.length)])
	},
};
