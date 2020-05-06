/* eslint-disable curly */
export const Stop = () => {
	const execute = message => {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voiceChannel)
			return message.channel.send(
				'tenes que estar en un canal de voz para parar la musica!'
			);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
	};
	return {
		prefix: '$stop',
		exec: execute,
	};
};

module.exports = {
	name: 'stop',
	description: 'Stop all songs in the queue!',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voiceChannel)
			return message.channel.send(
				'You have to be in a voice channel to stop the music!'
			);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
	},
};
