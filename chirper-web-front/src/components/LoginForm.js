import React from 'react';
import { Redirect } from 'react-router-dom';

class LoginForm extends React.Component {
    state = {
        'login': '',
        'password': ''
    };

    componentWillUnmount() {
        this.props.clearError();
    }

    handleChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })
    };

    handleSubmit = event => {
        event.preventDefault();

        this.props.loginUser(this.state.login, this.state.password);
    }

    render() {
        const user = this.props.user;
        const login = this.state.login;
        const password = this.state.password;

        return (user ?
            <Redirect to="/" />
            :
            <div className="row justify-content-center">
                <div className="col-lg-6 px-5">
                    <form className="p-3" method="POST" action="/login" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="login">Login:</label>
                            <input id="login" className="form-control" name="login" type="text" value={login} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input id="password" className="form-control" name="password" type="password" value={password} onChange={this.handleChange} required />
                        </div>
                        <input className="btn btn-primary" type="submit" value="Login" />
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;
