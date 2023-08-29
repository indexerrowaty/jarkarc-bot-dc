const { ActivityType } = require('discord.js');
// To get started simply rename this file to config.js and edit it as you want.

module.exports = {

	// Discord
	"token": "", // Discord bot token.
	"appID": "", // Discord bot App ID
	"testingServerID": "", // Testing Discord Server

	// Bot activity settings
	// Leave these empty if you don't want bot displaying Playing/Watching/Listening/Streaming status.
	"activityName": "Minecraft", // Activity name
	"activityType": ActivityType.Playing, // Activity type

	// last.fm
	"lastfmtoken": "", // last.fm token for fmmainstream command.

	// Folder locations
	"commandsDir": "commands", // Directory containing commands. Default: "commands".
	"eventsDir": "events", // Directory containing events. Default: "events".

	// Random message when called
	"kopieInformatyka": require("./kopieInformatyka.js"), // Path to message list
	"botnameregexp": /jaros[lł]aw karcewicz|jarkarc/gi, // Jarosław Karcewicz is a very sociable bot. He loves to respond when he sees his name in the chat. He needs a little help to know he's being called though. That's what this regrexp is for.
	
	// E-mail "procedure"
	"newslettery": require("./newslettery.js"), // Path to newsletter list
	"emailBlacklist": [], // Which e-mail(s) to block from executing a procedure on?
	"emailRegexp": /^(?!\.)[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+/, // E-mail verification regexp.
	"procedureRatelimit": 60000, // For how long rate limit on e-mail procedure should be enforced? Default: 60000ms.
	
}
