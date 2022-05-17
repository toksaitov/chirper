import { connect } from 'react-redux';

import { logoutUser } from '../actions/user.js';
import { clearError } from '../actions/error.js';

import UserToolbar from '../components/UserToolbar.js';

const mapStateToProps = state => ({
    'user': state.user
});

const mapDispatchToPros = dispatch => ({
    'logoutUser': () => dispatch(logoutUser()),
    'clearError': () => dispatch(clearError())
});

export default connect(
    mapStateToProps,
    mapDispatchToPros
)(UserToolbar);
