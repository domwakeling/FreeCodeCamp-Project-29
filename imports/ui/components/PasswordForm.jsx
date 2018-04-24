import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class PasswordForm extends React.Component {
    render() {
        return (
            <div>
                <form
                    id="password-form"
                    className="form col-md-12 center-block"
                    onSubmit={this.props.submitHandler}
                >
                    {this.props.emailField ? (
                        <div>
                            <input
                                type="email"
                                id="field-email"
                                className="form-control"
                                placeholder="email"
                            />
                        </div>
                    ) : ''}
                    <div>
                        <input
                            type="password"
                            id="field-password"
                            className="form-control"
                            placeholder="password"
                        />
                    </div>
                    {this.props.secondPassword ? (
                        <input
                            type="password"
                            id="field-password2"
                            className="form-control"
                            placeholder="password"
                        />
                    ) : ''}
                    <input
                        type="submit"
                        id="password-button"
                        className="main-button form-button"
                        value={this.props.buttonText}
                    />
                    <div id="field-message">
                        <p className="text-center">
                            {this.props.messageText}
                            <Link to={this.props.linkTo}>{this.props.linkText}</Link>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

PasswordForm.propTypes = {
    buttonText: PropTypes.string,
    messageText: PropTypes.string,
    linkTo: PropTypes.string,
    linkText: PropTypes.string,
    secondPassword: PropTypes.bool,
    submitHandler: PropTypes.func.isRequired,
    emailField: PropTypes.bool
};

PasswordForm.defaultProps = {
    buttonText: 'button',
    messageText: 'message',
    linkTo: '/',
    linkText: 'link',
    secondPassword: false,
    emailField: true
};
