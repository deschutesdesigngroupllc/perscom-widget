import { Frequency, RRule } from 'rrule';
import { DateHelper } from './date';

export class RRuleHelper {
  /**
   * @param {object} event
   * @param {string} timezone
   */
  constructor(event, timezone = 'UTC') {
    this.event = event;
    this.timezone = timezone || 'UTC';
  }

  /**
   * @returns {boolean}
   */
  canGenerateRRule() {
    return !(!this.event || !this.event.schedule);
  }

  /**
   *
   * @returns {RRule|null}
   */
  getRRule() {
    if (!this.canGenerateRRule()) {
      return null;
    }

    const startDate = new DateHelper(this.event.schedule.start, this.timezone);

    let options = {
      freq: Frequency[this.event.schedule.frequency],
      interval: this.event.schedule.interval,
      dtstart: startDate.toDate(),
      tzid: 'UTC'
    };

    if (this.event.schedule.frequency === 'WEEKLY' && this.event.schedule.by_day) {
      options.byweekday = Array.from(this.event.schedule.by_day).map((day) => RRule[day]);
    }

    if (this.event.schedule.frequency === 'MONTHLY' && this.event.schedule.by_month_day) {
      options.bymonthday = Array.from(this.event.schedule.by_month_day).map((day) => Number(day));
    }

    if (this.event.schedule.frequency === 'YEARLY' && this.event.schedule.by_month) {
      options.bymonth = Array.from(this.event.schedule.by_month).map((month) => Number(month));
    }

    if (this.event.schedule.end_type) {
      switch (this.event.schedule.end_type) {
        case 'after':
          options.count = this.event.schedule.count ?? 1;
          break;

        case 'on':
          const untilDate = new DateHelper(this.event.schedule.until, this.timezone);
          options.until = untilDate.toDate();
          break;
      }
    }

    return new RRule(options);
  }
}
