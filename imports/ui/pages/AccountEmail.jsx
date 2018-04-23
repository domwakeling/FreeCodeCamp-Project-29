import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import PasswordForm from '../components/PasswordForm.jsx';

export default class AccountEmail extends React.Component {
    constructor(props) {
        super(props);
        const path = this.props.location.pathname;
        this.state = {
            mode: path.substring(1, path.indexOf('/', 1)),
            token: path.substring(path.indexOf('/', 1) + 1)
        };
    }

    componentWillMount() {
        if (this.state.mode === 'verify-email') {
            Accounts.verifyEmail(this.state.token, (err) => {
                if (err) {
                    const loginStr = Meteor.userId() ? 'C' : 'Login and c';
                    const innerStr = `<p>ERROR: Either the email is already verified,
                        or the 'verify email' link has expired.</p>
                        <p>${loginStr}heck your <a href='/account'>account</a>.</p>`;
                    document.getElementById('error-messages').innerHTML = innerStr;
                } else {
                    document.getElementById('success-messages').innerHTML = '<p>Email verified</p>';
                }
            });
        }
    }

    submitHandler(event) {
        event.preventDefault();
        const password = document.getElementById('field-password').value;
        Accounts.resetPassword(this.state.token, password, (err) => {
            if (err) {
                document.getElementById('error-messages').innerHTML = `<p>ERROR: ${err.reason}</p>`;
            } else {
                document.getElementById('error-messages').innerHTML = '';
                document.getElementById('success-messages').innerHTML = '<p>Password reset</p>';
            }
        });
    }

    render() {
        const title = this.state.mode === 'verify-email' ? 'Verify Email' : 'Reset Password';
        this.submitHandler = this.submitHandler.bind(this);
        return (
            <div>
                <h2>{title}</h2>
                <div id="error-messages" />
                <div id="success-messages">
                    {this.state.mode === 'reset-password' ? (
                        <p>Enter new password and submit</p>
                    ) : ''}
                </div>
                {this.state.mode === 'reset-password' ? (
                    <PasswordForm
                        emailField={false}
                        submitHandler={this.submitHandler}
                        messageText=""
                        linkText=""
                        buttonText="Reset password"
                    />
                ) : ''}
            </div>
        );
    }
}

AccountEmail.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string
    }).isRequired
};
