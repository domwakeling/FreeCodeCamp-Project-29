import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import history from '../imports/startup/history.js';

// import '../imports/startup/AccountsTemplates.js';
import '../imports/startup/userAccounts.js';

import App from '../imports/ui/components/App.jsx';

Meteor.startup(() => {
    render(
        (
            <Router history={history} >
                <App />
            </Router>
        ), document.getElementById('render-target')
    );
});
