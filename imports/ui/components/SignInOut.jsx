import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export class SignInOut extends React.Component {
    signInOutHandler(event) {
        event.preventDefault();
        if (this.props.userId) {
            Meteor.logout(() => {
                // as a callback so that Meteor.usedId() = null before rendering root
                this.props.history.push('/');
            });
        } else {
            this.props.history.push('/login');
        }
    }

    render() {
        this.signInOutHandler = this.signInOutHandler.bind(this);
        return (
            // eslint-disable-next-line  jsx-a11y/anchor-is-valid
            <a href="#" onClick={this.signInOutHandler}>
                {this.props.userId ? 'Sign out' : 'Sign in'}
            </a>
        );
    }
}

SignInOut.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired,
    userId: PropTypes.string

};

SignInOut.defaultProps = {
    userId: null
};

export default withTracker(() => ({
    userId: Meteor.userId()
}))(SignInOut);
