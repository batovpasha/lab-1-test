'use strict';

const WebScraper = require('./WebScraper.js');
const Lesson = require('./Lesson.js');
const DaySchedule = require('./DaySchedule.js');

const URL = 'http://rozklad.kpi.ua/Schedules/ScheduleGroupSelection.aspx';

const formId = '#aspnetForm';
const inputId = '#ctl00_MainContent_ctl00_txtboxGroup';

const additionalParameters = {
  ctl00_ToolkitScriptManager_HiddenField:
    ';;AjaxControlToolkit, ' +
    'Version=3.5.60623.0, Culture=neutral, ' +
    'PublicKeyToken=28f01b0e84b6d53e::834c499a-b613-' +
    '438c-a778-d32ab4976134:22eca927:ce87be9:2d27a0fe:23389d96:' +
    '77aedcab:1bd6c8d4:7b704157',
};

const createTransposedWeekSchedule = (weekSchedule) => {
  const transposedWeekSchedule = [];

  for (let i = 0; i < weekSchedule[0].length; i++) {
    const row = [];
    for (let j = 0; j < weekSchedule.length; j++) {
      row.push(weekSchedule[j][i]);
    }
    transposedWeekSchedule.push(row);
  }

  return transposedWeekSchedule;
};

const createWeekSchedules = (tables) => {
  const transposedWeekTables = tables.map(createTransposedWeekSchedule);

  let [firstWeek, secondWeek] = transposedWeekTables;
  firstWeek.shift();

  const schedule = firstWeek.map(day => new DaySchedule(day));

  console.log(schedule[1].toString());
};

const scrapeTablesFromDOM = async (groupName) => {
  const scraper = await new WebScraper(URL, additionalParameters);
  await scraper.renderDOM();

  const [form] = scraper.select(formId);
  const [input] = scraper.select(inputId);
  input.setAttribute('value', groupName);

  const response = await scraper.sendForm(form, additionalParameters);

  scraper.setUrl(response.url);
  await scraper.renderDOM();

  let tables = scraper.scrape();
  return tables;
};

const prepocessing = async (groupName) => {
  let tables = await scrapeTablesFromDOM(groupName);

  createWeekSchedules(tables);

};

prepocessing('іп-71');
