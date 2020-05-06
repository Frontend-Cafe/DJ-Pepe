require('dotenv').config();
const Discord = require('discord.js');
const Client = require('./client/Client').default;
const { PREFIX, TOKEN } = process.env;

import { Middlewares, logMemUsg } from './utils';
import { ServerInfo } from './commands/text/server';
import { NewPlay } from './commands/text/music/newplay';
import { NowPlaying } from './commands/text/music/nowplaying';

const client = new Client();
client.commands = new Discord.Collection();

const superComandos = [];
// eslint-disable-next-line no-unused-vars
const queue = new Map();

superComandos.push(ServerInfo());
superComandos.push(NewPlay());
superComandos.push(NowPlaying());
const api = Middlewares(superComandos);

client.once('ready', () => {
	logMemUsg();
	console.log(superComandos);
	console.log('Ready!');
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(PREFIX)) return; // quien te conoce papa?

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
