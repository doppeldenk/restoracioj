import React from 'react';
import PropTypes from 'prop-types';

import UserRow from './UserRow';

const tableHeaders = [
  { name: 'id', label: 'ID' },
  { name: 'first_name', label: 'First name' },
  { name: 'last_name', label: 'Last name' },
  { name: 'email', label: 'Email' },
  { name: 'gender', label: 'Gender' },
];

class UsersTable extends React.Component {
  constructor(props) {
    super(props);

    const { users } = props;

    this.state = { users };

    this.sort = this.sort.bind(this);
  }

  componentWillReceiveProps(props) {
    const { users } = props;
    this.setState({ users });
  }

  sort(field) {
    const { users } = this.state;
    users.sort((a, b) => (a[field] < b[field] ? -1 : 1));
    this.setState({ users });
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        {
          !!users.length &&
          <table border={1} cellPadding={10}>
            <thead>
              <tr>
                {
                  tableHeaders.map(header => (
                    <th key={header.name} onClick={() => this.sort(header.name)}>{header.label}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                !!users.length &&
                users.map(user => (
                  <UserRow key={user.id} user={user} />
                ))
              }
            </tbody>
          </table>
        }
      </div>
    );
  }
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UsersTable;
