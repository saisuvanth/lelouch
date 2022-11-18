
const { MessageEmbed } = require('discord.js');
const User = require('../models/UserModel');

module.exports.run = async (bot, message, args) => {
    let data = await User.find().sort([['coinsInWallet', 'descending']])
    data = data.filter(x => message.guild.members.cache.get(x.userId) && message.guild.members.cache.get(x.userId).bot != true).slice(0, 6);
    if (data.length == 0) return message.channel.send('No rich people in this server lmao');

    const emojis = [':first_place:', ':second_place:', ':third_place:'];
    data = data.map((x, i) => `${emojis[i] || '🔹'} **${x.coinsInWallet.toLocaleString()}** - ${bot.users.cache.get(x.userId).tag || 'Unkown#0000'}`);

    const embed = new MessageEmbed()
        .setAuthor(`Richest people in ${message.guild.name}`)
        .setDescription(`${data.join('\n')}`)
        .setColor('RANDOM')
        .setFooter('wish I had that much money');
    message.channel.send(embed);


}
module.exports.config = {
    name: 'rich',
    description: 'Shows the richest people in your server.',
    usage: `${process.env.PREFIX} rich`,
    botPerms: [],
    userPerms: [],
    aliases: ['leader'],
    bankSpace: 1,
    cooldown: 10
}
