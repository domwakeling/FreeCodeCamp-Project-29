import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        Accounts.createUser({ email, password }, (err) => {
            if (err) {
                // display error message on screen
                const htmlContent = `<p>ERROR: ${err.reason ? err.reason : 'Unknown error'}</p>`;
                document.getElementById('error-messages').innerHTML = htmlContent;
            } else {
                // if no error, success! so change to login screen
                this.props.history.push('/login');
            }
        });
    }
    render() {
        this.handleSubmit = this.handleSubmit.bind(this);
        return (
            <div>
                <h2>Sign Up</h2>

                <p>** MESSAGE REQUIRED HERE TO EXPLAIN WHAT INFORMATION IS USED FOR **</p>
                <p>** TODO: FORMAT ERROR MESSAGES RED **</p>

                <div id="error-messages" />

                <div>
                    <form
                        id="signup-form"
                        className="form col-md-12 center-block"
                        onSubmit={this.handleSubmit}
                    >
                        <div className="form-group">
                            <input
                                type="email"
                                id="signup-email"
                                className="form-control input-lg"
                                placeholder="email"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="signup-password"
                                className="form-control input-lg"
                                placeholder="password"
                            />
                        </div>
                        <div className="form-group text-center">
                            <input
                                type="submit"
                                id="signup-button"
                                className="btn btn-primary btn-lg btn-block"
                                value="Sign up"
                            />
                        </div>
                        <div className="form-group text-center">
                            <p className="text-center">
                                Have an account? <Link to="/login">Sign in</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Signup.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired
};
