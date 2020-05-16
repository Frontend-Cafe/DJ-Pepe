import { Client, Collection } from 'discord.js';
export default class extends Client {
	constructor(config) {
		super({
			disableEveryone: true,
			disabledEvents: ['TYPING_START'],
			partials: ['CHANNEL', 'REACTION'],
		});
		this.commands = new Collection();
		this.queue = new Map();
		this.volumen = 5;
		this.config = config;
	}
}
