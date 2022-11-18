const { MessageEmbed } = require('discord.js');
module.exports = async (bot, guild) => {

  var embed = new MessageEmbed()
    .setColor("#8C00FF")
    .setDescription(`
\n
Hello, am Lelouch thank you for inviting me to your server.
To see the list of commands type \`${process.env.PREFIX} help\`
**Links** :
[\`Invite Me\`](https://discord.com/api/oauth2/authorize?client_id=1043174930205904927&permissions=2198485859191&scope=bot)
`)
  guild.systemChannel.send(embed)


  let defaultChannel = "";
  guild.channels.cache.forEach((channel) => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("EMBED_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  })
  var embed = new MessageEmbed()
    .setColor("#8C00FF")
    .setDescription(`
\n
Hello, am Lelouch thank you for inviting me to your server.
To see the list of commands type \`${process.env.PREFIX} help\`
**Links** :
[\`Invite Me\`](https://discord.com/api/oauth2/authorize?client_id=1043174930205904927&permissions=2198485859191&scope=bot)
`)
  defaultChannel.send(embed)




  await bot.dbl.postStats(bot.guilds.cache.size);
}
