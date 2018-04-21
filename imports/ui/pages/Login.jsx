import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
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

                { this.props.location.state ? (
                    <p>You must be signed in to access that content (
                        <a
                            className="monoFontLink"
                            href={this.props.location.state.from.pathname}
                        >
                            {this.props.location.state.from.pathname}
                        </a>
                        ).
                    </p>
                ) : '' }

                <p>** TODO: FORMAT ERROR MESSAGES RED **</p>

                <div id="error-messages" />

                <div>
                    <form
                        id="login-form"
                        className="form col-md-12 center-block"
                        onSubmit={this.handleSubmit}
                    >
                        <div className="form-group">
                            <input
                                type="email"
                                id="login-email"
                                className="form-control input-lg"
                                placeholder="email"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="login-password"
                                className="form-control input-lg"
                                placeholder="password"
                            />
                        </div>
                        <div className="form-group text-center">
                            <input
                                type="submit"
                                id="login-button"
                                className="btn btn-primary btn-lg btn-block"
                                value="Login"
                            />
                        </div>
                        <div className="form-group text-center">
                            <p className="text-center">
                                Don&apos;t have an account? Register <Link to="/signup">here</Link>
                            </p>
                        </div>
                    </form>
                </div>
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
