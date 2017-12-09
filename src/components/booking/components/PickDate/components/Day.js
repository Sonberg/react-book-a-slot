import {h, Component} from 'preact';
import moment from 'moment';
import styled from 'styled-components';


const Wrapper = styled.td`
	padding: 0.6em 0.4em;
	border-radius: 8px;
	background-color: ${({ isToday }) => isToday ? '#ddd' : 'none'};
	background-color: ${({ isSelected }) => isSelected ? 'black' : 'none'};
	&:hover {
		background-color: ${({ isSelected }) => isSelected ? 'black' : '#ededed'};
	}
`;

const Title = styled.h5`
	margin: 0px;
	text-align: center;
	color: ${({ isCurrentMonth, isSelected }) => {
			if (!isCurrentMonth) {
				return "grey";
			}
			
			return isSelected ? 'white' : 'inherit';
			
		}};
`;



export default class Day extends Component {

  static defaultProps = {
		day: {
			date: moment()
		},
		didSelect: () => null
  }	

  render() {
    const { day, didSelect } = this.props;
		
    return (
      <Wrapper onClick={() => didSelect(day.date)} isSelected={day.isSelected} isToday={day.isToday}>
          <Title isCurrentMonth={day.isCurrentMonth} isSelected={day.isSelected}>
						{day.date.format("D")}
					</Title>
			</Wrapper>
    );
  }
}