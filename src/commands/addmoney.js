const { MessageEmbed, Message } = require('discord.js');
const x = ':regional_indicator_x:'
const tick = ':white_check_mark:'
module.exports.run = async (bot, message, args) => {
	const usertag = message.member;
	const user = await bot.fetchUser(message.author.id);
	const member = message.mentions.members.first() || message.guild.members.cache.get(args.join(' ')) || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(' ').toString().toLowerCase());
	const amount = args[1];
	if (!member) {
		let rob1embed = new MessageEmbed()
			.setColor("RED")
			.setDescription(`${x} **${usertag.user.username}** : You forgot to tag the person you want to give money to.`);
		return message.channel.send(rob1embed);

	} else if (member.user.bot) {
		let rob1embed = new MessageEmbed()
			.setColor("RED")
			.setDescription(`${x} **${usertag.user.username}** : You cant give money to a bot.`);
		return message.channel.send(rob1embed);
	}
	if (!amount) {
		let embed = new MessageEmbed()
			.setColor("RED")
			.setDescription(`Enter a valid number of coins!`);
		message.channel.send(embed);
	}

	user.coinsInWallet += amount;
	await user.save();

	let embed = new MessageEmbed()
		.setColor("GREEN")
		.setDescription(`${tick} **${member}** :coin: ${amount} coins has been deposited into your wallet!`);
	message.channel.send(embed);

}

module.exports.config = {
	name: 'addmoney',
	description: 'admin can give money to someone :smile:',
	usage: `${process.env.PREFIX} addmoney <user>`,
	botPerms: [],
	userPerms: ['admin', 'moderator'],
	aliases: [],
	bankSpace: 5,
	cooldown: 1
}
