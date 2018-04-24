import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

import PasswordForm from '../components/PasswordForm.jsx';

export default class Signup extends React.Component {
    handleSubmit(event) {
        event.preventDefault();

        const email = document.getElementById('field-email').value;
        const password = document.getElementById('field-password').value;

        Accounts.createUser({ email, password }, (err) => {
            if (err) {
                // display error message on screen
                const htmlContent = `<p>ERROR: ${err.reason ? err.reason : 'Unknown error'}</p>`;
                document.getElementById('error-messages').innerHTML = htmlContent;
                Bert.alert('There was an error', 'danger', 'growl-top-right');
            } else {
                // if no error, success! so login, send verification email and move to root
                Meteor.loginWithPassword(email, password, (err2) => {
                    if (err2) {
                        Bert.alert('There was an error', 'danger', 'growl-top-right');
                    } else {
                        Meteor.call('accounts.verify', Meteor.userId(), email);
                        this.props.history.push('/');
                        Bert.alert('Account created', 'success', 'growl-top-right');
                    }
                });
            }
        });
    }

    render() {
        this.handleSubmit = this.handleSubmit.bind(this);
        return (
            <div>
                <h2>Sign Up</h2>
                <p>This site uses email and password for account sign-up and login. A verification
                    email will be sent to the address you provide, and once verified you will have
                    the ability to reset your password if you forget it.
                </p>
                <p>Your email address will <strong>not</strong> be shared and
                    will <strong>only</strong> be used for the purposes outlined above.
                </p>
                <div id="error-messages" />
                <PasswordForm
                    buttonText="Sign Up"
                    messageText="Have an account? "
                    linkText="Sign in"
                    linkTo="/login"
                    secondPassword={false}
                    submitHandler={this.handleSubmit}
                />
            </div>
        );
    }
}

Signup.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired
};
