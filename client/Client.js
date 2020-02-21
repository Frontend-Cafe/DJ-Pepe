const { Client, Collection } = require('../discord.js/src');
module.exports = class extends Client {
	constructor(config) {
		super({
			disableEveryone: true,
			disabledEvents: ['TYPING_START'],
			partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
		});
		// partials: ['MESSAGE', 'CHANNEL', 'REACTION']
		this.commands = new Collection();

		this.queue = new Map();
		this.volumen = 5;
		this.config = config;
	}
};
