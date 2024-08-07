const { ActivityType } = require('discord.js');
// To get started simply rename this file to config.js and edit it as you want.

module.exports = {

	// Discord
	token: "", // Discord bot token.
	appID: "", // Discord bot App ID
	testingServerID: "", // Testing Discord Server

	// Bot activity settings
	// Leave these empty if you don't want bot displaying Playing/Watching/Listening/Streaming status.
	activityName: "Minecraft", // Activity name
	activityType: ActivityType.Playing, // Activity type

	// last.fm
	lastfmtoken: "", // last.fm token for fmmainstream command.

	// HuggingFace and AI settings
	"hfToken": "", // HuggingFace User Access Token.
	"AIprompt": '', // AI prompt

	// Folder locations
	commandsDir: "commands", // Directory containing commands. Default: "commands".
	eventsDir: "events", // Directory containing events. Default: "events".

	// Random message when called
	kopieInformatyka: require("./kopieInformatyka.js"), // Path to message list
	botnameregexp: /jaros[lł]aw karcewicz|jarkarc/gi, // Regexp for detecting when people are talking about the bot.
	
	// E-mail "procedure"
	newslettery: require("./newslettery.js"), // Path to newsletter list
	emailBlacklist: [], // E-mail(s) to block from executing the procedure on.
	emailRegexp: /^(?!\.)[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+/, // E-mail verification regexp.
	procedureRatelimit: 60000, // Length of rate limit for the procedure. Default: 60000ms.
	
}
