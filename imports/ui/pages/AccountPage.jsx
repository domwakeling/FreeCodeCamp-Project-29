import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class AccountPage extends React.Component {
    render() {
        return (
            <div>
                <h2>Account</h2>
                {/* ternerary wrapper so will show 'loading' until user loads; safe because this
                  * page is wrapped in a <PrivateRoute> so will never show if not logged in  */}
                {this.props.user ? (
                    <div>
                        {this.props.user.emails && this.props.user.emails[0].verified ? (
                            <p>Account verified</p>
                        ) : (
                            <p>Account not verified</p>
                        )}
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
