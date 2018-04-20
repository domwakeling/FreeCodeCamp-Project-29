import React from 'react';

import AccountsWrapper from '../components/AccountsWrapper.jsx';

export default class Reset extends React.Component {
    componentDidMount() {
        /* eslint-disable-next-line no-undef */
        AccountsTemplates.setState('resetPwd');
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <AccountsWrapper />
            </div>
        );
    }
}
