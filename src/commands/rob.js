const { MessageEmbed, Message } = require('discord.js');
const i = ':information_source:'
const x = ':regional_indicator_x:'
const tick = ':white_check_mark:'
const s = '<:hydrashild:780113155744595978>'
module.exports.run = async (bot, message, args) => {
    const usertag = message.member;
    const user = await bot.fetchUser(message.author.id);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args.join(' ')) || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(' ').toString().toLowerCase());


    let passivewarn = new MessageEmbed()
        .setColor("RED")
        .setDescription(`${x} **${usertag.user.username}** : You have \`PASSIVE\` enabled, your reqired to disable it to use this command.`);

    if (user.passive == true) return message.channel.send(passivewarn);

    if (!member) {

        let rob1embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${usertag.user.username}** : You forgot to tag the person you wanted to rob.`);
        return message.channel.send(rob1embed);

    }
    const devs = ['404205935251292160'];

    if (devs.includes(member.user.id)) {

        let rob2embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${s} **${usertag.user.username}** : The user you tried to rob has protections`);
        return message.channel.send(rob2embed);
    }

    const robbedUser = await bot.fetchUser(member.id);
    if (robbedUser.passive == true) {

        let rob3embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${usertag.user.username}** : The user you tried to rob has passive \`ENABLED\`.`);
        return message.channel.send(rob3embed);
    }
    if (robbedUser.coinsInWallet < 1000) {
        let rob4embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${s} **${usertag.user.username}** : The user you tried to rob has protections on there balance at the moment as they have a balance smaller then \`1,000\` coins.`);
        return message.channel.send(rob4embed);
    }
    if (user.items.find(x => x.name == 'luckyclover')) {
        const newInv = user.items.filter(i => i.name != 'luckyclover');
        const bypass = user.items.find(i => i.name == 'luckyclover');
        if (bypass.amount == 1) {
            user.items = newInv;
        } else {
            newInv.push({ name: 'luckyclover', amount: bypass.amount - 1, description: bypass.description });
            user.items = newInv
        }
    } else {
        const random = Math.floor(Math.random() * 5);
        if (random === 3) {
            let rob5embed = new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`${s} **${usertag.user.username}** : You tried to rob **${member.user.tag}** but got caught👮! Better luck next time.`);
            return message.channel.send(rob5embed);
        }
    }
    let array = robbedUser.items.filter(x => x.name !== 'padlock');
    const padlock = robbedUser.items.find(x => x.name === 'padlock');
    if (padlock) {

        let rob6embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${s} **${usertag.user.username}** : You tried to rob **${member.user.tag}**, but they had a **Padlock**🔒. Try again next time.`);
        message.channel.send(rob6embed);

        if (padlock.amount === 1) {
            robbedUser.items = array;
            await robbedUser.save();
            return;
        }
        else {
            array.push({
                name: 'padlock',
                amount: padlock.amount - 1,
                description: padlock.description
            });
            robbedUser.items = array;
            await robbedUser.save();
            return;
        }
    }
    const randomAmount = Math.round(Math.random() * robbedUser.coinsInWallet);
    user.coinsInWallet += randomAmount;
    robbedUser.coinsInWallet -= randomAmount;
    await user.save();
    await robbedUser.save();

    let rob6embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`:moneybag:  **${usertag.user.username}** : You stole **${randomAmount.toLocaleString()}** coins from ${member}!`);
    message.channel.send(rob6embed);


}

module.exports.config = {
    name: 'rob',
    description: 'steal someones money and get rich.',
    usage: `${process.env.PREFIX} rob <user>`,
    botPerms: [],
    userPerms: [],
    aliases: [],
    bankSpace: 5,
    cooldown: 600
}
