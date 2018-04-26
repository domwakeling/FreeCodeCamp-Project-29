import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

import SignInOut from './SignInOut.jsx';

class NavBar extends React.Component {
    burgerClickHandler(event) {
        event.preventDefault();
        this.props.clickCallback(event);
    }

    render() {
        this.burgerClickHandler = this.burgerClickHandler.bind(this);
        return (
            <div ref={this.props.navbarRef} className="topNav">
                <div className="topNavContainer">
                    <a href="/" className="navBrand"><strong>FCC29 Book Swap Club</strong></a>
                    <NavLink exact to="/" activeClassName="selectedPage">Home</NavLink>
                    <NavLink to="/about" activeClassName="selectedPage">About</NavLink>
                    <NavLink to="/topics" activeClassName="selectedPage">Topics</NavLink>
                    { Meteor.userId() ?
                        (<NavLink to="/account" activeClassName="selectedPage">Account</NavLink>) :
                        ('')
                    }
                    <button
                        ref={this.props.hamburgerRef}
                        className="icon"
                        onClick={this.burgerClickHandler}
                    >
                        <div className="icon-bar" />
                        <div className="icon-bar" />
                        <div className="icon-bar" />
                    </button>
                    <SignInOut history={this.props.history} />
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

