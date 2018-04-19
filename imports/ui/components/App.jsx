import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

// import AccountsUIWrapper from './AccountsUIWrapper.js';
import PrivateRoute from './PrivateRoute.jsx';
import Copyright from './Copyright.jsx';

import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Topics from '../pages/Topics.jsx';
import Login from '../pages/Login.jsx';
import NoMatch from '../pages/NoMatch.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.navbar = React.createRef();
        this.hamburger = React.createRef();
    }

    clickHandler(event) {
        event.preventDefault();
        const x = this.navbar.current;
        if (x.className === 'topNav') {
            x.className += ' responsive';
        } else {
            x.className = 'topNav';
        }
        this.hamburger.current.blur();
    }

    render() {
        this.clickHandler = this.clickHandler.bind(this);
        return (
            <Router>
                <div>
                    <div ref={this.navbar} className="topNav">
                        <div className="topNavContainer">
                            <a href="/" className="navBrand">Brand</a>
                            <NavLink exact to="/" activeClassName="selectedPage">Home</NavLink>
                            <NavLink to="/about" activeClassName="selectedPage">About</NavLink>
                            <NavLink to="/topics" activeClassName="selectedPage">Topics</NavLink>
                            <button ref={this.hamburger} className="icon" onClick={this.clickHandler}>
                                <div className="icon-bar" />
                                <div className="icon-bar" />
                                <div className="icon-bar" />
                            </button>
                            {/* <AccountsUIWrapper /> */}
                        </div>
                    </div>

                    <div className="clearfix container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <PrivateRoute path="/about" component={About} />
                            <PrivateRoute path="/topics" component={Topics} />
                            <Route path="/login" component={Login} />
                            <Route component={NoMatch} />
                        </Switch>
                        <Copyright
                            from="2017"
                            who="Dom Wakeling"
                            link="http://www.domwakeling.com"
                        />
                    </div>

                </div>
            </Router>
        );
    }
}
