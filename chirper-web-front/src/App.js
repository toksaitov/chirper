import React from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { loadUser } from './actions/user.js';

import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import HomePage from './pages/HomePage.js';

class App extends React.Component {
    componentDidMount() {
        this.props.loadUser();
    }

    render = () =>
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/register">
                    <RegisterPage />
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </Router>
}

const mapDispatchToProps = dispatch => ({
    'loadUser': () => dispatch(loadUser())
});

export default connect(
    null,
    mapDispatchToProps
)(App);
