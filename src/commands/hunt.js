const itemss = require('../utils/items');
const { MessageEmbed } = require("discord.js");
const i = ':information_source:'
const x = ':regional_indicator_x:'
const tick = ':white_check_mark:'
module.exports.run = async (bot, message, args) => {
    let user = await bot.fetchUser(message.author.id);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;


    const item = itemss.find(x => x.name.toLowerCase() === 'rifle');
    let founditem = user.items.find(x => x.name.toLowerCase() === 'rifle');
    let array = [];
    array = user.items.filter(x => x.name !== 'rifle');
    if (!founditem) {
        let use3embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${member.user.username}** : You don't own a \`RIFLE\`, you need to buy one to use this command.`);
        return message.channel.send(use3embed);
    }


    const randomMessage = [
        'pig',
        'boar',
        'fox',
        'missed'
    ];

    const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];

    const userData = await bot.fetchUser(message.author.id);

    if (response == 'boar') {
        const boarAmnt = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const embed = new MessageEmbed()
            .setDescription(`${tick} **${member.user.username}** : You went hunting and came back with **${boarAmnt}** x Boar :boar:`)
            .setColor("GREEN")
        message.channel.send(embed);
        const findItem = data.items.find(i => i.name.toLowerCase() == 'boar');
        let userInv = data.items.filter(i => i.name.toLowerCase() !== 'boar');
        if (findItem) {
            userInv.push({ name: 'boar', amount: (findItem.amount + boarAmnt), description: ':boar: **Boar**\nsell boar to make money.' });
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ name: 'boar', amount: boarAmnt, description: ':boar: **Boar**\nsell boar to make money.' });
            data.items = userInv;
            await data.save();
        }
    } else if (response == 'pig') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedPig = new MessageEmbed()
            .setDescription(`${tick} **${member.user.username}** : You went hunting and came back with **${deerAmount}** x Pig :pig:`)
            .setColor("GREEN")
        message.channel.send(EmbedPig);
        const findItem = data.items.find(i => i.name.toLowerCase() == 'pig');
        let userInv = data.items.filter(i => i.name.toLowerCase() !== 'pig');
        if (findItem) {
            userInv.push({ name: 'pig', amount: (findItem.amount + deerAmount), description: ':pig: **Pig**\nsell pig to make money.' });
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ name: 'pig', amount: deerAmount, description: ':pig: **Pig**\nsell the pig to make money.' });
            data.items = userInv;
            await data.save();
        }
    } else if (response == 'fox') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedFox = new MessageEmbed()
            .setDescription(`${tick} **${member.user.username}** : You went hunting and came back with **${deerAmount}** x Fox :fox:`)
            .setColor("GREEN")
        message.channel.send(EmbedFox);
        const findItem = data.items.find(i => i.name.toLowerCase() == 'fox');
        let userInv = data.items.filter(i => i.name.toLowerCase() !== 'fox');
        if (findItem) {
            userInv.push({ name: 'fox', amount: (findItem.amount + deerAmount), description: ':fox: **Fox**\nsell fox to make money.' });
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ name: 'fox', amount: deerAmount, description: ':fox: **Fox**\nsell the fox to make money.' });
            data.items = userInv;
            await data.save();
        }
    } else if (response == 'missed') {
        const Embedmissed = new MessageEmbed()
            .setDescription(`${x} **${member.user.username}** : You went hunting, and hunted 0 animals. Pathetic!`)
            .setColor("RED")
        message.channel.send(Embedmissed);
    }
}
module.exports.config = {
    name: 'hunt',
    description: 'to hunt for animals.',
    usage: `${process.env.PREFIX} hunt`,
    botPerms: [],
    userPerms: [],
    aliases: [],
    bankSpace: 5,
    cooldown: 30
}
