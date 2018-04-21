import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';

// export default class NavBar extends React.Component {
class NavBar extends React.Component {
    clickHandler(event) {
        event.preventDefault();
        this.props.clickCallback(event);
    }

    signInOutHandler(event) {
        event.preventDefault();
        if (Meteor.userId()) {
            Meteor.logout(() => {
                // call the push as a callback to ensure that Meteor.userId() has updated
                this.props.history.push('/');
            });
            this.forceUpdate();
        } else {
            this.props.history.push('/login');
        }
    }

    render() {
        this.clickHandler = this.clickHandler.bind(this);
        this.signInOutHandler = this.signInOutHandler.bind(this);
        return (
            <div ref={this.props.navbarRef} className="topNav">
                <div className="topNavContainer">
                    <a href="/" className="navBrand">Brand</a>
                    <NavLink exact to="/" activeClassName="selectedPage">Home</NavLink>
                    <NavLink to="/about" activeClassName="selectedPage">About</NavLink>
                    <NavLink to="/topics" activeClassName="selectedPage">Topics</NavLink>
                    { Meteor.userId() ? (<NavLink to="/account" activeClassName="selectedPage">Account</NavLink>) : ''}
                    <button ref={this.props.hamburgerRef} className="icon" onClick={this.clickHandler}>
                        <div className="icon-bar" />
                        <div className="icon-bar" />
                        <div className="icon-bar" />
                    </button>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#" onClick={this.signInOutHandler}>
                        { Meteor.userId() ? 'Sign out' : 'Sign in'}
                    </a>
                </div>
            </div>
        );
    }
}

NavBar.propTypes = {
    clickCallback: PropTypes.func.isRequired,
    navbarRef: PropTypes.shape({
        current: PropTypes.object
    }).isRequired,
    hamburgerRef: PropTypes.shape({
        current: PropTypes.object
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired
};

const NavBarWithRouter = withRouter(NavBar);

export default NavBarWithRouter;
