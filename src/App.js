import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.sass';
import LoadingFull from "./Components/LoadingFull";
import PrivateRoute from "./Components/PrivateRouter";
import WindowControl from "./Components/WindowControl";
import {getAuthInfoState, getAccountInfoState} from "./Actions/apiActions";
import {getAuthState} from "./Actions/authActions";

const Login = lazy(() => import("./Components/Pages/Login"));
const Home = lazy(() => import("./Components/Pages/Home"));

class App extends Component {

    componentDidMount = () => {
        this.props.getAuthState();
        this.props.getAuthInfoState();
        this.props.getAccountInfoState();
    };

    render() {
        const {isAuthenticated} = this.props;

        return (
            <BrowserRouter>
                <WindowControl/>
                <Suspense fallback={<LoadingFull/>}>
                    <Switch>
                        <PrivateRoute exact path="/" isAuthenticated={isAuthenticated} component={Home}/>
                        <Route path="/login">
                            <Login/>
                        </Route>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    getAccountInfoState: () => dispatch(getAccountInfoState()),
    getAuthInfoState: () => dispatch(getAuthInfoState()),
    getAuthState: () => dispatch(getAuthState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);