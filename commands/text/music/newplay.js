require('dotenv').config();
const ytdl = require('ytdl-core-discord');
const { GTOKEN } = process.env;
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(GTOKEN);

import { preplay, Buscar } from './utils';

export const NewPlay = () => {
	const execute = async message => {
		// Preparo el mensaje de entrada:
		const args = message.content.split(' ');
		const url = args[1];
		const pattern = /^https?:\/\/(www.youtube.com|youtube.com)\/.*list(.*)$/;
		const pattern2 = /^https?:\/\/(www.youtube.com|youtube.com)\/watch\?v=/;

		if (url.match(pattern)) {
			message.channel.send('Empezando a buscar en la playlist');
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			// luego se podria agregar una variable para ver cuantas canciones se agregaron a la playlist
			let n = 0;
			for (const video of Object.values(videos)) {
				const songInfo2 = await ytdl.getInfo(video.id);
				const song2 = {
					title: songInfo2.title,
					url: songInfo2.video_url,
				};
				preplay(message, song2.url, true);
				n++;
			}
			return message.channel.send(
				`✅ Playlist: **${playlist.title}** Se esta reproduciendo con **${n}** canciones!`
			);
		} else if (url.match(pattern2)) {
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
		prefix: 'play',
		exec: execute,
	};
};
