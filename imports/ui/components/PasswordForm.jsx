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
                    <div className="form-group">
                        <input
                            type="email"
                            id="field-email"
                            className="form-control input-lg"
                            placeholder="email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="field-password"
                            className="form-control input-lg"
                            placeholder="password"
                        />
                    </div>
                    {this.props.secondPassword ? (
                        <div className="form-group">
                            <input
                                type="password"
                                id="field-password2"
                                className="form-control input-lg"
                                placeholder="password"
                            />
                        </div>
                    ) : ''}
                    <div className="form-group text-center">
                        <input
                            type="submit"
                            id="password-button"
                            className="btn btn-primary btn-lg btn-block"
                            value={this.props.buttonText}
                        />
                    </div>
                    <div className="form-group text-center">
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
    submitHandler: PropTypes.func.isRequired
};

PasswordForm.defaultProps = {
    buttonText: 'button',
    messageText: 'message',
    linkTo: '/',
    linkText: 'link',
    secondPassword: false
};
