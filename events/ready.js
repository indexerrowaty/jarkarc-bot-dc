const { Events } = require('discord.js');
const { activityName, activityType } = require('../config/config.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		if (activityName && activityType) client.user.setActivity(activityName, { type: activityType });
		console.log(`Dzień dobry! Zalogowano jako: ${client.user.tag}`);
	},
};
