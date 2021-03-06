import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import {AuthUserContext, withAuthorization} from '../Session'
import PasswordChangeForm from '../PasswordChange';
import { auth } from 'firebase';
const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <h1>Account: {auth.email}</h1>
                <PasswordForgetForm />
                <PasswordChangeForm />
            </div>
        )}
    </AuthUserContext.Consumer>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);
