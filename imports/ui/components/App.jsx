import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
import Copyright from './Copyright.jsx';
import NavBarWithRouter from './NavBar.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import AddBook from '../pages/AddBook.jsx';
import AccountPage from '../pages/AccountPage.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import NoMatch from '../pages/NoMatch.jsx';
import Review from '../pages/Review.jsx';

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
        const navbarRef = this.navbar;
        const hamburgerRef = this.hamburger;
        return (
            <Router>
                <div>
                    <NavBarWithRouter
                        clickCallback={this.clickHandler}
                        navbarRef={navbarRef}
                        hamburgerRef={hamburgerRef}
                    />

                    <div className="clearfix container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/about" component={About} />
                            <PrivateRoute path="/addbook" component={AddBook} />
                            <PrivateRoute path="/account" component={AccountPage} />
                            <PrivateRoute path="/review" component={Review} />
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={Signup} />
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
