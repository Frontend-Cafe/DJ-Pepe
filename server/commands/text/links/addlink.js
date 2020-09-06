export const AddLink = () => {
	const execute = message => {
		// https://links-bot-cloud-functions.vercel.app/api/add-link?url=discordapp.com

		const args = message.content.split(' ');

		const url = args[1];

		const tagsList = args
			.slice(2)
			.join('')
			.toLowerCase()
			.split(',');

		return message.reply(
			`Guardada la URL ${url} con los tags ${tagsList
				.map(t => `"${t}"`)
				.join(', ')}. Buenardo.`
		);
	};

	return {
		prefix: 'addlink',
		exec: execute,
	};
};
