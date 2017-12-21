import {h, Component} from 'preact';
import moment from 'moment';
import styled from 'styled-components';

import Header from './Pick.Date.Header';
import Day from './Day';

const Wrapper = styled.div `
	flex: 1,auto;
	margin-bottom: 1em;
`;

const Calendar = styled.div `
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-auto-rows:58px;
	grid-gap: 5px;
`;

const CalendarHeaderDay = styled.th `
	padding: 1em 0;
	text-transform: capitalize;
	font-weight: bold;
	font-size: 0.7em;
`;

export default class PickDate extends Component {

  static defaultProps = {
    selectedDate: moment(),
    bookings: [],
    didSelect: () => null,
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedDate: props.selectedDate,
      month: props.selectedDate.clone()
    }

    moment.locale("sv");
  }
	
	componentWillReceiveProps = (props) => this.setState({month: props.selectedDate.clone(), selectedDate: props.selectedDate});

  nextMonth = () => {
    this.setState({
      month: this.state.month.clone().add(1, 'months')
    });
  }

  prevMonth = () => {
    this.setState({
      month: this.state.month.clone().subtract(1, 'months')
    });
  }

  setDate = (selectedDate) => {
    this.setState({selectedDate, month: selectedDate});
    this.props.didSelect(selectedDate);
  }

  getMonth = (month) => {
    var weeks = [],
      done = false,
      date = month.startOf("month").add("w" - 1).day("Monday"),
      monthIndex = date.month(),
      count = 0;

    while (!done) {
      weeks.push(date.clone());
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
    return weeks;
  };

  getWeek = (week) => {
    var days = [],
      weekDay = moment(week);
    for (var i = 0; i < 7; i++) {
      var day = {
        name: weekDay.format("dddd"),
        number: weekDay.format("D"),
        isCurrentMonth: weekDay.month() === this.state.month.month(),
        isToday: weekDay.format("DD-MM-YYYY") == moment().format("DD-MM-YYYY"),
        isSelected: weekDay.format("DD-MM-YYYY") == this.state.selectedDate.format("DD-MM-YYYY"),
        date: weekDay.clone()
      };

      days.push(day);
      weekDay.add(1, "d");
    }
    return days;
  };


  haveAvailableSlots = (booking, slots) => true;

  renderHeader = (day) => (<CalendarHeaderDay>{day}</CalendarHeaderDay>);
  renderWeek = (week) => (<tr>{this.getWeek(week).map(this.renderDay)}</tr>);
  renderDay = (day) => (<Day day={day} didSelect={this.setDate}/>);

  render() {
    const { month} = this.state;

    return (
      <Wrapper>
        <Header month={month} nextMonth={this.nextMonth} prevMonth={this.prevMonth}/>
        <table style="width:100%">
          <thead>
            <tr>
              {moment.weekdaysShort(true).map(this.renderHeader)}
            </tr>
          </thead>
          <tbody>
            {this.getMonth(month.clone()).map(this.renderWeek)}
          </tbody>
        </table>
      </Wrapper>
    );
  }
}