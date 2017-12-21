import {h, Component} from 'preact';
import moment from 'moment';
import styled from 'styled-components';

const Wrapper = styled.div `
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 0 0 0.8em;
`;

const Title = styled.h4 `
	text-transform: capitalize;
	margin: 0;
`;

const ArrowRight = styled.div `
	border: solid #5a5a5a;
	border-width: 0 3px 3px 0;
	display: inline-block;
	padding: 4px;
	transform: rotate(-45deg);
	-webkit-transform: rotate(-45deg);
`;

const ArrowLeft = styled.div `
border: solid #5a5a5a;
border-width: 0 3px 3px 0;
display: inline-block;
padding: 4px;
transform: rotate(135deg);
	-webkit-transform: rotate(135deg);
	    margin: 0 1em;
`;

export default class Header extends Component {

  static defaultProps = {
    month: moment(),
		nextMonth: () => null,
		prevMonth: () => null
  }

  render() {
    const {month, prevMonth, nextMonth} = this.props;

    return (
      <Wrapper>
        <Title>{month.format("MMMM Y")}</Title>
				
				<div>
					<ArrowLeft onClick={prevMonth}></ArrowLeft>
	        <ArrowRight onClick={nextMonth}></ArrowRight>
				</div>
      </Wrapper>
    );
  }
}