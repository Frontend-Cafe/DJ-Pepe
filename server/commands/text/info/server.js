const execute = message =>
	message.channel.send(
		`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
	);

export const ServerInfo = {
	prefix: 'server',
	exec: execute,
};
