const { MessageEmbed } = require('discord.js');
const itemss = require('../utils/items');
const x = ':regional_indicator_x:'
const tick = ':white_check_mark:'

module.exports.run = async (bot, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let user = await bot.fetchUser(message.author.id);
    if (!args.join(' ')) {
        let embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${member.user.username}** : You can't buy nothing, please enter the correct item \`id\`.`);

        return message.channel.send(embed).catch();
    }
    if (!args[1]) args[1] = '';
    const item = itemss.find(x => x.name.toLowerCase() === args.join(' ').toString().toLowerCase() || x.name.toLowerCase() === args[0].toString().toLowerCase() || x.name.toLowerCase() === `${args[0].toString().toLowerCase()} ${args[1].toString().toLowerCase()}`);
    if (!item) {
        let embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${member.user.username}** : You can't buy an item that doesn't exist please use the correct item \`id\`.`);

        return message.channel.send(embed).catch();
    }
    if (item.canBuy == false) {
        let embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${member.user.username}** : You can't buy this item.`);

        return message.channel.send(embed).catch();
    }
    let buyAmount = args.join(' ').toString().match(/([1-9][0-9]*)/)
    if (!buyAmount) buyAmount = 1;
    else buyAmount = buyAmount[0]
    if (item.price > user.coinsInWallet || (buyAmount * item.price) > user.coinsInWallet) {
        let embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${member.user.username}** : You dont have the funds to buy this item.`);

        return message.channel.send(embed).catch();
    }
    let founditem = user.items.find(x => x.name.toLowerCase() === item.name.toLowerCase());
    let array = [];
    array = user.items.filter(x => x.name !== item.name);
    if (founditem) {
        array.push({
            name: item.name,
            amount: (parseInt(founditem.amount) + parseInt(buyAmount)),
            description: item.description
        });
        user.items = array;
        await user.save();
    }
    else {
        user.items.push({
            name: item.name,
            amount: buyAmount,
            description: item.description
        });
        await user.save();
    }
    user.coinsInWallet -= (parseInt(item.price) * parseInt(buyAmount));
    await user.save();
    let embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`${tick} **${member.user.username}** : You bought **${parseInt(buyAmount).toLocaleString()}** \`${item.name}\`.`);

    message.channel.send(embed).catch();
}

module.exports.config = {
    name: 'buy',
    description: 'displays the shop items.',
    usage: `${process.env.PREFIX} buy <item id>`,
    botPerms: [],
    userPerms: [],
    aliases: [],
    bankSpace: 0,
    cooldown: 5
}
