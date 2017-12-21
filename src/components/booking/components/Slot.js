import {h, Component} from 'preact';
import moment from 'moment';
import styled from 'styled-components';


const Wrapper = styled.div`
	margin-bottom: 1em;
	flex: 1;
	border-radius: 100px;
`;

const Title = styled.h5`
margin: 0px;
text-align: left;
padding: 0.6em 0.8em;
font-size: 1em;
font-size: 0.9em;
transition: all 0.1s;
&:hover {
	background: ${({ isSelected }) => isSelected ? '#444' : '#eee'};
}
background: ${({ isSelected }) => isSelected ? 'black' : 'white'};
color: ${({ isSelected }) => isSelected ? 'white' : 'black'};
`;


export default class Day extends Component {

  static defaultProps = {
		slot: {
			start:  moment(),
			end: moment()
		},
		selected: false,
		didSelect: () => null
  }	

  render() {
    const { slot, didSelect, isSelected } = this.props;

    return (
      <Wrapper onClick={() => didSelect(slot)}>
          <Title isSelected={isSelected}>
						{slot.start.format("HH:mm")} - {slot.end.format("HH:mm")} 
					</Title>
			</Wrapper>
    );
  }
}