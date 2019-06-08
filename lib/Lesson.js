'use strict';

class Lesson {
  constructor(element) { // td html element with lesson info
    this.element = element;

    this.lessonInfo = Array.from(
      this.element.querySelectorAll('a')
    ).map(childElement =>
      childElement.hasAttribute('title') ?
      childElement.getAttribute('title') :
      childElement.innerHTML
    );

    this.name = this.lessonInfo.shift();
    this.location = this.lessonInfo.pop();
    this.teachers = this.lessonInfo.slice();
  }

  toString() {
    if (!this.element.hasChildNodes())
      return '';

     return `\n${this.name}\n` +
            `${this.teachers.join('\n')}\n` +
            `${this.location}\n`;
  }

  get isToday() {
    return this.element.className === 'day_backlight';
  }
}

module.exports = Lesson;
