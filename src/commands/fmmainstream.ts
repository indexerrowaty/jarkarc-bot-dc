import {
	type ChatInputCommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from "discord.js";
import { LastFMArtist, LastFMUser } from "lastfm-ts-api";
import type { JarkarcClient } from "../client/JarkarcClient";
import { env } from "../client/env";
const getMainstreamLabel = (score) => {
	let rating = "";
	switch (true) {
		case Number.isNaN(score):
			rating = "Ten informatyk boi się słuchać muzyki. Słabiak.";
			break;
		case score < 0.05:
			rating = "Anonymous hax0r\n(Off the charts!)";
			break;
		case score < 1:
			rating =
				"[Lapsus haxxor](https://doxbin.org/upload/white)\n(Extremely Obscure)";
			break;
		case score < 5:
			rating = "Prawdziwy informatyk\n(Subterranean)";
			break;
		case score < 10:
			rating = "Niemal prawdziwy informatyk\n(Underground)";
			break;
		case score < 20:
			rating = "Kopiujący infromatyk\n(Adventurous)";
			break;
		case score < 30:
			rating = "Informatyk\n(Cool)";
			break;
		case score < 50:
			rating =
				"macOS luser (dalej debilny informatyk, ale mniej)\n(Borderline!)";
			break;
		case score < 60:
			rating = "Windows luser (debilny informatyk)\n(Mainstream tendencies)";
			break;
		case score < 80:
			rating = "Normik\n(Definitely mainstream)";
			break;
		default:
			rating = "Głupi normik, debil\n(Shamelessly mainstream!)";
	}

	return rating;
};

// const req = async (method, params, apikey) => {
// 	const response = await fetch(
// 		`http://ws.audioscrobbler.com/2.0/?method=${method}${params}&api_key=${apikey}&format=json`,
// 	);
// 	return response.json();
// };
export async function run(
	_client: JarkarcClient,
	interaction: ChatInputCommandInteraction,
) {
	const userArg = encodeURI(interaction.options.getString("kto"));
	// const userInfo = (
	// 	await req("user.getInfo", `&user=${userArg}`, lastfmtoken)
	// ).user;
	const user = new LastFMUser(env.LAST_FM_TOKEN);
	const { user: userInfo } = await user.getInfo({
		user: userArg,
	});
	if (!userInfo)
		return interaction.reply({
			content:
				"Słaby z Ciebie informatyk. Podaj właściwą nazwę użytkownika. W informatyce nie ma miejsca na pomyłkę, debilu!",
			ephemeral: true,
		});
	await interaction.deferReply();

	const pierodArg = interaction.options.getString("czas");
	const period = pierodArg ? pierodArg : "overall";
	// const topArtists = await req(
	// 	"user.getTopArtists",
	// 	`&user=${userArg}&period=${period}&limit=20`,
	// 	lastfmtoken,
	// );
	const topArtists = await user.getTopArtists({
		user: userArg,
		// @ts-expect-error
		period: period,
		limit: 20,
	});

	if (topArtists.topartists.artist.length === 0)
		return interaction.editReply(
			"Ten informatyk (albo głupi normik używający macOS albo Windowsa) nic nie słuchał przez określony przez Ciebie czas.",
		);
	const artist = new LastFMArtist(env.LAST_FM_TOKEN);
	const { artist: topArtistChart } = await artist.getInfo({
		artist: "Coldplay",
	});

	const artistsData: Record<string, any> = {};
	for await (const artistData of topArtists.topartists.artist) {
		artistsData[artistData.name] = await artist.getInfo({
			artist: artistData.name,
		});
	}

	// const totalPlays = sum(topArtists.topartists.artist, "playcount");
	const totalPlays = topArtists.topartists.artist.reduce((a, b) => {
		return a + Number.parseInt(b.playcount);
	}, 0);
	let totalScore = 0;
	let totalCount = 0;

	for (const artist of topArtists.topartists.artist) {
		artistsData[artist.name].weight =
			Number.parseInt(artist.playcount) / totalPlays;
		artistsData[artist.name].mainstream =
			(artistsData[artist.name].artist.stats.listeners * 100) /
			Number.parseInt(topArtistChart.stats.listeners);

		totalScore +=
			artistsData[artist.name].mainstream * artistsData[artist.name].weight;
		totalCount += artistsData[artist.name].weight;
	}

	const mainstream = Math.round((totalScore * 10) / totalCount) / 10;
	const mostMainstream = Object.values(artistsData).reduce((a, b) =>
		a.mainstream > b.mainstream ? a : b,
	);

	const resultMessage = new EmbedBuilder()
		.setColor("#d51007")
		.setTitle("Raport z przetrzepania gustu muzycznego")
		.setDescription(
			`**Mainstreamowość: ${mainstream}%**\n${getMainstreamLabel(mainstream)}`,
		)
		.addFields({
			name: "Najbardziej mainstreamowy wykonawca",
			value: `**${mostMainstream.artist.name}** (${Math.round(mostMainstream.mainstream)}%)`,
			inline: true,
		})
		.setAuthor({
			name: userInfo.name,
			iconURL: userInfo.image[0]["#text"],
			url: userInfo.url,
		})
		.setTimestamp();

	await interaction.editReply({ embeds: [resultMessage] });
}

export const data = new SlashCommandBuilder()
	.setName("fmmainstream")
	.setDescription("Pozwala sprawdzić jak kopiowanej muzyki ktoś słucha.")
	.addStringOption((option) =>
		option
			.setName("kto")
			.setDescription("No to kogo przetrzepujemy?")
			.setRequired(true),
	)
	.addStringOption((option) =>
		option
			.setName("czas")
			.setDescription(
				"Z jakiego przedziału czasowego chcemy tego informatyka sprawdzić?",
			)
			.setRequired(false)
			.addChoices(
				{ name: "Ostatni rok", value: "12month" },
				{ name: "Ostatnie 6 miesięcy", value: "6month" },
				{ name: "Ostatnie 3 miesiące", value: "3month" },
				{ name: "Ostatni miesiąc", value: "1month" },
				{ name: "Ostatni tydzień", value: "7day" },
				{ name: "Bez przedziału czasowego", value: "overall" },
			),
	);
