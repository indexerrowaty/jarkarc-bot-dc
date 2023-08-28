// To get started simply rename this file to config.js and edit it as you want.

module.exports = {
	"token": "", // Discord bot token.
	"appID": "", // Discord bot App ID
	"testingServerID": "", // Testing Discord Server
	"evalIDs": [69], // Which user(s) should have access to /eval command?
	"commandsDir": "./commands/", // Directory containing commands. Trailing slash is required. Default: "./commands/".
	"voicenotesDir": "./assets/voicenotes/", // Directory containing voice notes. Trailing slash is required. Default: "./assets/voicenotes/".
	"botnameregexp": /jaros[lł]aw karcewicz|jarkarc/gi, // Jarosław Karcewicz is a very sociable bot. He loves to respond when he sees his name in the chat. He needs a little help to know he's being called though. That's what this regrexp is for.
	"randomVoiceMemo": 420, // Chance of bot sending random voice notes. Default: 420:1.
	"emailBlacklist": [], // Which e-mail(s) to block from executing a procedure on?
	"emailRegexp": /^(?!\.)[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+/, // E-mail verification regexp.
	"procedureRatelimit": 10000, // For how long rate limit on e-mail procedure should be enforced? Default: 10000ms.
	"lastfmtoken": "" // last.fm token for fmmainstream command.
}