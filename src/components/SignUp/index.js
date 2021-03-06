import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import './SignUp.css';

const SignUpPage = () => (
    <div>
        <h4>Sign Up</h4>
        <SignUpForm />
    </div>
);
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};
class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    componentDidMount() {
        document.getElementById("Apple-Sign-In").onclick = (()=>{
            this.props.firebase.handleSignInWithApple();
        });
    }
    onSubmit = event => {
        const { email, passwordOne } = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    validateEmail = (email) => {
        const expression = /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}​.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return expression.test(String(email).toLowerCase())
    }

    createAndOpenAppleURL = () => {
        const parameters = new URLSearchParams({
            "client_id": process.env.REACT_APP_APPLE_CLIENT_ID,
            "redirect_uri": process.env.REACT_APP_APPLE_REDIRECT_URI,
            "state": "HI",
            "scope": process.env.REACT_APP_APPLE_SCOPE,
            "response_mode": process.env.REACT_APP_APPLE_RESPONSE_MODE,
            "response_type": process.env.REACT_APP_APPLE_RESPONSE_TYPE
        });
        const url = new URL(`https://appleid.apple.com/auth/authorize?${parameters.toString()}`);
        window.open(url);
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            error,
        } = this.state;
        const isInvalid =
            passwordOne.length <= 7 ||
            this.validateEmail(email) ||
            username === '';
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input className="form-control"
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Display Name"
                        />
                    </div>
                    <div className="form-group">
                        <input className="form-control"
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="form-group">
                        <input className="form-control"
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Password"
                        />
                        <small className="form-text text-muted">Passwords must be at least 8 characters long</small>
                    </div>
                    <button disabled={isInvalid} type="submit" className="btn btn-primary">Sign Up</button>
                    {error && <p>{error.message}</p>}
                </form>
                <h6 className="signin-button">or </h6>
                <div className="signin-button">
                    <button id="Apple-Sign-In" className="btn btn-link">
                        <img className="signin-button" src="https://appleid.cdn-apple.com/appleid/button?height=64&width=300&type=continue" alt="Sign In With Apple" />
                    </button>
                </div>
            </div>
        );
    }
}
const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
)
const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);
export default SignUpPage;
export { SignUpForm, SignUpLink };