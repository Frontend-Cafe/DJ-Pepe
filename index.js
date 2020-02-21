const fs = require('fs');
const Discord = require('./discord.js/src');
const Client = require('./client/Client');
const { prefix, token } = require('./config.json');

const client = new Client();
client.commands = new Discord.Collection();

const queue = new Map();

const commandFiles = fs
	.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

console.log(client.commands);

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

client.on('messageReactionAdd', async (reaction, user) => {
	// When we receive a reaction we check if the message is partial or not
	if (reaction.message.partial) {
		// If the message was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.message.fetch();
		} catch (error) {
			console.log(
				'Something went wrong when fetching the message: ',
				error
			);
		}
	}
	// Now the message has been cached and is fully available
	console.log(
		`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`
	);
	// We can also check if the reaction is partial or not
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.log(
				'Something went wrong when fetching the reaction: ',
				error
			);
		}
	}
	// Now the reaction is fully available and the properties will be reflected accurately:
	console.log(
		`${reaction.count} user(s) have given the same reaction to this message!`
	);
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

client.login(token);