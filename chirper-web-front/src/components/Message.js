import React from 'react';
import Moment from 'react-moment';
import { AnimateGroup } from 'react-animation';

class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'content': props.message.content,
            'editing': false
        };
    }

    handleChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })
    };

    handleEditMessage = event => {
        event.preventDefault();

        if (this.state.editing) {
            const id = this.props.message.id;
            const content = this.state.content;

            this.props.editMessage(id, content, () => {
                this.setState({ 'editing': false });
            });
        } else {
            this.setState({ 'editing': true });
        }
    }

    handleDeleteMessage = event => {
        event.preventDefault();

        if (this.state.editing) {
            this.setState({ 'editing': false });
        } else {
            this.props.deleteMessage(this.props.message.id);
        }
    }

    render() {
        const user = this.props.user;
        const message = this.props.message;
        const editing = this.state.editing;

        const cardClass = user && user.id === message.user.id ? 'bg-primary' : 'bg-secondary';

        return (
            <div key={message.id} className="col-md-4">
                <div className={`message card p-3 m-2 text-white ${cardClass}`}>
                    <h5 className="card-title">@{message.user.login}</h5>
                    <AnimateGroup animation="bounce">{editing ?
                        <textarea key="0" name="content" onChange={this.handleChange} value={this.state.content}/>
                        :
                        <div key="1" className="message-content card-text">{message.content}</div>
                    }</AnimateGroup>
                    <time className="message-date card-subtitle">
                        <small>
                            <Moment format="LLL">{message.createdAt}</Moment>
                        </small>
                    </time>
                    {(user && (user.administrator || user.id === message.user.id)) &&
                        <div className="clearfix">
                            <div className="float-right">
                                <form className="d-inline mr-1" onSubmit={this.handleEditMessage} method="GET">
                                    <input className="edit-button btn btn-sm btn-outline-light" type="submit" value={editing ? 'Done' : 'Edit'} />
                                </form>
                                <form className="d-inline ml-1" onSubmit={this.handleDeleteMessage} method="POST">
                                    <input className="delete-button btn btn-sm btn-outline-light" type="submit" value={editing ? 'Cancel' : 'Delete'} />
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Message;
