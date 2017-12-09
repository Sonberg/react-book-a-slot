import { h, Component } from 'preact';
import Booking from '../../components/booking/index.js';
import BookingList from '../../components/booking-list/index.js';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const Wrapper = styled.div `
min-height: 100%;
width: 100%;
max-width: 900px;
margin: 3em auto 0;
display: flex;
`;

const Main = styled.div `
flex: 3;
`;
const Sidebar = styled.div `
flex: 2;
`;


class Home extends Component {

	didBook = () => null;

	render() {
		console.log(this);
		return (
			<Wrapper>
				<Main>
					<h2>Dina pass</h2>
					<BookingList/>
				</Main>
				<Sidebar>
					<h2>Boka</h2>
					<Booking didBook={this.didBook} bookings={this.props.data.allBookings} timeslots={this.props.data.allSlots}/>
				</Sidebar>
			</Wrapper>
		);
	}
}


export default graphql(gql`
	query BookingQuery {
	    allBookings {
	      id,
		  date,
		  bookingType,
	      createdAt,
	      slot {
	        start,
	        end
	      }
		},
		allSlots {
			id,
			start,
			end
		  }
	  }
`)(Home);


//export default Home;