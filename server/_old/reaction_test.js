client.on('messageReactionAdd', async (reaction, user) => {
	// When we receive a reaction we check if the message is partial or not
	if (reaction.message.partial) {
		// If the message was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.message.fetch();
		} catch (error) {
			console.log(
				'Something went wrong when fetching the message: ',
				error
			);
		}
	}
	// Now the message has been cached and is fully available
	console.log(
		`${reaction.message.author.username}'s message "${reaction.message.content}" gained a reaction! ${reaction._emoji.identifier}`
	);
	// We can also check if the reaction is partial or not
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.log(
				'Something went wrong when fetching the reaction: ',
				error
			);
		}
	}
	// Now the reaction is fully available and the properties will be reflected accurately:
	console.log(
		`${reaction.count} user(s) have given the same reaction to this message!`
	);
});