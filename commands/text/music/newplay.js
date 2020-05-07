/* const { GToken } = require('../config.json');
const { Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(GToken); */
import { preplay, Buscar } from './utils';
export const NewPlay = () => {
	const execute = message => {
		// Preparo el mensaje de entrada:
		const args = message.content.split(' ');
		const url = args[1];
		const pattern2 = /^https?:\/\/(www.youtube.com|youtube.com)\/watch\?v=/;

		if (url.match(pattern2)) {
			preplay(message, args[1], false);
			return;
		} else if (args[1] === 'search') {
			Buscar(message, args[2]);
		} else {
			return message.reply(
				'Ingresaste mal el comando o la url, intenta otra vez!'
			);
		}
	};
	return {
		prefix: '$play',
		exec: execute,
	};
};
