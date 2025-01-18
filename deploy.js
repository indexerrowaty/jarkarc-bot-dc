const { REST, Routes } = require('discord.js');
const { appID, testingServerID, token, commandsDir } = require("./config/config.js")
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const folderPath = path.join(__dirname, commandsDir);

const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(folderPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
	} else {
		console.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const rest = new REST().setToken(token);

(async () => {
	console.log(`Started modifying commands…`);

	let data = await rest.put(
		process.argv[2]?.includes("p") ?
			Routes.applicationCommands(appID) : 
			Routes.applicationGuildCommands(appID, testingServerID), { body: process.argv[2]?.includes("r") ? [] : commands }
	).catch(console.error);

	const statusMsg = process.argv[2]?.includes("r") ?
		`Successfully deleted all ${process.argv[2]?.includes("p") ? "" : "guild "}commands.` : 
		`Successfully reloaded ${data.length} ${process.argv[2]?.includes("p") ? "application" : "guild"} commands.`
	
	console.log(statusMsg)
})();