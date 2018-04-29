/* eslint-env mocha */
/* eslint-disable no-useless-return */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { assert } from 'chai';
import { SignInOut } from './SignInOut.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('SignInOut', () => {
    if (Meteor.isServer) return; // client-only

    it('should render "sign in" when not signed in', () => {
        // setup: prepare data (history.isRequired, no user so null) / render component
        const history = { push() { return; } };
        const item = Enzyme.shallow(<SignInOut history={history} />);

        // test
        assert.strictEqual(item.text(), 'Sign in');
    });

    it('should render "sign out" when signed in', () => {
        // setup: prepare data (history.isRequired, user) / render component
        const history = { push(path) { return path; } };
        const item = Enzyme.shallow(<SignInOut history={history} userId="someId" />);

        // test
        assert.strictEqual(item.text(), 'Sign out');
    });
});
