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
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const rest = new REST().setToken(token);

(async () => {
	if(process.argv[2] === "cleanup") {
		try {
			console.log("Cleaning up testing commands");
			rest.put(Routes.applicationGuildCommands(appID, testingServerID), { body: [] })
				.then(() => console.log('Successfully deleted all guild commands.'))
			.catch(console.error);
		} catch (error) {
			console.error(error);
		}
		return;
	}
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		let data = await rest.put(
			process.argv[2] ? Routes.applicationCommands(appID) : Routes.applicationGuildCommands(appID, testingServerID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();