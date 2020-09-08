import Axios from 'axios';

export const AddLink = () => {
	const execute = async message => {
		// https://links-bot-cloud-functions.vercel.app/api/add-link?url=discordapp.com

		const args = message.content.split(' ');

		const url = args[1];

		const tagsList = args
			.slice(2)
			.join('')
			.toLowerCase()
			.split(',');

		try {
			console.log('La request que fue para la api', {
				tags: tagsList,
				url: url,
			});
			const request = await Axios.post(
				'https://links-bot-cloud-functions.vercel.app/api/add-link',
				{
					tags: tagsList,
					url: url,
				}
			);

			if (!request) {
				throw new Error(
					'No le pude pegar a la API para guardar el link que me pasaste, alto bajón :('
				);
			}

			return message.reply(
				`Guardado el link '${url}' con los tags ${tagsList
					.map(t => `"${t}"`)
					.join(', ')}. Buenardo.`
			);
		} catch (error) {
			return message.reply(`Se rompió todo: ${error}`);
		}
	};

	return {
		prefix: 'addlink',
		exec: execute,
	};
};
