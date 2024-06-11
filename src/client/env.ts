import "dotenv/config";
import { createEnv } from "neon-env";

export const env = createEnv({
	DISCORD_TOKEN: {
		type: "string",
	},
	TESTING_GUILD_ID: {
		type: "string",
		optional: true,
	},
	NODE_ENV: {
		type: "string",
		choices: ["development", "production"],
		default: "development",
	},
	ACTIVITY_TYPE: {
		type: "number",
		default: 0,
	},
	ACTIVITY_NAME: {
		type: "string",
		optional: true,
	},
	LAST_FM_TOKEN: {
		type: "string",
		optional: true,
	},
	BOT_REGEXP: {
		parser(input) {
			return RegExp(input);
		},
		default: /jaros[lł]aw karcewicz|jarkarc/gi,
	},
	EMAIL_BLACKLIST: {
		type: "array",
		default: [],
	},
	EMAIL_PROCEDURE_RATELIMIT: {
		type: "number",
		default: 60000,
	},
});
