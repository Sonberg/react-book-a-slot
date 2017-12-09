import {h, Component} from 'preact';
import moment from 'moment';
import styled from 'styled-components';


const Wrapper = styled.button`
	padding: 0.8em 0.4em;
	border-radius: 8px;
	background: #ededed;
	&:hover {
		background-color: '#ebebeb';
	}
`;

const Title = styled.h4`
	margin: 0px;
	text-align: center;
`;



export default class Day extends Component {

  static defaultProps = {
		children: "",
		onClick: () => null
  }	

  render() {
    const { children, onClick } = this.props;
		
    return (
      <Wrapper onClick={onClick}>
          <Title>
						 {children}
					</Title>
			</Wrapper>
    );
  }
}