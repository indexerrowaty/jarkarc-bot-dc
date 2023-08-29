const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { emailBlacklist, procedureRatelimit, emailRegexp, newslettery } = require("../config/config.js")

var ratelimited = false
var liczbaNewsletterow = 0

for (const e in newslettery) {
	liczbaNewsletterow += newslettery[e].length
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('procedura_dla_nieznanych_emaili')
		.setDescription('Zapisuje podany przez Ciebie e-mail na kilkanaście newsletterów.')
		.addStringOption(option =>
			option
				.setName('email')
				.setDescription('Adres e-mail proceduranta.')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('imie')
				.setDescription('Jak Twój procedurant ma na imię?')
				.setRequired(true)),
	async execute(interaction) {
		let invalidMail = false

		let usrname = interaction.options.getString("imie");
		let email = interaction.options.getString("email");
	
		emailBlacklist.forEach(e => {
			if(e === email.replaceAll(".", "").toLowerCase().replaceAll("@googlemailcom", "@gmailcom")) {
				interaction.reply({ content: "Niestety rozum i godność informatyka zabrania mi wykonać procedurę na podanym przez Ciebie e-mailu.\nPrzykro mi, ale procedurę musisz skopiować ręcznie.", ephemeral: true })
				invalidMail = true
			}
		})
		if(invalidMail === true) return;
	
		const validEmail = emailRegexp
		if(validEmail.test(email) !== true)
			return interaction.reply({ content: "Procedura wykonana niepoprawnie! Niepoprawny adres e-mail. Słaby informatyk.", ephemeral: true })
		
		email = encodeURI(email);
	
		if (ratelimited === true) return interaction.reply({ content: `Poczekaj chwilę. Ktoś użył tej komendy w ciągu ostatnich **${Math.floor(procedureRatelimit / 100)} sekund**.`, ephemeral: true })
	
		ratelimited = true;
		setTimeout(function() {
			ratelimited = false;
		}, procedureRatelimit)
	
		await interaction.deferReply();

		let sukcesy = 0
	
		for (const e in newslettery.mailerlite) {
			await fetch(`https://app.mailerlite.com/webforms/submit/${newslettery.mailerlite[e][1]}?fields%5Bname%5D=${usrname}&fields%5Bemail%5D=${email}&ml-submit=1&ajax=1`)
				.then(res => res.text())
				.then(result => {
					if (JSON.parse(result).success === false)
						return interaction.editReply(newslettery.mailerlite[e][2])
					interaction.editReply(`${newslettery.mailerlite[e][3]}`)
					sukcesy++
				})
				.catch(error => {
					console.log('error', error)
					interaction.editReply(newslettery.mailerlite[e][2])
				})
		}
		
		const resultMessage = new EmbedBuilder()
			.setColor("#e67e22")
			.setTitle("Raport końcowy wykonanej procedury")
			.setDescription(`**${sukcesy} na ${liczbaNewsletterow}** serwisów pomyślnie skopiowało adres e-mail!`)
			.setAuthor({ name: "Gotowe!", iconURL: "https://cdn.discordapp.com/attachments/693604907680530442/1145910449095848078/check-mark-icon-png-7.png" })
			.setTimestamp();

		await interaction.editReply({content: "", embeds: [resultMessage]})
	},
}