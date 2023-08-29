const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setActivity('jak słabe skidy haxują', { type: ActivityType.Watching});
		console.log(`Dzień dobry! Zalogowano jako: ${client.user.tag}`);
	},
};
