import React from 'react';
import PropTypes from 'prop-types';

const UserRow = (props) => {
  const { user } = props;
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
      <td>{user.gender}</td>
    </tr>
  );
};

UserRow.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserRow;
