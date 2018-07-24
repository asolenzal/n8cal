import axios from 'axios';

const api = axios.create();

const calendarService = {
  supportedCountries: () => api.get('https://kayaposoft.com/enrico/json/v2.0/?action=getSupportedCountries'),
  getHolidays: (fromDate, toDate, country, region) => api.get(`https://kayaposoft.com/enrico/json/v2.0/?action=getHolidaysForDateRange&fromDate=${fromDate}&toDate=${toDate}&country=${country}&region=${region}&holidayType=public_holiday`),
};

export default calendarService;
