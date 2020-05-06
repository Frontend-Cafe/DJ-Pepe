const ytdl = require('ytdl-core');

// Reproduce los cumbiones
const play = (message, song) => {
	const queue = message.client.queue;
	const guild = message.guild;
	const voiceChannel = message.member.voice.channel;
	const serverQueue = queue.get(guild.id);
	if (!voiceChannel) {
		return message.reply(
			'Si no estas en un canal de voz no puedo pasar cumbia :('
		);
	}
	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	voiceChannel.join().then(connection => {
		const dispatcher = connection
			.play(ytdl(song.url))
			.on('end', () => {
				console.log('Music ended!');
				message.channel.send('Music ended!');
				serverQueue.songs.shift();
				play(message, serverQueue.songs[0]);
			})
			.on('error', error => {
				message.channel.send('uuhY que peLoTuuDOO!!!');
				console.error(error);
			});

		dispatcher.on('end', () => voiceChannel.leave());
	});
};

export const preplay = async (message, url2, NO_SPAM) => {
	const queue = message.client.queue;
	const serverQueue = message.client.queue.get(message.guild.id);
	console.log(message.guild.id);
	const voiceChannel = message.member.voice.channel;
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
			volume: 1.14, // 2.14 ~ 3.14 la cosa sana para los timpanos
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			const connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message, queueContruct.songs[0]);
			return message.channel.send(
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
};
