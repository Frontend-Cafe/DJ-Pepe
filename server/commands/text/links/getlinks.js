import Axios from 'axios';

const execute = async message => {
	// "!getlinks que, onda, la banda"

	const args = message.content.split(' ');

	const tagsList = args
		.slice(1)
		.join('')
		.toLowerCase()
		.split(',');

	const response = await Axios.get(
		tagsList
			? `https://links-bot-cloud-functions.vercel.app/api/get-links?tags=${tagsList.join(
					','
			  )}`
			: 'https://links-bot-cloud-functions.vercel.app/api/get-links'
	);

	const dataLinks = response.data.body;

	// return message.reply(
	// 	`Trayendo los recursos con los tags ${tagsList
	// 		.map(t => `"${t}"`)
	// 		.join(', ')}. Buenarrrrrdo.`
	// );

	const tagsToString = tl => tl.map(t => `"${t}"`).join(', ');
	const formatLinksToDescription = links => {
		return links.length
			? links
					.map(l => `[${l.title}](${l.link})\n${l.description}`)
					.join('\n\n')
			: 'No se encontraron links con estos tags.';
	};

	const embed = {
		title: `Links con los tags ${tagsToString(tagsList)}`,
		description: formatLinksToDescription(dataLinks),
		url: 'https://frontend.cafe/links', // TODO: hacer esto (?
		color: 6537885,
		footer: {
			text: 'Encontrá más en frontend.cafe/links',
		},
	};

	return message.channel.send({ embed });
};

export const GetLinks = {
	prefix: 'getlinks',
	exec: execute,
};
