import { h, Component } from 'preact';
import moment from 'moment';
import styled from 'styled-components';


const Wrapper = styled.button`
	border: 1px solid #000;
	padding: 0.7em 1.6em;
	border-radius: 20px;
	outline: none;
	&:hover {
		background-color: #000;
		color: white;
	}
`;


const Title = styled.h4`
	margin: 0px;
	text-align: center;
`;



export default class Button extends Component {

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