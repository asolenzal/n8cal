import moment from 'moment';
import _ from 'lodash';

export default class DateCalcs {
  static getCalendar(_startDate, daysCount) {
    const startDate = moment(new Date(_startDate));
    // get start date week day
    const startDateWeekDay = startDate.format('d');
    const lastDate = moment(startDate).add(daysCount, 'days');

    const calendar = {};

    // Initial date setup
    const initialMonth = startDate.format('MMMM, YYYY');
    calendar[initialMonth] = new Array(parseInt(startDateWeekDay, 10));
    calendar[initialMonth].fill(null);

    while (!startDate.isAfter(lastDate)) {
      const month = startDate.format('MMMM, YYYY');
      if (!calendar[month]) {
        // it's the first day of the month, so a new entry will be created
        calendar[month] = new Array(parseInt(startDate.format('d'), 10));
        calendar[month].fill(null);
      }
      calendar[month].push({
        day: startDate.format('DD'),
        month: startDate.format('MM'),
        year: startDate.format('YYYY'),
      });
      startDate.add(1, 'days');
    }

    // one pass into calendar to split days arrays into weeks
    Object.keys(calendar).forEach((month) => {
      // To ad null days to the end of the weeks if needed
      const chunk = _.chunk(calendar[month], 7);
      const initialLength = chunk[chunk.length - 1].length;
      const toAdd = 7 - initialLength;
      if (initialLength < 7) {
        // eslint-disable-next-line
        for (let i = 0; i < toAdd; i++) {
          chunk[chunk.length - 1].push(null);
        }
      }
      calendar[month] = chunk;
    });

    return calendar;
  }

  static getDateRange(_startDate, daysCount) {
    const startDate = moment(_startDate);
    const endDate = moment(startDate).add(daysCount, 'days');
    return {
      startDate,
      endDate,
    };
  }
}
