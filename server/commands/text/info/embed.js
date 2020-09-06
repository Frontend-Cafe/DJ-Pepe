export const Embed = () => {
	const execute = message => {
		const embed = {
			title: 'embed test',
			description:
				'MAMAAAAAA SACA LA MANO DE AHI CARAJO VA A CORTAR TODA LA LETRICIDA',
			url: 'https://discordapp.com',
			color: 13632027,
			timestamp: '2020-08-19T23:58:35.599Z',
			footer: {
				icon_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
				text: 'footer text',
			},
			/* 			image: {
				url: 'https://cdn.discordapp.com/embed/avatars/0.png',
			}, */
			author: {
				name: 'author name',
				url: 'https://discordapp.com',
				icon_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
			},
		};

		message.channel.send('msg random', { embed });
	};
	return {
		prefix: 'embed',
		exec: execute,
	};
};
