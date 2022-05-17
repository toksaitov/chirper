import { connect } from 'react-redux';

import { loadMessages } from '../actions/messages.js';
import { clearError } from '../actions/error.js';

import Messages from '../components/Messages.js';

const mapStateToProps = state => ({
    'messages': state.messages
});

const mapDispatchToProps = dispatch => ({
    'loadMessages': () => dispatch(loadMessages()),
    'clearError': () => dispatch(clearError())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Messages);
