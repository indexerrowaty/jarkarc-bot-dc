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
	hfToken: "", // HuggingFace User Access Token.
	AIprompt: '', // AI prompt
	AImodel: "mistralai/Mixtral-8x7B-Instruct-v0.1", // Choose an AI model for use with the bot. Default: "mistralai/Mixtral-8x7B-Instruct-v0.1"

	// Folder locations
	commandsDir: "commands", // Directory containing commands. Default: "commands".
	eventsDir: "events", // Directory containing events. Default: "events".
	voiceNotesDir: "config/voicenotes", // Path to a folder containing voice notes. Voice notes should be in .ogg format and named sequentially (1.ogg, 2.ogg, 3.ogg etc.). Default: "config/voicenotes".

	// Random message when called
	kopieInformatyka: require("./kopieInformatyka.json"), // Path to message list
	botnameregexp: /jaros[lł]aw karcewicz|jarkarc/gi, // Regexp for detecting when people are talking about the bot.
	gnuLinuxCopypasta: `Kiedy piszesz "Linux", to masz najprawdopodobniej na myśli system operacyjny GNU. Zatem należy pisać GNU/Linux lub GNU+Linux.`, // Message to send when user types Linux instead of GNU/Linux.
		
	// E-mail "procedure"
	newslettery: require("./newslettery.json"), // Path to newsletter list
	emailBlacklist: [], // E-mail(s) to block from executing the procedure on.
	emailRegexp: /^(?!\.)[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+/, // E-mail verification regexp.
	procedureRatelimit: 60000, // Length of rate limit for the procedure. Default: 60000ms.
	
	// Strings
	genericError: "## To nie jest mój najlepszy dzień.\nNastępnym razem skopiuję!" // Generic error message.
}