import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Month extends React.Component {
  static propTypes = {
    holidays: PropTypes.object.isRequired,
    weeks: PropTypes.array.isRequired,
  };

  getHoliday(date) {
    try {
      const { holidays } = this.props;
      return holidays[date.year][date.month][date.day];
    } catch (err) {
      return null;
    }
  }

  // eslint-disable-next-line
  dayToRender(index, date) {
    switch (true) {
      case date && (index === 0 || index === 6):
        return (
          <WeekendDay key={`weekend-day-${(Math.random() + 5) * index}`}>
            {date.day}
          </WeekendDay>
        );
      case date === null:
        return <NullDay key={`null-day-${(Math.random() + 5) * index}`} />;
      default:
        return (
          <RegularDay key={`reg-day-${(Math.random() + 5) * index}`}>
            {date.day}
          </RegularDay>
        );
    }
  }

  render() {
    const { weeks } = this.props;
    return weeks.map((week, outerIndex) => (
      <Row key={`week-${(Math.random() + 5) * outerIndex}`}>
        {
          week.map((date, index) => {
            const holiday = this.getHoliday(date);
            if (holiday) {
              return (
                <Holiday title={holiday.text} key={`holiday-${(Math.random() + 5) * index}`}>
                  {date.day}
                </Holiday>
              );
            }
            return this.dayToRender(index, date);
          })
        }
      </Row>
    ));
  }
}

const Row = styled.tr``;

const Day = styled.td`
  padding: 4px;
  border: 1px solid #fff;
  text-align: center;
  min-width: 30px;
`;

const NullDay = styled(Day)`
  background-color: #cccccc;
`;

const RegularDay = styled(Day)`
  background-color: #c6d49c;
`;

const WeekendDay = styled(Day)`
  background-color: #f4fa63;
`;

const Holiday = styled(Day)`
  background-color: #d68837;
  cursor: pointer;
`;

export default Month;
