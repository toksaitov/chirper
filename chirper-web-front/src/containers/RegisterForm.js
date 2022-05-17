import { connect } from 'react-redux';

import { registerUser } from '../actions/user.js';
import { clearError } from '../actions/error.js';

import RegisterForm from '../components/RegisterForm.js';

const mapStateToProps = state => ({
    'user': state.user
});

const mapDispatchToProps = dispatch => ({
    'registerUser': (login, password, passwordRepeat) => dispatch(registerUser(login, password, passwordRepeat)),
    'clearError': () => dispatch(clearError())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterForm);
