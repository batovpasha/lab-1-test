'use strict';

const jsdom = require('jsdom');
const qs = require('querystring');
const fetch = require('node-fetch');

const { JSDOM } =  jsdom;

class WebScraper {
  constructor(url, options) {
    this.url = url;
    this.options = options;
  }

  async renderDOM() {
    this.dom = await JSDOM.fromURL(this.url, this.options);
    this.document = this.dom.window.document;
  }

  setUrl(_url) {
    this.url = _url;
  }

  async sendForm(form, additionalParameters) {
    const formParameters = Array.from(form.elements)
      .reduce((args, element) => {
        args[element.name] = element.value;
        return args;
      }, {});

    const allParameters = Object.assign(formParameters, additionalParameters);
    // form the parameters for the request
    const requestParemeters = qs.stringify(allParameters);

    const response = await fetch(form.action, {
      method: 'POST',
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: requestParemeters
    });

    return response;
  }

  getWeekSchedule(table) { // create week schedule as a matrix
    const tableRows = Array.from(table.childNodes);
    tableRows.pop() // remove last text element

    const weekSchedule = [];

    tableRows.forEach(row => {
      const scheduleRow = Array.from(row.childNodes);
      weekSchedule.push(scheduleRow);
    });
    // remove first and last text unnecessary elements
    weekSchedule.forEach(row => (row.shift(), row.pop()));
    return weekSchedule;
  }

  scrape() {
    let tables = this.select('tbody');
    return Array.from(
      tables,
      this.getWeekSchedule
    );
  }

  select(query) {
    return this.document.querySelectorAll(query);
  }

  get plainHTML() {
    return this.dom.serialize();
  }
}

module.exports = WebScraper;
