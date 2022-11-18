module.exports = async bot => {
    bot.user.setActivity(`${bot.guilds.cache.size.toLocaleString()} Servers | ${process.env.PREFIX} help`, { type: 'WATCHING' });
    console.log(`${bot.user.tag} is online. ${bot.guilds.cache.size.toLocaleString()} Users amount: ${bot.users.cache.size}`);
}
