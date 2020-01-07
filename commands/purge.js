module.exports = {
	name: 'purge',
	description: 'Delete the last messages in all chats.',
	async execute(message) {
		const array1 = [
			375073711704899594,
			277086414917599232,
			445771525296095234,
			283470239549882369,
			454808687567962143,
			364256538056982528,
		];
		const magic = message.author.id;
		const found = array1.find(element => element == magic);
		if (found != undefined) {
			const args = message.content.split(' ');
			let deleteCount = 0;
			try {
				deleteCount = parseInt(args[1], 10);
			} catch (err) {
				console.log(message.author.id);
				return message.reply(
					'Tenes que escribir el numero de mensajes a borrar, no voy a hacer un wipe de todo el canal!'
				);
			}

			if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
				console.log(message.author.id);
				return message.reply(
					'Numero del 2 al 100 o sino no borro nada ?)'
				);
			}
			const fetched = await message.channel.fetchMessages({
				limit: deleteCount,
			});
			message.channel
				.bulkDelete(fetched)
				.catch(error =>
					message.reply(
						`Couldn't delete messages because of: ${error}`
					)
				);
		} else {
			message.reply('you have no power+ here', {
				file:
					'https://i.kym-cdn.com/photos/images/newsfeed/000/631/254/eda.jpg',
			});
		}
	},
};
