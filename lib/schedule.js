'use strict';

const WebScraper = require('./WebScraper.js');

const url = 'http://rozklad.kpi.ua/Schedules/ScheduleGroupSelection.aspx';

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

const getPlainHTML = async (groupName) => {
  const scraper = await new WebScraper(url, additionalParameters);
  await scraper.renderDOM();
  const [form] = scraper.select(formId);
  const [input] = scraper.select(inputId);
  input.setAttribute('value', groupName);

  const response = await scraper.sendForm(form, additionalParameters);

  scraper.setUrl(response.url);
  await scraper.renderDOM();
  console.log(scraper.plainHTML);
};

getPlainHTML('іп-74');
