'use strict';

const Lesson = require('./Lesson.js');

/*
  dayInfo is an array in which
  first element is day of week name
  and rest elements are lessons of this day
 */
class DaySchedule {
  constructor(dayInfo) {
    this.dayName = dayInfo.shift().innerHTML;
    this.lessons = dayInfo.map(element => new Lesson(element));
  }

  toString() {
    let string = `${this.dayName}`;
    this.lessons.forEach(
      (lesson, i) =>
          string +=
            `\n${++i})${lesson.toString()}`
    );
    return string;
  }
}

module.exports = DaySchedule;
