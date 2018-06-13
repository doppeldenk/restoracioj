import React from 'react';
import PropTypes from 'prop-types';

import UsersTable from './UsersTable';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: 'foo' };
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const { fetchUsers, users: { payload } } = this.props;
    if (!payload.length) fetchUsers();
  }

  render() {
    const {
      users: {
        error, payload,
      },
    } = this.props;
    return (
      <div>
        {this.state.name}
        <h1>Users</h1>
        { error && 'There was an error' }
        <UsersTable update={this.update} users={payload} />
      </div>
    );
  }
}

Users.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

export default Users;
