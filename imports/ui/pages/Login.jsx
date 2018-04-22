import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import PasswordForm from '../components/PasswordForm.jsx';

export default class Login extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        const email = document.getElementById('field-email').value;
        const password = document.getElementById('field-password').value;
        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                // display error message on screen
                const htmlContent = `<p>ERROR: ${err.reason ? err.reason : 'Unknown error'}</p>`;
                document.getElementById('error-messages').innerHTML = htmlContent;
            } else if (this.props.location.state) {
                // if successful, see whether we have a 'from' location to move to
                this.props.history.push(this.props.location.state.from.pathname);
            } else {
                // otherwise move to the root
                this.props.history.push('/');
            }
        });
    }

    render() {
        this.handleSubmit = this.handleSubmit.bind(this);
        return (
            <div>
                <h2>Sign In</h2>
                <div id="error-messages" />
                <PasswordForm
                    buttonText="Sign in"
                    messageText="Don't have an account? "
                    linkText="Sign up"
                    linkTo="/signup"
                    secondPassword={false}
                    submitHandler={this.handleSubmit}
                />
            </div>
        );
    }
}

Login.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.object
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired
};
