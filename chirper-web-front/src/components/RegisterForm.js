import React from 'react';
import { Redirect } from 'react-router-dom';

class RegisterForm extends React.Component {
    state = {
        'login': '',
        'password': '',
        'password-repeat': ''
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
        
        this.props.registerUser(
            this.state.login,
            this.state.password,
            this.state['password-repeat']
        );
    }

    render() {
        const user = this.props.user;
        const login = this.state.login;
        const password = this.state.password;
        const passwordRepeat = this.state['password-repeat'];

        return (user ?
            <Redirect to="/" />
            :
            <div className="row justify-content-center">
                <div className="col-lg-6 px-5">
                    <form className="p-3" method="POST" action="/register" onSubmit={this.handleSubmit} autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="login">Login:</label>
                            <input id="login" className="form-control" type="text" name="login" autoComplete="off" value={login} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input id="password" className="form-control" type="password" name="password" autoComplete="new-password" value={password} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-repeat">Repeat the Password:</label>
                            <input id="password-repeat" className="form-control" type="password" name="password-repeat" autoComplete="new-password" value={passwordRepeat} onChange={this.handleChange} required />
                        </div>
                        <input className="btn btn-primary" type="submit" value="Register" />
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterForm;
