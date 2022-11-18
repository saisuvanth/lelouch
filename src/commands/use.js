const itemss = require('../utils/items');
const x = ':regional_indicator_x:'
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let user = await bot.fetchUser(message.author.id);
    if (!args.join(' ')) {

        let use1embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${member.user.username}** : You forgot to type the items \`id\`.`);
        return message.channel.send(use1embed);

    }
    const item = itemss.find(x => x.name.toLowerCase() === args.join(' ').toString().toLowerCase());
    if (!item) {
        let use2embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${member.user.username}** : You dont have this item make sure you have typed the correct \`id\`.`);
        return message.channel.send(use2embed);

    }
    if (!item.canUse) {
        let use3embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${member.user.username}** : You can't use this item.`);
        return message.channel.send(use3embed);

    }
    let founditem = user.items.find(x => x.name.toLowerCase() === item.name.toLowerCase());
    let array = [];
    array = user.items.filter(x => x.name !== item.name);
    if (!founditem) {
        let use3embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${member.user.username}** : You dont have this item make sure you have typed the correct \`id\`.`);
        return message.channel.send(use3embed);
    }

    if (item.keep == false) {
        if (founditem.amount === 1) {
            user.items = user.items.filter(x => x.name.toLowerCase() != item.name.toLowerCase());
            await user.save();
        }
        else {
            array.push({
                name: item.name,
                amount: founditem.amount - 1,
                description: item.description
            });
            user.items = array;
            await user.save();
        }
    }
    await item.run(bot, message, args);
}

module.exports.config = {
    name: 'use',
    description: 'use an item.',
    usage: `${process.env.PREFIX} use <item id>`,
    botPerms: [],
    userPerms: [],
    aliases: [],
    bankSpace: 3,
    cooldown: 5
}
