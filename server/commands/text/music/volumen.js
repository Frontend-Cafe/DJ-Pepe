export const Volumen = () => {
	const execute = message => {
		const args = message.content.split(' ');
		if (isNaN(args[1])) {
			return message.reply('ingresa un numero!');
		}
		// magia mistica del volumen:
		const queue = message.client.queue;
		const serverQueue = queue.get(message.guild.id);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return message.reply(`volumen fijado en ${args[1]} `);
	};

	return {
		prefix: 'volumen',
		exec: execute,
	};
};
