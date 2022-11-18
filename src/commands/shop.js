const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  let timeout = 5;

  let pages = [
    `**Cookie - __50__** __coins__\n\`id: cookie\`\nUse to make you fatter \n **Padlock - __10__,__000__** __coins__\n\`id: padlock\`\nUse this to stop those pesky robber\n **Bank Note - __20__,__000__** __coins__\n\`id: banknote\`\nUse this to increase your back capacity\n **Lucky Clover - __10__,__000__** __coins__\n\`id: luckyclover\`\nUse this to increase you chances of robbing`,
    ` **Rifle - __22__,__500__** __coins__\n\`id: rifle\`\nUse this to go hunting\n **Axe - __20__,__000__** __coins__\n\`id: axe\`\nUse this to cut trees down!\n **Fishing Rod - __15__,__000__** __coins__\n\`id: fishingrod\`\nUse this to go fishing!\n **Pickaxe - __30__,__000__** __coins__\n\`id: pickaxe\`\nUse this to mine gems!`,
    ` **Rainbow Coin - __100__,__000__,__000__** __coins__\n\`id: rainbowcoin\`\n**Gold Coin - __50__,__000__,__000__** __coins__\n\`id: goldcoin\`\n **Silver Coin - __15__,__000__,__000__** __coins__\n\`id: silvercoin\`\n **Bronze Coin - __5__,__000__,__000__** __coins__\n\`id: bronzecoin\`\n **Trophy - __100__,__000__,__000__** __coins__\n\`id: trophy\``
  ];
  let page = 1;


  const embed = new Discord.MessageEmbed()
    .setAuthor(`Welcome ${member.user.username} To Lelouch Shop`)
    .setColor('RANDOM')
    .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
    .setFooter(`page ${page} / ${pages.length}`)
    .setDescription(pages[page - 1])
  message.channel.send(embed).then(msg => {

    msg.react('⏪')
      .then(r => {
        msg.react('⏩')

        //Filter
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

        const backwards = msg.createReactionCollector(backwardsFilter, { time: 100000 });
        const forwards = msg.createReactionCollector(forwardsFilter, { time: 100000 });



        forwards.on('collect', r => {
          if (page === pages.length) return;
          page++;
          embed.setDescription(pages[page - 1]);
          embed.setColor('RANDOM')
          embed.setFooter(`Page ${page} / ${pages.length}`)
          msg.edit(embed)
        })

        backwards.on('collect', r => {
          if (page === 1) return;
          page--;
          embed.setColor('RANDOM')
          embed.setDescription(pages[page - 1]);
          embed.setFooter(`Page ${page} / ${pages.length}`)
          msg.edit(embed)
        })

      })
  })
}

module.exports.config = {
  name: 'shop',
  description: 'shop',
  usage: `${process.env.PREFIX} shop`,
  botPerms: [],
  userPerms: [],
  aliases: [],
  bankSpace: 2,
  cooldown: 5
}

