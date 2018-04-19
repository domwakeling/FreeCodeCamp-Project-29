/* don't like this constructor type but too hard at the moment to figure out how to re-write this
 * in 'extends React.Component' format */

import React from 'react';
import PropTypes from 'prop-types';
// import { Meteor } from 'meteor/meteor';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            // TODO: THIS NEEDS TO RELATE TO METEOR.USERID ONCE SET UP
            (false ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            ))
        }
    />
);

export default PrivateRoute;

PrivateRoute.propTypes = {
    location: PropTypes.shape(),
    component: PropTypes.func.isRequired
};

PrivateRoute.defaultProps = {
    location: undefined
};
