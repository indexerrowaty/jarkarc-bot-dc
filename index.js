const fs = require('node:fs')
const path = require('node:path')
const { Client, Collection, Events, GatewayIntentBits, Partials, ActivityType } = require('discord.js')
const config = require("./config/config.js")
const kopieInformatyka = require('./assets/kopieInformatyka.js')
const bot = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
	partials: [Partials.User, Partials.Message, Partials.Channel]
})

bot.once(Events.ClientReady, c => {
	c.user.setActivity('jak słabe skidy haxują', { type: ActivityType.Watching});
	console.log(`Dzień dobry! Zalogowano jako: ${c.user.tag}`);
});

bot.on("messageCreate", message => {
	if (message.author.bot) return;
	if (message.content.match(config.botnameregexp) || message.mentions.has(bot.user.id)) {
		message.reply(kopieInformatyka[Math.floor(Math.random() * kopieInformatyka.length)])
	}
});

bot.commands = new Collection();

const commandsPath = path.join(__dirname, config.commandsDir);
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		bot.commands.set(command.data.name, command);
	} else {
		console.log(`Komenda ${filePath} nie posiada właściwości "data" i/lub "execute".`);
	}
}


bot.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`Komenda ${interaction.commandName} nie istnieje.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'Coś się jebło proszę Państwa.', ephemeral: true });
		} else {
			await interaction.reply({ content: 'Coś się jebło proszę Państwa.', ephemeral: true });
		}
	}
});


bot.login(config.token)