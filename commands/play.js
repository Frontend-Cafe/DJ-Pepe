const { Util } = require('discord.js');
const ytdl = require('ytdl-core');
const { GToken } = require('../config.json');

const YouTube = require('simple-youtube-api');
const youtube = new YouTube(GToken);
module.exports = {
	name: 'play',
	description: 'Deja que el DJ Pepe le ponga ritmo a la noche!',
	help:
		'Usa !play search para buscar un video, y !play {url} para reproducir una playlist o una cancion suelta',

	async execute(message) {
		// Preparo el mensaje de entrada:
		const args = message.content.split(' ');
		const url = args[1];
		const pattern = /^https?:\/\/(www.youtube.com|youtube.com)\/.*list(.*)$/;
		const pattern2 = /^https?:\/\/(www.youtube.com|youtube.com)\/watch\?v=/;
		// escalera de if-else para ver que corno hacer ?)
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
				this.preplay(message, song2.url, true);
				n++;
			}
			return message.channel.send(
				`✅ Playlist: **${playlist.title}** Se esta reproduciendo con **${n}** canciones!`
			);
		} else if (args[1] == 'search') {
			this.buscar(message, message.content.split('search ')[1]);
			return;
		} else if (url.match(pattern2)) {
			this.preplay(message, args[1], false);
			return;
		} else {
			return message.reply(
				'Ingresaste mal el comando o la url, intenta otra vez!'
			);
		}
	},
	async preplay(message, url2, NO_SPAM) {
		const queue = message.client.queue;
		const serverQueue = message.client.queue.get(message.guild.id);
		const voiceChannel = message.member.voice.channel;
		console.log('URL a reproducir ñeri:');
		console.log(url2);
		if (!voiceChannel) {
			console.log(message.member);
			return message.reply(
				'Si no estas en un canal de voz no puedo pasar cumbia :('
			);
		}
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
			return message.channel.send(
				'los admin se mandaron cagada y no puedo entrar al canal, todo culpa de @FDSoftware'
			);
		}

		const songInfo = await ytdl.getInfo(url2);
		const song = {
			title: songInfo.title,
			url: songInfo.video_url,
		};

		if (!serverQueue) {
			const queueContruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				// eslint-disable-next-line no-inline-comments
				volume: 2.14, // 2.14 ~ 3.14 la cosa sana para los timpanos
				playing: true,
			};

			queue.set(message.guild.id, queueContruct);

			queueContruct.songs.push(song);

			try {
				const connection = await voiceChannel.join();
				queueContruct.connection = connection;
				this.play(message, queueContruct.songs[0]);
				message.channel.send(
					`✅ **${song.title}** Se esta reproduciendo!`
				);
			} catch (err) {
				console.log(err);
				queue.delete(message.guild.id);
				return message.channel.send(err);
			}
		} else {
			serverQueue.songs.push(song);
			if (!NO_SPAM) {
				return message.channel.send(
					`✅  **${song.title}** se agrego a la lista!`
				);
			}
			return;
		}
	},

	play(message, song) {
		const queue = message.client.queue;
		const guild = message.guild;
		const serverQueue = queue.get(message.guild.id);

		if (!song) {
			serverQueue.voiceChannel.leave();
			queue.delete(guild.id);
			return;
		}
		console.log(serverQueue.songs);
		/* CODIGO NEW */
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		voiceChannel.join().then(connection => {
			const dispatcher = connection
				.play(ytdl(song.url, { filter: 'audioonly' }))
				.on('end', () => {
					console.log('Music ended!');
					serverQueue.songs.shift();
					this.play(message, serverQueue.songs[0]);
				})
				.on('error', error => {
					message.channel.send('uuhY que peLoTuuDOO!!!');
					console.error(error);
				});

			dispatcher.on('end', () => voiceChannel.leave());
		});
		/* EL OLDSITO 
		const dispatcher = serverQueue.connection
			.playStream(ytdl(song.url, { filter: 'audioonly' }))
			.on('end', () => {
				console.log('Music ended!');
				serverQueue.songs.shift();
				this.play(message, serverQueue.songs[0]);
			})
			.on('error', error => {
				message.channel.send('uuhY que peLoTuuDOO!!!');
				console.error(error);
			}); */

		// dispatcher.setVolumeLogarithmic(serverQueue.volume / 15);
	},

	async buscar(msg, busqueda) {
		try {
			const videos = await youtube.searchVideos(busqueda, 10);
			let index = 0;
			msg.channel.send(`
__**Song selection:**__

${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

responde con un numero del 1 al 10 para elegir el video a reproducir.
			`);
			// eslint-disable-next-line max-depth
			let indice = 1;
			try {
				// eslint-disable-next-line no-var
				var response = await msg.channel.awaitMessages(
					msg2 => msg2.content > 0,
					{
						maxMatches: 1,
						time: 15000,
						errors: ['time'],
					}
				);
				indice = parseInt(response.first().content);
			} catch (err) {
				err.map(m => console.log(m.content));
				return msg.channel.send(
					'no se ingreso un numero, o es invalido, eligiendo el primer resultado.'
				);
			} finally {
				const video = await youtube.getVideoByID(videos[indice - 1].id);
				this.preplay(msg, video.url, false);
			}
		} catch (err) {
			console.error(err);
			return msg.channel.send(
				'🆘 no encontre nada uuhY que peLoTuuDOO!!!.'
			);
		}
	},
};
