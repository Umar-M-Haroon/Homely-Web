import React from 'react';
import './Landing.css';
import { ReactComponent as Logo } from '../../homely-logo.svg';
import SignUp from '../SignUp';
import { AuthUserContext } from '../Session';
import Home from '../Home';
const Landing = () => (
    <div>
        <div className="Main">
            <h1 className="Title">Welcome to Homely!</h1>
            <Logo className="Homely-Logo">Homely Logo</Logo>
            <h3 className="Title">Sign in or sign up to get started</h3>
            <AuthUserContext.Consumer>
                {
                    authUser => authUser ? <Home /> : <SignUp />
                }

            </AuthUserContext.Consumer>
        </div>
    </div>
);

export default Landing;