const execute = async message => {
	const allowedRoles = ['Admin', 'DJ'];

	if (message.member.roles.some(r => allowedRoles.includes(r))) {
		const args = message.content.split(' ');
		let deleteCount = 0;
		try {
			deleteCount = parseInt(args[1], 10);
		} catch (err) {
			return message.reply(
				'Tenes que escribir el numero de mensajes a borrar, no voy a hacer un wipe de todo el canal!'
			);
		}

		if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
			return message.reply('Numero del 2 al 100 o sino no borro nada ?)');
		}
		const fetched = await message.channel.fetchMessages({
			limit: deleteCount,
		});
		message.channel
			.bulkDelete(fetched)
			.catch(error =>
				message.reply(`error al borrar los mensajes: ${error}`)
			);
	} else if (Math.round(Math.random())) {
		return message.reply('you have no power here', {
			file:
				'https://i.kym-cdn.com/photos/images/newsfeed/000/631/254/eda.jpg',
		});
	} else {
		return message.reply('quien te conoce papa?', {
			file:
				'https://i.pinimg.com/564x/b6/c0/9a/b6c09a69531be4e866f7e9ea9f686cae.jpg',
		});
	}
};

export const Purge = {
	prefix: 'purge',
	exec: execute,
};
