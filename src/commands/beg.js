const { MessageEmbed } = require("discord.js");
const tick = ':white_check_mark:'
module.exports.run = async (bot, message, args) => {
    const usertag = message.member;
    const random = Math.round(Math.random() * 100);



    let begembed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`${tick} **${usertag.user.username}** : Beggar take these ${random} coins. :grin: `);

    await message.channel.send(begembed);

    await bot.giveCoins(message.author.id, random);
}

module.exports.config = {
    name: 'beg',
    description: 'allows you to beg people for coins.',
    usage: `${process.env.PREFIX} beg`,
    botPerms: [],
    userPerms: [],
    aliases: [],
    bankSpace: 13,
    cooldown: 5
}

