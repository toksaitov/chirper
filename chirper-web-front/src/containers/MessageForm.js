import { connect } from 'react-redux';

import { createMessage } from '../actions/messages.js';
import { clearError } from '../actions/error.js';
import { updateCreateMessageForm, clearCreateMessageForm } from '../actions/forms.js';

import MessageForm from '../components/MessageForm.js';

const mapStateToProps = state => ({
    'user': state.user,
    'content': state.createMessageForm.content
});

const mapDispatchToProps = dispatch => ({
    'updateCreateMessageForm': (name, value) => dispatch(updateCreateMessageForm(name, value)),
    'clearCreateMessageForm': () => dispatch(clearCreateMessageForm()),
    'createMessage': (content, onSuccess) => dispatch(createMessage(content, onSuccess)),
    'clearError': () => dispatch(clearError())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageForm);
