import React from 'react';
import PropTypes from 'prop-types';

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <h2>Login</h2>
                <p>You must be signed-in to access that content (
                    <a
                        className="monoFontLink"
                        href={this.props.location.state.from.pathname}
                    >
                        {this.props.location.state.from.pathname}
                    </a>
                    ).
                </p>
            </div>
        );
    }
}

Login.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.object
    }).isRequired
};
