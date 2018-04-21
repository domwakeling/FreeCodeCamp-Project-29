import React from 'react';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';

export default class NavBar extends React.Component {
    clickHandler(event) {
        event.preventDefault();
        this.props.clickCallback(event);
    }

    render() {
        this.clickHandler = this.clickHandler.bind(this);
        return (
            <div ref={this.props.navbarRef} className="topNav">
                <div className="topNavContainer">
                    <a href="/" className="navBrand">Brand</a>
                    <NavLink exact to="/" activeClassName="selectedPage">Home</NavLink>
                    <NavLink to="/about" activeClassName="selectedPage">About</NavLink>
                    <NavLink to="/topics" activeClassName="selectedPage">Topics</NavLink>
                    <button ref={this.props.hamburgerRef} className="icon" onClick={this.clickHandler}>
                        <div className="icon-bar" />
                        <div className="icon-bar" />
                        <div className="icon-bar" />
                    </button>
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
    }).isRequired
};
