require('dotenv').config();
const Discord = require('discord.js');
const Client = require('./client/Client');
const { PREFIX, TOKEN } = process.env;

import { Middlewares, logMemUsg } from './utils';
import { ServerInfo } from './commands/text/server';

const client = new Client();
client.commands = new Discord.Collection();

const func2 = message => console.log('soy la funcion1: ' + message.content);
const func = message => console.log('soy la funcion2: ' + message.content);

const superComandos = [
	{ prefix: 'alo', exec: func },
	{ prefix: 'bai', exec: func2 },
];
superComandos.push(ServerInfo());
const api = Middlewares(superComandos);

client.once('ready', () => {
	const messageTrucho = {
		content: 'bai',
	};
	api(messageTrucho);
	messageTrucho.content = 'alo';
	api(messageTrucho);

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
	const args = message.content.slice(1).split(/ +/);
	console.log(args);
	if (message.author.bot) return;
	if (!message.content.startsWith(PREFIX)) return; // quien te conoce papa?

	try {
		api(message);
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
