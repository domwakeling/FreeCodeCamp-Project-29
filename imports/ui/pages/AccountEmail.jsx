import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

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
                    document.getElementById('errorState').innerHTML = innerStr;
                } else {
                    document.getElementById('successState').innerHTML = '<p>Email verified</p>';
                }
            });
        }
    }

    render() {
        const title = this.state.mode === 'verify-email' ? 'Verify Email' : 'Reset Password';

        return (
            <div>
                <h2>{title}</h2>
                <div id="errorState" />
                <div id="successState" />
            </div>
        );
    }
}

AccountEmail.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired
};
