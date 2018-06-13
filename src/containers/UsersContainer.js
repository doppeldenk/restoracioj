import { connect } from 'react-redux';

import Users from '../components/Users';

import { fetchUsers } from '../actions/users';

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
