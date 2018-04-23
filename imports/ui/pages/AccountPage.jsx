import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailSent: false
        };
    }

    clickHandler(event) {
        event.preventDefault();
        const userId = Meteor.userId();
        const email = this.props.user.emails[0].address;
        Meteor.call('accounts.verify', userId, email);
        this.setState({
            emailSent: true
        });
    }

    render() {
        this.clickHandler = this.clickHandler.bind(this);
        return (
            <div>
                <h2>Account</h2>
                {/* ternerary wrapper so will show 'loading' until user loads; safe because this
                  * page is wrapped in a <PrivateRoute> so will never show if not logged in  */}
                {this.props.user ? (
                    <div>
                        {this.props.user.emails && this.props.user.emails[0].verified ? (
                            <p>Account verified.</p>
                        ) : (
                            <div>
                                <p>Account not verified.</p>
                                {this.state.emailSent ? (
                                    <p>Verification email sent, please check your inbox.</p>
                                ) : (
                                    <button onClick={this.clickHandler}>
                                        Resend verification email
                                    </button>
                                )}
                            </div>
                        )}
                        <hr />
                        <p>TODO: add more personal info here</p>
                    </div>
                ) : <p>Loading...</p>}
            </div>
        );
    }
}

AccountPage.propTypes = {
    user: PropTypes.shape()
};

AccountPage.defaultProps = {
    user: null
};

export default withTracker(() => ({
    user: Meteor.user()
}))(AccountPage);
