import dayjs from 'dayjs';
import relative from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relative);
dayjs.tz.setDefault('UTC');

export class DateHelper {
  /**
   * @param date
   * @param timezone
   */
  constructor(date = null, timezone = 'UTC') {
    this.date = this._parseDate(date);
    this.timezone = timezone || 'UTC';

    if (!this._validTimezone(this.timezone)) {
      throw new Error('The timezone you provided is not valid.');
    }
  }

  /**
   * @param dateInput
   * @returns {dayjs.Dayjs}
   * @private
   */
  _parseDate(dateInput) {
    if (dateInput instanceof Date) {
      return dayjs(dateInput).utc();
    } else if (typeof dateInput === 'string') {
      return dayjs.utc(dateInput);
    } else {
      return dayjs.utc();
    }
  }

  /**
   * @param timezone
   * @returns {boolean}
   * @private
   */
  _validTimezone(timezone) {
    if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
      throw new Error('Time zones are not available in this environment.');
    }

    try {
      Intl.DateTimeFormat(undefined, { timeZone: timezone });
      return true;
    } catch (ex) {
      return false;
    }
  }

  /**
   *
   * @param formatString
   * @returns {*}
   */
  format(formatString = 'YYYY-MM-DD HH:mm:ss') {
    return this.getDate().format(formatString);
  }

  /**
   * @returns {Date}
   */
  toDate() {
    return this.getDate().toDate();
  }

  /**
   * @param attribute
   * @param text
   * @returns {JSX.Element}
   */
  toHtml(attribute = 'YYYY-MM-DD', text = 'dddd, MMM D, YYYY') {
    return <time dateTime={this.format(attribute)}>{this.format(text)}</time>;
  }

  /**
   * @returns {dayjs.Dayjs}
   */
  getDate() {
    return this.date.tz(this.timezone);
  }

  /**
   * @param from
   * @returns {dayjs.Dayjs}
   * */
  diffFrom(from) {
    return this.getDate().from(from, true);
  }

  /**
   * @param to
   * @returns {dayjs.Dayjs}
   * */
  diffTo(to) {
    return this.getDate().to(to);
  }
}
