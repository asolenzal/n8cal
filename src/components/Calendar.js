import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Month from './Month';

class Calendar extends React.Component {
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  render() {
    const { dates, holidays } = this.props;
    return (
      <div className="row">
        {Object.keys(dates).map((month, index) => (
          <div key={`month-${index * Math.random()}`} className="col-12 col-md-6 col-lg-4 col-xl-2 mb-5">
            <table>
              <tbody>
                <tr>
                  {this.weekDays.map(dayName => (
                    <DayName key={`dayName-${Math.random()}`}>
                      {dayName}
                    </DayName>
                  ))}
                </tr>
                <tr>
                  <MonthName colSpan="7" className="month-name">
                    {month}
                  </MonthName>
                </tr>
                <Month key={`weeks-${index * (Math.random() + 5)}`} weeks={dates[month]} holidays={holidays} />
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  }
}

Calendar.propTypes = {
  holidays: PropTypes.object.isRequired,
  dates: PropTypes.any.isRequired,
};

const MonthName = styled.td`
  text-align: center;
  background-color: #e7eed0;
`;

const DayName = styled.td`
  text-align: center;
  background-color: #fefffe;
`;

export default Calendar;
