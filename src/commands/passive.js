const i = ':information_source:'
const x = ':regional_indicator_x:'
const tick = ':white_check_mark:'
const { MessageEmbed } = require("discord.js");
module.exports.run = async (bot, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const userData = await bot.fetchUser(message.author.id);
    const enable = ['true', 'on', 'enable'];
    const disable = ['false', 'off', 'disable'];
    if (!args[0]) {
        let status = userData.passive
        if (status == false) status = `\`DISABLED\``
        else status = `\`ENABLED\``

        let passive1embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${i} **${member.user.username}** : Your passive mode is curently ${status}.`);

        return message.channel.send(passive1embed).catch();
    }
    if (enable.includes(args[0].toString().toLowerCase())) {
        let passive2embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${i} **${member.user.username}** : Your passive mode is already \`ENABLED\`.`);

        if (userData.passive == true) return message.channel.send(passive2embed).catch();

        userData.passive = true;
        await userData.save();

        let passive3embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${tick} **${member.user.username}** : I have \`ENABLED\` your passive mode`);

        message.channel.send(passive3embed).catch();
    } else if (disable.includes(args[0].toString().toLowerCase())) {
        let passive4embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${i} **${member.user.username}** : Your passive mode is currently \`DISABLED\`.`);

        if (userData.passive == false) return message.channel.send(passive4embed).catch();
        userData.passive = false;
        await userData.save();
        let passive5embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${tick} **${member.user.username}** : I have \`DISABLED\` your passive mode.`);

        message.channel.send(passive5embed).catch();
    } else {
        let passive6embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${member.user.username}** : That is a invalid option.`);

        message.channel.send(passive6embed).catch();


    }
}
module.exports.config = {
    name: 'passive',
    description: 'Enable / Disable passive mode.',
    usage: `${process.env.PREFIX} passive <on or off>`,
    botPerms: [],
    userPerms: [],
    aliases: [],
    bankSpace: 2,
    cooldown: 300
}
