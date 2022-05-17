import React from 'react';
import { AnimateGroup } from 'react-animation';

import Message from '../containers/Message.js';

class Messages extends React.Component {
    componentDidMount() {
        this.props.loadMessages();
    }

    componentWillUnmount() {
        this.props.clearError();
    }

    render = () =>
        <AnimateGroup className="row my-3">{
            this.props.messages.map(message => 
                <Message key={message.id} message={message} />
            )
        }</AnimateGroup>;
}

export default Messages;
