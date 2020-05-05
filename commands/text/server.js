export const ServerInfo = () => {
	const execute = message =>
		message.channel.send(
			`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
		);
	return {
		prefix: '$server',
		exec: execute,
	};
};
/*
module.exports = {
	name: 'server',
	description: 'Display info about this server.',
	execute(message) {
		message.channel.send(
			`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
		);
	},
};
 */
