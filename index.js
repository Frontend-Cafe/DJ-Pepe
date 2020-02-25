// Para el bot:
const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/Client');
require('dotenv').config();
const { prefix } = require('./config.json');

// Para server Express para deploy en Heroku
const express = require('express');
const app = express();

const client = new Client();
client.commands = new Discord.Collection();

// eslint-disable-next-line no-unused-vars
const queue = new Map();

const commandFiles = fs
	.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.commands.map(m => console.log({ comando: m.name, desc: m.description }));
// console.log(client.commands.name);

const logMemUsg = () => {
	console.log(
		`The script uses approximately ${process.memoryUsage().heapUsed /
			1024 /
			1024} MB`
	);
};

client.once('ready', () => {
	logMemUsg();
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
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);

	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	if (message.content.startsWith('!welcome')) {
		client.channels
			.get('594935077637718027')
			.fetchMessage('646726213003509770')
			.then(message2 => console.log(message.reply(message2.content)))
			.catch(console.error);
	} else {
		try {
			command.execute(message);
		} catch (error) {
			console.error(error);
			const numero = Math.floor(Math.random() * 100 + 1);
			if (numero == 45) {
				message.reply('Ese comando no existe, pero la puta madreee!!!');
			} else {
				message.reply('usa !help para tener una lista de comandos');
			}
		}
	}
});

client.login();

// server Express:
app.get('/', function(req, res) {
	const msg = `DJ Pepe ta vivo!, usando: ${(
		process.memoryUsage().heapUsed /
		1024 /
		1024
	).toPrecision(5)} MB de RAM`;
	res.send(msg);
});

app.listen(process.env.PORT || 5000, function() {
	console.log('Pasando cumbiones en el puerto 5000!');
});
