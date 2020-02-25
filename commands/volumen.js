module.exports = {
	name: 'volumen',
	description: 'Pa subir la cumbia',
	execute(message) {
		const args = message.content.split(' ');
		if (isNaN(args[1])) {
			return message.reply('ingresa un numero!');
		}
		const allowedRoles = ['Admin', 'Moderators', 'Mentores', 'DJ'];
		if (
			message.member.roles.map(m => {
				return allowedRoles.includes(m.name);
			})
		) {
			// *por las dudas* nos fijamos que este en un canal de voz
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel) {
				return message.reply(
					'Si no estas en un canal de voz no podes cambiar el volumen!'
				);
			}
			// magia mistica del volumen:
			const queue = message.client.queue;
			const serverQueue = queue.get(message.guild.id);
			serverQueue.volume = args[1];
			serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
			return message.reply(`volumen fijado en ${args[1] / 5} `);
		} else {
			message.reply('you have no power here', {
				file:
					'https://i.kym-cdn.com/photos/images/newsfeed/000/631/254/eda.jpg',
			});
		}
	},
};
