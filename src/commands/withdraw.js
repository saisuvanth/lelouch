const i = ':information_source:'
const x = ':regional_indicator_x:'
const tick = ':white_check_mark:'
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let data = await bot.fetchUser(message.author.id);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (args.join(' ') === 'all') {
        if (data.coinsInBank === 0) {
            let bankerrorembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : Your bank is empty.`);
            return message.channel.send(bankerrorembed).catch();
        }
        data.coinsInWallet += data.coinsInBank; {

            let with2embed = new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`${i} **${member.user.username}** : Withdrawed **${data.coinsInBank.toLocaleString()}** coins.`);
            await message.channel.send(with2embed);

        }

        data.coinsInBank -= data.coinsInBank;

        await data.save();
    } else {
        let withAmount = parseInt(args[0]);
        if (withAmount === 0) {
            let bankerrorembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : Your can't withdraw 0 coins.`);
            return message.channel.send(bankerrorembed).catch();
        }
        if (isNaN(withAmount)) {
            let numbererrorembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : That's not a number.`);

            return message.channel.send(numbererrorembed).catch();
        }

        if (parseInt(withAmount) > data.coinsInBank) {
            let with3embed = new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`${i} **${member.user.username}** : You do not have that many coins in your bank.`);
            return message.channel.send(with3embed);
        }

        data.coinsInWallet += parseInt(withAmount); {
            let with4embed = new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`${i} **${member.user.username}** : Withdrawed **${(withAmount).toLocaleString()}** coins.`);
            await message.channel.send(with4embed);
        }

        data.coinsInBank -= parseInt(withAmount);

        await data.save();
    }
}

module.exports.config = {
    name: 'withdraw',
    description: 'withdraws money from your bank.',
    usage: `${process.env.PREFIX} withdraw <amount>`,
    botPerms: [],
    userPerms: [],
    aliases: ['with'],
    bankSpace: 3,
    cooldown: 5
}
