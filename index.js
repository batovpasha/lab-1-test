'use strict';

const Bot = require('./lib/TelegramBot.js');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const options = {
  webHook: {
    port: process.env.PORT
  }
};

const PORT = 443;
const URL = `https://batov-schedule.herokuapp.com:${PORT}`;

const telegramBot = new Bot(TOKEN, options);

telegramBot.setWebHook(`${URL}/bot${TOKEN}`);

telegramBot.onText(/\/setgroup (.*)/, async (msg, match) => {
  const groupName = match[1];

  await telegramBot.schedule.setGroup(groupName);
  telegramBot.sendMessage(msg.chat.id, 'Hmmm, new group? OK!');
});

telegramBot.onText(/\/today(.*)/, async (msg) => {
  const todaySchedule = telegramBot.schedule.today.toString();
  telegramBot.sendMessage(msg.chat.id, todaySchedule);
});

telegramBot.onText(/\/tomorrow(.*)/, async (msg) => {
  const tomorrowSchedule = telegramBot.schedule.tomorrow.toString();
  telegramBot.sendMessage(msg.chat.id, tomorrowSchedule);
});

telegramBot.onText(/\/currentweek(.*)/, async (msg) => {
  const currentWeekSchedule = telegramBot.schedule.currentWeek
    .reduce((acc, day) => acc += day , '');

  telegramBot.sendMessage(msg.chat.id, currentWeekSchedule);
});

telegramBot.onText(/\/nextweek(.*)/, async (msg) => {
  const nextWeekSchedule = telegramBot.schedule.nextWeek
    .reduce((acc, day) => acc += day , '');

  telegramBot.sendMessage(msg.chat.id, nextWeekSchedule);
});
