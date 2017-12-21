import {h, Component} from 'preact';
import moment from 'moment';
import styled from 'styled-components';

import Slot from './Slot';
import Header from './Pick.Time.Header';

const Wrapper = styled.div `
flex: 1;
flex-direction: column;
`;

class PickTime extends Component {

  static defaultProps = {
    selectedDate: moment(),
    selectedTime: {},
    timeslots: [],
    didSelect: () => null
  }
  
  constructor(props) {
    super(props)

    this.state = {
      selectedTime: props.selectedTime
    }
  }
  
  getSlots = (selectedDate, slots) => {
    selectedDate = moment(selectedDate);
    var data = [];
    
    for (var i = 0; i < slots.length; i++) {
      var start = slots[i].start.split(":");
      var end = slots[i].end.split(":");
      
      if (start.length == 2 && end.length == 2) {
        data.push({
          id: slots[i].id,
          start: selectedDate.clone().hour(start[0]).minute(start[1]),
          end: selectedDate.clone().hour(end[0]).minute(end[1])
        });
      }
    }
    return data;
  };
  
  setSelectedTime = (selectedTime) => {
    this.setState({selectedTime}); 
    this.props.didSelect(selectedTime);
  };
  
  renderSlot = (slot) => (<Slot slot={slot} isSelected={slot.id== this.state.selectedTime.id} didSelect={this.setSelectedTime}/>);

  render() {    
    const {selectedDate, timeslots} = this.props;
    
    return (
      <Wrapper>
        <Header selectedDate={this.props.selectedDate}/>
        {this.getSlots(selectedDate, timeslots || []).map(this.renderSlot)}
      </Wrapper>
    );
  }
}

export default PickTime;