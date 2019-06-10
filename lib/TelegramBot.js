'use strict';

const TelegramBot = require('node-telegram-bot-api');
const GroupSchedule = require('./GroupSchedule.js');

class Bot {
  constructor(token, options) {
    this.bot = new TelegramBot(token, options);
    this.schedule = new GroupSchedule();
  }

  onText(regexp, fn) {
    this.bot.onText(regexp, fn);
  }

  sendMessage(chatId, message) {
    this.bot.sendMessage(chatId, message);
  }

  get groupSchedule() {
    return this.schedule;
  }

  setWebHook(url) {
    this.bot.setWebHook(url);
  }
}

module.exports = Bot;
