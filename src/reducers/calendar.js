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
      const holidays = {};
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
      const { params } = state;
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
