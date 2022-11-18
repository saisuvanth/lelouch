require('dotenv').config();
const { Client } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../models/UserModel');
const ItemManager = require('./ItemManager');

class BotClient extends Client {
    constructor() {
        super();
        mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        this.User = User;
        this.items = new ItemManager();
        this.commandsUsed = 1;
    }

    async fetchUser(userId) {
        const someone = this.users.cache.get(userId);
        if (!someone || someone.bot) return false;
        const user = await User.findOne({ userId: userId });
        if (!user) {
            const newUser = new User({
                userId: userId,
                items: []
            });
            newUser.save();
            return newUser;
        }
        return user;
    }

    async giveBankSpace(userId, amount) {
        const someone = this.users.cache.get(userId);
        if (!someone || someone.bot) return false;
        let user = await User.findOne({ userId: userId });
        if (!user) {
            const newUser = new User({
                userId: userId,
                items: []
            });
            newUser.save();
            return newUser;
        }
        user.bankSpace += parseInt(amount);
        await user.save();
        return user;
    }

    async createUser(userId) {
        const someone = this.users.cache.get(userId);
        if (!someone || someone.bot) return false;
        const user = await User.findOne({ userId: userId });
        if (!user) return false;
        const newUser = new User({
            userId: userId,
            items: []
        });
        newUser.save();
        return newUser;
    }

    async addTwitter(userId, twitter) {
        const someone = this.users.cache.get(userId);
        if (!someone || someone.bot) return false;
        const user = await User.findOneAndUpdate({ userId }, { twitter });
        return true;
    }

    async giveCoins(userId, amount) {
        const someone = this.users.cache.get(userId);
        if (someone && someone.bot) return false;
        let user = await User.findOne({ userId: userId });
        if (!user) {
            const newUser = new User({
                userId: userId,
                items: [],
                coinsInWallet: parseInt(amount)
            });
            newUser.save();
            return newUser;
        }
        user.coinsInWallet += parseInt(amount);
        await user.save();
        return user;
    }

}

module.exports = BotClient;
