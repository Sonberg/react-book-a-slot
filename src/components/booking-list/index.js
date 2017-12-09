import { h, Component } from 'preact';
import ReactList from 'react-list';
import styled from 'styled-components';
import _ from 'underscore';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

const Wrapper = styled.div`
    margin-right: 2em;
`;

const Item = styled.div`
    padding: 1em 0;
	border-bottom: 1px solid grey;
`;

const Title = styled.h2`

`;

const Small = styled.div`
margin: 0;
`;

class BookingList extends Component {

    static defaultProps = {
        bookings: []
    }

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    groupBookingsByDate = (arr) => _.groupBy(arr, function (b) {
        console.log(b)
        return moment().startOf('day').format();
    });

    sameDayAsPrev = (index, data) => {
        if(index == 0) {
            return false;
        }
        
        var prev = this.props.data.allBookings[index - 1];
        return moment(prev.date).startOf('day').format() == moment(data.date).startOf('day').format();

    }

    renderItem = (index, key) => {
        var data = this.props.data.allBookings[index];
        console.log(data);
        return (
                <Item key={key}>
                    {this.sameDayAsPrev(index, data) ? (null) : (<Title>{moment(data.date).calendar()}</Title>)}
                    <Small>{data.slot.start} - {data.slot.end}</Small>                
                </Item>
        );
    }

    render() {
        const {data} = this.props;
        
        if(!data.allBookings) {
            return null;
        }

        return (
            <Wrapper style={{ overflow: 'auto' }}>
                <ReactList
                    itemRenderer={this.renderItem}
                    length={this.props.data.allBookings.length}
                    type='uniform'
                />
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
    }
  }
`)(BookingList);
