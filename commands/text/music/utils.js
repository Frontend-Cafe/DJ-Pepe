require('dotenv').config();
const ytdl = require('ytdl-core-discord');
const { GTOKEN } = process.env;
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(GTOKEN);

// Reproduce los cumbiones
const play = async (message, song) => {
	const queue = message.client.queue;
	const guild = message.guild;
	const voiceChannel = message.member.voice.channel;
	const serverQueue = queue.get(guild.id);
	if (!voiceChannel) {
		return message.reply(
			'Si no estas en un canal de voz no puedo pasar cumbia :('
		);
	}
	if (!song.url) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	const connection = await voiceChannel.join();
	const dispatcher = connection.play(
		await ytdl(song.url, { filter: 'audioonly' }),
		{ type: 'opus' }
	);
	message.channel.send(`✅ **${song.title}** Se esta reproduciendo!`);
	dispatcher.on('finish', () => {
		if (serverQueue.songs.length <= 1) {
			serverQueue.voiceChannel.leave();
			queue.delete(guild.id);
			return message.channel.send('termine de reproducir!');
		}
		serverQueue.songs.shift();
		play(message, serverQueue.songs[0]);
	});
	dispatcher.on('error', error => {
		message.channel.send('uuhY que peLoTuuDOO!!!');
		console.error(error);
	});
};

export const preplay = async (message, url2, NO_SPAM) => {
	const queue = message.client.queue;
	const serverQueue = message.client.queue.get(message.guild.id);
	const voiceChannel = message.member.voice.channel;
	if (!voiceChannel) {
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
			volume: 1.14, // 2.14 ~ 3.14 la cosa sana para los timpanos
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			const connection = await voiceChannel.join();
			queueContruct.connection = connection;
			return play(message, queueContruct.songs[0]);
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
};

const SongFilter = response => parseInt(response.content);

export const Buscar = async (message, busqueda) => {
	try {
		const videos = await youtube.searchVideos(busqueda, 10);
		let index = 0;
		// eslint-disable-next-line max-depth
		let indice = 1;
		message.channel
			.send(
				`
__**Song selection:**__

${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

responde con un numero del 1 al 10 para elegir el video a reproducir.
		`
			)
			.then(() => {
				message.channel
					.awaitMessages(SongFilter, {
						max: 1,
						time: 30000,
						errors: ['time'],
					})
					.then(collected => {
						indice = parseInt(collected.first().content);
						youtube
							.getVideoByID(videos[indice - 1].id)
							.then(response =>
								preplay(message, response.url, false)
							);
					})
					.catch(collected => {
						console.log(collected);
						message.channel.send(
							'Hubo algun problema procesando el comando, intenta otra vez :('
						);
					});
			});
	} catch (err) {
		console.error(err);
		return message.channel.send(
			'🆘 no encontre nada uuhY que peLoTuuDOO!!!.'
		);
	}
};
