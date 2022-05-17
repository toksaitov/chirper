import { connect } from 'react-redux';

import { loginUser } from '../actions/user.js';
import { clearError } from '../actions/error.js';

import LoginForm from '../components/LoginForm.js';

const mapStateToProps = state => ({
    'user': state.user
});

const mapDispatchToProps = dispatch => ({
    'loginUser': (login, password) => dispatch(loginUser(login, password)),
    'clearError': () => dispatch(clearError())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
