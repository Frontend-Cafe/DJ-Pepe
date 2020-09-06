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

	if (message.content.startsWith('panchuke')) {
		// https://images.clarin.com/2017/09/11/rJHXmbNq-_340x340.jpg
		return message.reply('*pancho electronico', {
			files: [
				'https://images.clarin.com/2017/09/11/rJHXmbNq-_340x340.jpg',
			],
		});
	}
	//picoparéntesis
	if (message.content.startsWith('picoparéntesi')) {
		//https://images.clarin.com/2017/09/11/rJHXmbNq-_340x340.jpg
		return message.reply('*NO', {
			files: [
				'https://i.kym-cdn.com/photos/images/newsfeed/000/552/073/ea3',
			],
		});
	}
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
