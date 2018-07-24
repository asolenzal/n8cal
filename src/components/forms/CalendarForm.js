import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { DatePicker, TextField, AutoComplete } from 'material-ui';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';
import PropTypes from 'prop-types';
import * as Actions from '../../actions/calendarActions';

class CalendarForm extends React.Component {
  static propTypes = {
    fetchSupportedCountries: PropTypes.func.isRequired,
    generateCalendar: PropTypes.func.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    countries: PropTypes.array.isRequired,
    globalError: PropTypes.string,
  }

  static defaultProps = {
    globalError: null,
  }

  state = {
    formErrors: {},
  };

  componentWillMount() {
    const { fetchSupportedCountries } = this.props;
    fetchSupportedCountries();
  }

  handleSubmit = () => {
    const { generateCalendar } = this.props;
    generateCalendar();
  }

  handleFieldChange = (fieldName, value) => {
    const { params, handleFieldChange } = this.props;
    handleFieldChange(fieldName, value);
    this.validate(params);
  }

  validate = (values) => {
    const errors = {};

    if (!values.start_date) {
      errors.start_date = 'This field is required';
    }

    if (!values.num_days) {
      errors.num_days = 'This field is required';
    }

    if (!errors.num_days
      && (!validator.isNumeric(values.num_days) || !validator.isInt(values.num_days))) {
      errors.num_days = 'This field should be an integer number';
    }

    if (!values.country) {
      errors.country = 'This field is required';
    }

    this.setState({
      formErrors: errors,
    });
  }

  render = () => {
    const { formErrors } = this.state;
    const { countries, globalError, params } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <DatePicker
              errorText={formErrors.start_date}
              formatDate={date => moment(date).format('MM/DD/YYYY')}
              fullWidth
              floatingLabelText="Select a date"
              onChange={(e, date) => { this.handleFieldChange('start_date', date); }}
              disabled={globalError !== ''}
            />
          </div>
          <div className="col-12">
            <TextField
              errorText={formErrors.num_days}
              type="number"
              fullWidth
              floatingLabelText="Set the days"
              onChange={(e, value) => { this.handleFieldChange('num_days', value); }}
              disabled={globalError !== ''}
            />
          </div>
          <div className="col-12">
            <AutoComplete
              filter={AutoComplete.fuzzyFilter}
              errorText={formErrors.country}
              fullWidth
              floatingLabelText="Type a country name"
              dataSource={countries.map(v => ({ text: v.fullName, value: v.countryCode }))}
              dataSourceConfig={{ value: 'value', text: 'text' }}
              onNewRequest={(chosenRequest, index) => { this.handleFieldChange('country', index !== -1 ? countries[index].countryCode : null); }}
              disabled={globalError !== ''}
            />
          </div>
          <div className="col-12 mt-5">
            <RaisedButton
              label="Generate"
              type="button"
              fullWidth
              disabled={!(params.start_date && params.num_days && params.country) || globalError !== ''}
              primary
              onClick={() => { this.handleSubmit(); }}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ calendarReducer }) {
  return {
    countries: calendarReducer.countries,
    params: calendarReducer.params,
    globalError: calendarReducer.globalError,
  };
}

export default connect(mapStateToProps, Actions)(CalendarForm);
