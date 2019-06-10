'use strict';

const createSchedule = require('./schedule.js');

class GroupSchedule {
  get today() {
    return this.firstWeek.find(day =>
        day.getLessons().some(lesson => lesson.isToday)
      ) ||
      this.secondWeek.find(day =>
        day.getLessons().some(lesson => lesson.isToday)
      );
  }

  get tomorrow() {
    const todaysIndex = this.currentWeek.findIndex(day => day === this.today);
    return todaysIndex > (this.currentWeek.length - 1) ?
           this.currentWeek[0] :
           this.currentWeek[todaysIndex + 1];
  }

  get currentWeek() {
    return [this.firstWeek, this.secondWeek]
      .find(week =>
        week.find(day =>
          day.getLessons().some(lesson => lesson.isToday)
        )
      );
  }

  get nextWeek() {
    return this.firstWeek === this.currentWeek ?
           this.secondWeek :
           this.firstWeek;
  }

  async setGroup(groupName) {
    const weeks = await createSchedule(groupName);
    this.firstWeek = weeks.firstWeek;
    this.secondWeek = weeks.secondWeek;
  }
}

module.exports = GroupSchedule;
