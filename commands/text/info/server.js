export const ServerInfo = () => {
	const execute = message =>
		message.channel.send(
			`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
		);
	return {
		prefix: 'server',
		exec: execute,
	};
};
