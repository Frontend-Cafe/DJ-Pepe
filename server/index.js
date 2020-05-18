require('dotenv').config();
const Discord = require('discord.js');
const Client = require('./client/Client').default;
const { PREFIX, TOKEN } = process.env;

import { Middlewares, logMemUsg } from './utils';
import textCommands from './commands/text';

const client = new Client();
client.commands = new Discord.Collection();
// eslint-disable-next-line no-unused-vars
const queue = new Map();

const api = Middlewares(textCommands);

client.once('ready', () => {
	logMemUsg();
	console.log(textCommands);
	console.log('Ready!');
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(PREFIX)) return; // quien te conoce papa?
	message.content = message.content.substring(1);
	try {
		return api(message);
	} catch (error) {
		console.error(error);
		const numero = Math.floor(Math.random() * 100 + 1);
		if (numero == 45) {
			message.reply('Ese comando no existe, pero la puta madreee!!!');
		} else {
			message.reply('usa !help para tener una lista de comandos');
		}
	}
});

client.login(TOKEN);
