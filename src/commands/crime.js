const { MessageEmbed } = require("discord.js");

const tick = ':white_check_mark:'
module.exports.run = async (bot, message, args) => {

  const usertag = message.member;
  const another = Math.round(Math.random() * 15);

  const random = Math.round(Math.random() * 100);
  const randomMessage = [
    `You stole from a poor old grannie and she only had ${random.toLocaleString()} coins.`,
    `You raided a drug dealers home and found ${random.toLocaleString()} coins.`,
    `You murdered **Queen Elizibeth II** you was payed ${random.toLocaleString()} coins.`,
    `You almost got shot, but you had **GODMODE** enabled and killed him you was payed ${random.toLocaleString()} coins.`,
  ];
  const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];

  let embed = new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`${tick} **${usertag.user.username}** : ${response}`);

  await message.channel.send(embed).catch();

  await bot.giveCoins(message.author.id, random);
}

module.exports.config = {
  name: 'crime',
  description: 'you brake the law or do something bad for coins.',
  usage: `${process.env.PREFIX} crime`,
  botPerms: [],
  userPerms: [],
  aliases: [],
  bankSpace: 15,
  cooldown: 5
}
