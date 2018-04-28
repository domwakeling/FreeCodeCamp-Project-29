import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailSent: false,
            deleteButtonState: false
        };
    }

    resendClickHandler(event) {
        event.preventDefault();
        const userId = Meteor.userId();
        const email = this.props.user.emails[0].address;
        Meteor.call('accounts.verify', userId, email, (err) => {
            if (err) {
                Bert.alert('There was an error', 'danger', 'growl-top-right');
            } else {
                Bert.alert('Email re-sent', 'success', 'growl-top-right');
                this.setState({
                    emailSent: true
                });
            }
        });
    }

    deleteHandler(event) {
        event.preventDefault();
        if (!this.state.deleteButtonState) {
            this.setState({ deleteButtonState: true });
        } else {
            Meteor.call('accounts.delete', this.props.user._id, (err) => {
                if (err) {
                    Bert.alert('There was an error', 'danger', 'growl-top-right');
                } else {
                    Bert.alert('Account deleted', 'success', 'growl-top-right');
                    this.props.history.push('/');
                }
            });
        }
    }

    handleChange(event, field) {
        const newValue = event.target.value ? event.target.value : '';
        this.setState({
            [field]: newValue
        });
    }

    updateDetailsHandler(event) {
        event.preventDefault();
        const na = document.getElementById('field-name').value;
        const ci = document.getElementById('field-city').value;
        const st = document.getElementById('field-state').value;
        const co = document.getElementById('field-country').value;
        Meteor.call('accounts.setProfile', this.props.user._id, na, ci, st, co, (err) => {
            if (err) {
                Bert.alert('There was an error', 'danger', 'growl-top-right');
            } else {
                Bert.alert('Details updated', 'success', 'growl-top-right');
            }
        });
    }

    determineFieldValue(field) {
        if (this.state[field] === '') {
            return '';
        } else if (this.state[field]) {
            return this.state[field];
        } else if (this.props.user && this.props.user.profile && this.props.user.profile[field]) {
            return this.props.user.profile[field];
        }
        return '';
    }

    render() {
        this.resendClickHandler = this.resendClickHandler.bind(this);
        this.updateDetailsHandler = this.updateDetailsHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        const userName = this.determineFieldValue('userName');
        const userCity = this.determineFieldValue('userCity');
        const userState = this.determineFieldValue('userState');
        const userCountry = this.determineFieldValue('userCountry');
        return (
            <div>
                <h2>Account</h2>
                {/* ternerary wrapper so will show 'loading' until user loads; safe because this
                  * page is wrapped in a <PrivateRoute> so will never show if not logged in  */}
                {this.props.user && this.props.user.emails ? (
                    <div>
                        <p>{this.props.user.emails[0].address}</p>
                        {this.props.user.emails[0].verified ? (
                            <div>
                                <p>Account verified.</p>
                                <form onSubmit={this.updateDetailsHandler}>
                                    <div>
                                        <input
                                            type="text"
                                            id="field-name"
                                            className="form-control"
                                            placeholder="name"
                                            value={userName}
                                            onChange={e => this.handleChange(e, 'userName')}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            id="field-city"
                                            className="form-control"
                                            placeholder="town or city"
                                            value={userCity}
                                            onChange={e => this.handleChange(e, 'userCity')}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            id="field-state"
                                            className="form-control"
                                            placeholder="state"
                                            value={userState}
                                            onChange={e => this.handleChange(e, 'userState')}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            id="field-country"
                                            className="form-control"
                                            placeholder="country"
                                            value={userCountry}
                                            onChange={e => this.handleChange(e, 'userCountry')}
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        id="password-button"
                                        className="main-button form-button"
                                        value="Update details"
                                    />
                                </form>
                                <p style={{ paddingTop: '0.5em', fontStyle: 'italic' }}>
                                    Providing this information is optional. We
                                    will <strong>not</strong> share any information that you
                                    provide.
                                </p>

                            </div>
                        ) : (
                            <div>
                                <p className="inline inline-before">Account not verified.</p>
                                {this.state.emailSent ? (
                                    <p>Verification email sent, please check your inbox.</p>
                                ) : (
                                    <button
                                        onClick={this.resendClickHandler}
                                        className="main-button"
                                    >
                                        Resend verification email
                                    </button>
                                )}
                            </div>
                        )}
                        <button
                            className="main-button remove-button"
                            onClick={this.deleteHandler}
                        >
                            {this.state.deleteButtonState ? (
                                'Confirm delete account'
                            ) : (
                                'Delete account'
                            )}
                        </button>
                    </div>
                ) : <p>Loading...</p>}
            </div>
        );
    }
}

AccountPage.propTypes = {
    user: PropTypes.shape(),
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired
};

AccountPage.defaultProps = {
    user: null
};

export default withTracker(() => ({
    user: Meteor.user()
}))(AccountPage);
