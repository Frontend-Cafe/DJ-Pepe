const fs = require('fs');

module.exports = {
	name: 'help',
	description: 'List all available commands.',
	execute(message) {
		let str = '';
		// eslint-disable-next-line prettier/prettier
		const commandFiles = fs.readdirSync('../commands').filter(file => file.endsWith('.js'));
		const args = message.content.split(' ');

		if (args[1] == undefined) {
			message.channel.send(
				'Lista de los modulos disponibles, escribe !help nombre_modulo para buscar info mas especifica'
			);
			for (const file of commandFiles) {
				const command = require(`./${file}`);
				str += `Name: ${command.name}, Description: ${command.description} \n`;
			}
		} else {
			for (const file of commandFiles) {
				const command = require(`./${file}`);
				if (command.name == args[1]) {
					message.channel.send(`${command.help} \n`);
				}
			}
		}

		message.channel.send(str);
	},
};
