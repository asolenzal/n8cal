import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Calendar from '../components/Calendar';
import * as Actions from '../actions/calendarActions';

class CalendarContainer extends React.Component {
  static propTypes = {
    calendarReducer: PropTypes.object.isRequired,
  };

  componentWillUpdate() {
  }

  renderMessages() {
    const {
      calendarReducer: { loadingCountries, loadingHolidays, generatingCalendar },
    } = this.props;
    switch (true) {
      case loadingCountries:
        return (
          <Subtitle>
            Fetching countries...
          </Subtitle>
        );
      case loadingHolidays:
        return (
          <Subtitle>
            Fetching Holidays...
          </Subtitle>
        );
      case generatingCalendar:
        return (
          <Subtitle>
            Generating Calendar...
          </Subtitle>
        );
      default:
        return null;
    }
  }

  render() {
    const { calendarReducer } = this.props;
    return (
      <React.Fragment>
        <Title>
            Number 8 Calendar
        </Title>
        <div className="mb-5">
          {this.renderMessages()}
        </div>
        <Calendar holidays={calendarReducer.holidays} dates={calendarReducer.calendar} />
      </React.Fragment>
    );
  }
}

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  margin: 0px;
`;

const Subtitle = styled.div`
  text-align: center;
`;

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps, Actions)(CalendarContainer);
