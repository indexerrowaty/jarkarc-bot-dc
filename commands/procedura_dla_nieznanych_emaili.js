const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { emailBlacklist, procedureRatelimit, emailRegexp, newslettery, genericError } = require("../config/config.js")

var ratelimited, liczbaNewsletterow = 0

for (const e in newslettery) {
	liczbaNewsletterow += newslettery[e].length
}

const warningMessage = new EmbedBuilder()
	.setColor("#FF0000")
	.setTitle("⚠️ *UWAGA!* ⚠️")
	.setDescription(`Ponieważ nie umiesz, gamoniu podać imienia odbiorcy, zostanie użyta Twoja nazwa użytkownika z Discorda.\nMiarka się przebrała, mam już dosyć ludzkich błędów! Słabi jesteście informatycy i tyle w temacie!`)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('procedura_dla_nieznanych_emaili')
		.setDescription('Zapisuje podany przez Ciebie e-mail na kilkanaście newsletterów.')
		.addStringOption(option =>
			option
				.setName('email')
				.setDescription('Jaki adres e-mail posiada Twój procedurant?')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('imie')
				.setDescription('Jak Twój procedurant ma na imię? UWAGA: Jeżeli zostawisz puste, to użyję Twojego nicku!')),
	async execute(interaction) {

		const usrname = interaction.options.getString("imie") || interaction.user.username || "zjebalosie";
		let email = interaction.options.getString("email");
	
		if (emailBlacklist.includes(email.replaceAll(".", "").toLowerCase().replaceAll("@googlemailcom", "@gmailcom")))
			return interaction.reply({ content: genericError, ephemeral: true });
	
		if (!emailRegexp.test(email))
			return interaction.reply({ content: "## Procedura wykonana niepoprawnie!\nNiepoprawny adres e-mail. Słaby informatyk.", ephemeral: true })

		if (ratelimited > Date.now())
			return interaction.reply({ content: `## Poczekaj chwilę!\nKomenda będzie dostępna za **${Math.ceil((ratelimited - Date.now())/1000)} sekund**.`, ephemeral: true })
		
		ratelimited = Date.now() + procedureRatelimit;

		email = encodeURI(email);
	
		await interaction.deferReply();

		if(!usrname) interaction.editReply({embeds: [warningMessage]})

		let sukcesy = 0
	
		for (const e in newslettery.mailerlite) {
			await fetch(`https://app.mailerlite.com/webforms/submit/${newslettery.mailerlite[e][1]}?fields%5Bname%5D=${usrname}&fields%5Bemail%5D=${email}&ml-submit=1&ajax=1`)
				.then(res => res.json())
				.then(result => {
					if (result.success) sukcesy++
				})
				.catch(error => {
					console.error(`PROCEDURA_ERROR [Newsletter ID: ${e} (${newslettery.mailerlite[e][0]})]:`, error)
				})
			interaction.editReply(`
				## Wykonuję procedurę…\n
				Teraz e-maila próbuje przyjąć: **${newslettery.mailerlite[e][0]}**\n
				Póki co **${sukcesy}** z **${liczbaNewsletterow}** serwisów skopiowało adres.
			`)
		}
		
		const resultMessage = new EmbedBuilder()
			.setColor(sukcesy === liczbaNewsletterow ? "#2ecc71" : "#e67e22")
			.setTitle("Raport końcowy wykonanej procedury")
			.setDescription(`**${sukcesy} na ${liczbaNewsletterow}** serwisów pomyślnie skopiowało adres e-mail!`)
			.setAuthor({ name: "Gotowe!", iconURL: "https://cdn.discordapp.com/attachments/693604907680530442/1145910449095848078/check-mark-icon-png-7.png" })
			.setTimestamp();

		await interaction.editReply({embeds: [resultMessage]})
	},
}