import {h, Component} from 'preact';
import moment from 'moment';
import styled from 'styled-components';
import Switch from 'react-ios-switch';

const Wrapper = styled.div `
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 0.6em 0 0.6em;
`;

const Title = styled.h4 `
`;

const Sub = styled.h1 `
text-transform: capitalize;
margin: 0 0 0.6em;
font-weight: 100;
color: #5f5f5f;
`;

export default class Header extends Component {

  static defaultProps = {
    selectedDate: moment()
  }

  constructor(props) {
    super(props)

    this.state = {
      withTrainer: false
    }

    moment.locale("sv");
  }

  setType = (withTrainer) => this.setState({withTrainer});

  render() {
    const {selectedDate} = this.props;
    return (
      <div>
        <Sub>{selectedDate.format("dddd")}, {selectedDate.format("D/M")}</Sub>
      </div>
    );
  }
}

/*
<Wrapper>
	<Title>Med personligtränare</Title>
	<Switch checked={this.state.withTrainer} onChange={this.setType}/>
</Wrapper>
 */