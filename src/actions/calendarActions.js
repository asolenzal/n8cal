import Types from './actionCreators';
import calendarService from '../services/calendarService';
import DateCalcs from '../utils/DateCalcs';

export const generateCalendar = () => async (dispatch, getState) => {
  const formValues = getState().calendarReducer.params;

  try {
    dispatch({
      type: Types.RESET_CALENDAR,
    });

    dispatch({
      type: Types.HOLIDAYS_LOADING,
      loading: true,
    });

    const range = DateCalcs.getDateRange(
      formValues.start_date,
      formValues.num_days,
    );

    const country = getState().calendarReducer.countries
      .filter(v => v.countryCode === formValues.country)[0];

    const { data: response } = await calendarService.getHolidays(
      range.startDate.format('DD-MM-YYYY'),
      range.endDate.format('DD-MM-YYYY'),
      formValues.country,
      country.regions && country.regions.length > 0 ? country.regions[0] : null,
    );

    dispatch({
      type: Types.HOLIDAYS_LOADING,
      loading: false,
    });

    dispatch({
      type: Types.HOLIDAYS_LOADED,
      response,
    });

    dispatch({
      type: Types.HOLIDAYS_LOADING,
      loading: false,
    });

    dispatch({
      type: Types.GENERATING_CALENDAR,
      generating: true,
    });

    const calendar = DateCalcs.getCalendar(formValues.start_date, formValues.num_days);

    dispatch({
      type: Types.GENERATING_CALENDAR,
      generating: false,
    });

    dispatch({
      type: Types.SET_CALENDAR,
      calendar,
    });
  } catch (err) {
    throw err;
  }
};

export const fetchSupportedCountries = () => async (dispatch) => {
  dispatch({
    type: Types.COUNTRIES_LOADING,
    loading: true,
  });
  try {
    const { data: response } = await calendarService.supportedCountries();

    dispatch({
      type: Types.COUNTRIES_LOADED,
      response,
    });
  } catch (err) {
    throw err;
  }

  dispatch({
    type: Types.COUNTRIES_LOADING,
    loading: false,
  });
};

export const handleFieldChange = (fieldName, value) => ({
  type: Types.FIELD_CHANGE,
  fieldName,
  value,
});
