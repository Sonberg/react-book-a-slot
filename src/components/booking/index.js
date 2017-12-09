import { h, Component } from 'preact';

import moment from 'moment';
import styled from 'styled-components';

import PickDate from './components/PickDate';
import PickTime from './components/PickTime';

const Wrapper = styled.div`
display: flex;
flex-direction: column;
background: white;
padding: 2em;
`;

const ButtonWrapper = styled.div`
display: flex;
justify-content: space-between;
`;

const numOfSteps = 2;

class Booking extends Component {

  static defaultProps = {
    selected: moment(),
    onSelect: () => null,
    didBook: () => null,
    bookings: [],
    timeslots: []
  }

  constructor(props) {
    super(props)

    this.state = {
      step: 0,
      selectedDate: props.selected,
      selectedTime: null
    }

    moment.locale("sv");
  }

  // Did book
  didBook = () => {
    this.next();
    this.props.didBook(this.state.selectedTime);
  }

  // Set selected timeslot
  setDate = (date) => this.setState({ selectedDate: date });

  // Set selected date
  setTime = (slot) => this.setState({ selectedTime: slot });

  // Set selected date to today
  gotoToday = () => this.setState({ selectedDate: moment() });

  // Validate state step
  validateState = (nextStep) => nextStep < 1 || nextStep > numOfSteps ? 0 : nextStep;

  // Next step
  next = () => this.setState({ step: this.validateState(this.state.step + 1) });

  // Prev step
  prev = () => this.setState({ step: this.validateState(this.state.step - 1) });

  // Render view for step
  renderState = (step, selectedDate) => {

    const { bookings, timeslots } = this.props;

    switch (step) {
      case 0:
        return (<PickDate selectedDate={selectedDate} didSelect={this.setDate} bookings={bookings} />);
      case 1:
        return (<PickTime selectedDate={selectedDate} didSelect={this.setTime} bookings={bookings} timeslots={timeslots}/>);
      case 2:
      return (<h3>Boking genomförd!</h3>);
      default:
        return null;
    }
  }

  render() {
    const { selectedDate, selectedTime, step } = this.state;

    return (
      <Wrapper>
        {this.renderState(step, selectedDate)}

        {step == 0 ? (
          <ButtonWrapper>
            <button onClick={this.gotoToday}>Idag</button>
            <button onClick={this.next}>Nästa</button>
          </ButtonWrapper>
        ) : (null)}

          {step == 1 ? (
            <ButtonWrapper>
            <button onClick={this.prev}>Föregående</button>
            <button disabled={!selectedTime} onClick={this.didBook}>Bekräfta bokning</button>
          </ButtonWrapper>
          ) : (null)}

      </Wrapper>
    );
  }
}

export default Booking;
