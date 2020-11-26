const express = require('express');
require('dotenv').config();
const Discord = require('discord.js');
const Client = require('./client/Client').default;
const { PREFIX, TOKEN } = process.env;
const app = express();
const bodyParser = require("body-parser");

import { Middlewares, logMemUsg } from './utils';
import textCommands from './commands/text';

//primero middleware de bodyParser para poder tener en el json del body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


const client = new Client();
client.commands = new Discord.Collection();
// eslint-disable-next-line no-unused-vars
const queue = new Map();

const _middleware = Middlewares(textCommands);

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
		return _middleware(message);
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

// server Express:
app.get('/', function(req, res) {
	const msg = `La bestia ta viva!, usando: ${(
		process.memoryUsage().heapUsed /
		1024 /
		1024
	).toPrecision(5)} MB de RAM`;
	res.send(msg);
});

app.listen(process.env.PORT || 8080, function() {
	console.log('Pasando cumbiones en el puerto 8080!');
});
