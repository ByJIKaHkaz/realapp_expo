import * as React from 'react';
import { connect } from 'react-redux';
import LinkScreen from '../screens/LinksScreen';
import _ from 'lodash';
import { fetchTickets } from '../store/tickets/actions';

import { withNavigationFocus } from 'react-navigation';

function mapStateToProps(state, ownProps) {
  const { tickets, ticketDetails } = state;
  const server = ownProps.screenProps.server
  const qrData = state.qrDatas;

  return {
    tickets,
    ticketDetails,
    server,
    qrData
  };
};

export class LinksScreenContainer extends React.Component {

  async fetch() {
    this.props.dispatch(fetchTickets(this.props.qrData, this.props.server));
  };

  async componentDidMount() {
    if (!_.isEmpty(this.props.qrData))
      this.fetch()
  }

  async componentDidUpdate(prevProps) {
    return this.props.isFocused && !_.isEmpty(this.props.qrData) ? this.fetch() : null;
  }

  render() {
    const { tickets, qrData, ticketDetails } = this.props;
    return (
      <LinkScreen
        fetchTickets={this.fetch.bind(this)}
        tickets={tickets}
        qrData={qrData}
        ticketDetails={ticketDetails}
      />
    );
  };
}

export default withNavigationFocus(connect(mapStateToProps)(LinksScreenContainer));
