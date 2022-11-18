require('dotenv').config();
const { Collection } = require('discord.js');
const BotClient = require('./utils/Bot');
const bot = new BotClient({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'] }, fetchAllMembers: false });

bot.login(process.env.TOKEN);

bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();

require('./utils/handlers/command')(bot);
require('./utils/handlers/event')(bot);
