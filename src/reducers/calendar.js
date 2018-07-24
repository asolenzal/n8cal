import Types from '../actions/actionCreators';

const INITIAL_STATE = {
  loadingCountries: false,
  loadingHolidays: false,
  generatingCalendar: false,
  countries: [],
  holidays: [],
  calendar: {},
  params: {
    num_days: null,
    start_date: null,
    country: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.COUNTRIES_LOADING: {
      const { loading } = action;
      return {
        ...state,
        loadingCountries: loading,
      };
    }
    case Types.COUNTRIES_LOADED: {
      const countries = action.response;
      return {
        ...state,
        countries,
      };
    }
    case Types.HOLIDAYS_LOADING: {
      const { loading } = action;
      return {
        ...state,
        loadingHolidays: loading,
      };
    }
    case Types.HOLIDAYS_LOADED: {
      const { response } = action;

      // Convert holidays to an object using date elements as keys in order to optimize searching
      const holidays = {};

      response.forEach((holiday) => {
        holiday.date.month = holiday.date.month.toString().padStart(2, '0');
        holiday.date.day = holiday.date.day.toString().padStart(2, '0');

        if (!holidays[holiday.date.year]) {
          holidays[holiday.date.year] = {};
        }
        if (!holidays[holiday.date.year][holiday.date.month]) {
          holidays[holiday.date.year][holiday.date.month] = {};
        }
        if (!holidays[holiday.date.year][holiday.date.month][holiday.date.day]) {
          holidays[holiday.date.year][holiday.date.month][holiday.date.day] = '';
        }
        // eslint-disable-next-line
        holidays[holiday.date.year][holiday.date.month][holiday.date.day] = holiday.name[0];
      });

      return {
        ...state,
        holidays,
      };
    }

    case Types.SET_CALENDAR: {
      const { calendar } = action;
      return {
        ...state,
        calendar,
      };
    }

    case Types.GENERATING_CALENDAR: {
      const { generating } = action;
      return {
        ...state,
        generatingCalendar: generating,
      };
    }

    case Types.FIELD_CHANGE: {
      const { fieldName, value } = action;

      const params = { state };
      params[fieldName] = value;

      return {
        ...state,
        params,
      };
    }

    case Types.RESET_CALENDAR: {
      return {
        ...state,
        calendar: [],
      };
    }

    default:
      return state;
  }
};
