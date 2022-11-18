const { MessageEmbed } = require('discord.js');
const i = ':information_source:'
const x = ':regional_indicator_x:'
const tick = ':white_check_mark:'

module.exports.run = async (bot, message, args) => {
    let data = await bot.fetchUser(message.author.id);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    if (args.join(' ') === 'all') {
        if (data.coinsInWallet > data.bankSpace) {
            const max_deposit = (data.coinsInWallet + data.coinsInBank - data.bankSpace);
            if (data.coinsInBank - data.bankSpace === 0) {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${x} **${member.user.username}** : Your bank is full.`);
                return message.channel.send(embed).catch();
            }

            if (parseInt(withAmount) > data.coinsInWallet) {
                const embed = new MessageEmbed()
                    .setColor("BLUE")
                    .setDescription(`${i} **${member.user.username}** : You do not have that many coins in your wallet.`);
                return message.channel.send(embed);
            }


            data.coinsInWallet = max_deposit;
            const embed = new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`${tick} **${member.user.username}** : Deposited **${(data.bankSpace - data.coinsInBank).toLocaleString()}** coins.`);

            await message.channel.send(embed).catch();

            data.coinsInBank = ((data.coinsInWallet + data.bankSpace) - max_deposit);

            await data.save();
        } else {

            if ((data.coinsInWallet + data.coinsInBank) > data.bankSpace) {
                const left = (data.coinsInWallet + data.coinsInBank) - data.bankSpace;

                const embed = new MessageEmbed()
                    .setColor("BLUE")
                    .setDescription(`${tick} **${member.user.username}** : Deposited **${(data.coinsInWallet - left).toLocaleString()}** coins`);

                await message.channel.send(embed).catch();


                data.coinsInBank += (data.coinsInWallet - left);
                data.coinsInWallet = left;

                await data.save();
            } else {
                const embed = new MessageEmbed()
                    .setColor("BLUE")
                    .setDescription(`${tick} **${member.user.username}** : Deposited **${(data.coinsInWallet).toLocaleString()}** coins`);
                await message.channel.send(embed).catch();

                data.coinsInBank += data.coinsInWallet;
                data.coinsInWallet = 0;

                await data.save();
            }
        }
    } else {
        if (isNaN(args[0])) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : That's not a number.`);

            return message.channel.send(embed).catch();
        }
        if (data.bankSpace - data.coinsInBank < parseInt(args[0])) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : Your bank is not big enough.`);

            return message.channel.send(embed).catch();
        }
        if (parseInt(args[0]) > data.coinsInWallet) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} **${member.user.username}** : You don't have that much money.`);
        }

        data.coinsInBank += parseInt(args[0]);
        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${tick} **${member.user.username}** : Deposited **${parseInt(args[0]).toLocaleString()}** coins.`);

        await message.channel.send(embed).catch();

        data.coinsInWallet -= parseInt(args[0]);

        await data.save();
    }
}

module.exports.config = {
    name: 'deposit',
    description: 'Deposit your money into your bank if you have space.',
    usage: `${process.env.PREFIX} deposit <amount>`,
    botPerms: [],
    userPerms: [],
    aliases: ['dep'],
    bankSpace: 0,
    cooldown: 10
}
