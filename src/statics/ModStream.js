import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getIsAuthenticated,
    getAuthenticatedUser,
  } from '../reducers';
import { getModerators } from '../actions/moderators';
import { getUser } from '../actions/user';
import { moderatorAction } from '../actions/contribution';
import Action from '../components/Button/Action';
import * as R from 'ramda';
import './ModStream.less';

@connect(
    state => ({
      authenticated: getIsAuthenticated(state),
      authenticatedUser: getAuthenticatedUser(state),
      moderators: state.moderators,
    }),
    { getUser, getModerators },
)
class ModStream extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    authenticatedUser: PropTypes.shape().isRequired,
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      stream: [],
    };
  }

  componentWillMount() {
    const { authenticatedUser, getModerators } = this.props;
    getModerators();
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { moderators, authenticatedUser, getUser } = this.props;
    const statusWord = (contrib) => {
        if (!contrib.flagged && !contrib.reviewed && !contrib.pending) {
            return <span class="status-unreviewed">Unreviewed</span>;
        }
        if (contrib.flagged) {
            <span class="status-flagged">Flagged</span>;
        }
        if (contrib.pending) {
            <span class="status-pending">Pending</span>;
        }
        if (contrib.reviewed) {
            <span class="status-accepted">Accepted</span>;
        }
    }

    return (
      <div className="ModStream">
        <center><br/><h1 className="title">Moderation Stream</h1>
        <table>
        <tr>
            <th id="th-contribution">Contribution</th>
            <th id="th-author">Author</th>
            <th id="th-moderator">Moderator</th>
            <th id="th-status">Status</th>
        </tr>
        {this.state.stream.map(contrib => {
              return (
                <tr>
                    <td>{contrib.title}</td>
                    <td>@{contrib.author}</td>
                    <td>{contrib.moderator}</td>
                    <td>{statusWord(contrib)}</td>
                </tr>
              )
            })}
        </table>
        </center>
      </div>    
    );
  }
}

export default ModStream;
