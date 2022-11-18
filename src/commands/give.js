const i = ':information_source:'
const x = ':regional_indicator_x:'
const tick = ':white_check_mark:'
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const usertag = message.member;
    const authorData = await bot.fetchUser(message.author.id);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]);

    let passivewarn = new MessageEmbed()
        .setColor("RED")
        .setDescription(`${x} **${usertag.user.username}** : You have \`PASSIVE\` enabled, your reqired to disable it to use this command.`);

    if (authorData.passive == true) return message.channel.send(passivewarn);

    if (!member || !args[0]) {

        let sendcoinsembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${usertag.user.username}** : Who are you giving coins too ?`);
        return message.channel.send(sendcoinsembed).catch();
    }
    if (member.user.id == message.author.id) {
        let sendcoinsembed1 = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${usertag.user.username}** : You can't give coins to yourself.`);
        return message.channel.send(sendcoinsembed1).catch();
    }
    if (!args[1]) {
        let sendcoinsembed2 = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${usertag.user.username}** : How many coins are you giving them.`);
        return message.channel.send(sendcoinsembed2).catch();
    }

    if (isNaN(args[1]) && args[1] != 'all') {
        return message.channel.send(`Thats not a valid option`)
    }
    const userData = await bot.fetchUser(member.user.id);
    if (userData.passive == true) {
        let sendcoinsembed3 = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${member.user.username}** : The user your trying to give coins to has \`PASSIVE\` enabled they will have to disable it to be able to revice coins.`);
        return message.channel.send(sendcoinsembed3).catch();
    }

    if (args[1] == 'all') {
        const toGive = authorData.coinsInWallet;

        authorData.coinsInWallet = 0;

        await authorData.save();

        userData.coinsInWallet = (userData.coinsInWallet + toGive);

        userData.save();

        let embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${tick} You gave ${member} **${parseInt(toGive).toLocaleString()}** coins`);
        message.channel.send(embed).catch();
    } else {
        const toGive = args[1];

        if (toGive > authorData.coinsInWallet) {

            let embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} You don't have that many coins.`);
            return message.channel.send(embed).catch();

        }

        authorData.coinsInWallet = (authorData.coinsInWallet - parseInt(toGive));

        await authorData.save();

        userData.coinsInWallet = (userData.coinsInWallet + parseInt(toGive));

        try {

            await userData.save();
        } catch (err) {
            let embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${x} You cant give coins to bots`);
            return message.channel.send(embed).catch();
        }
        const usertag = message.member;
        let embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${tick} **${usertag.user.username}** : You gave ${member} **${parseInt(toGive).toLocaleString()}** coins.`);
        message.channel.send(embed).catch();
    }

}
module.exports.config = {
    name: 'give',
    description: 'give user coins.',
    usage: `${process.env.PREFIX} give <amount>`,
    botPerms: [],
    userPerms: [],
    aliases: [],
    bankSpace: 3,
    cooldown: 5
}
