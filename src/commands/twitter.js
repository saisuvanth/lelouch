const { MessageEmbed } = require('discord.js');
const { TwitterApi } = require('twitter-api-v2');
const TClient = new TwitterApi(process.env.TWITTER);


module.exports.run = async (bot, message, args) => {
	const userId = message.author.id;
	const cacheUser = bot.fetchUser(userId);
	const username = args[0];
	try {
		const user = await TClient.v2.userByUsername(username);
		if (user) {
			await bot.addTwitter(userId, username);
			const embed = new MessageEmbed().setColor('BLUE')
				.setTitle(`${user.data.name}`)
				.setThumbnail(message.author.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
				.setDescription(`handle is set to **[${username}](https://twitter.com/${username})**`)
			message.channel.send(embed);
		} else {
			const embed = new MessageEmbed().setColor('RED')
				.setDescription('No twitter handle exists')
			message.channel.send(embed);
		}
	} catch (err) {
		console.log(err);
	}
}

module.exports.config = {
	name: 'twitter',
	description: 'to set twitter username',
	usage: `${process.env.PREFIX} twitter`,
	botPerms: [],
	userPerms: [],
	aliases: ['twt'],
	bankSpace: 10,
	cooldown: 5
}