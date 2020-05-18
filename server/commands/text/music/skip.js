export const Skip = () => {
	const execute = message => {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel)
			return message.channel.send(
				'Si no estas en un canal de voz no puedo saltar la cumbia :('
			);
		if (!serverQueue)
			return message.channel.send('no estoy reproduciendo nada!');
		serverQueue.connection.dispatcher.end();
	};

	return {
		prefix: 'skip',
		exec: execute,
	};
};
