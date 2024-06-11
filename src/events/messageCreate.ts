import type { Message } from "discord.js";
import type { JarkarcClient } from "../client/JarkarcClient";
import { env } from "../client/env";
import { kopieInformatyka } from "../config/kopieInformatyka";
export async function messageCreate(client: JarkarcClient, message: Message) {
	if (message.author.bot) return;
	if (
		message.content.match(env.BOT_REGEXP) ||
		message.mentions.has(client.application.id)
	) {
		message.reply(
			kopieInformatyka[Math.floor(Math.random() * kopieInformatyka.length)],
		);
	}
}
