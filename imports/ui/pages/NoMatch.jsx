import React from 'react';

export default class NoMatch extends React.Component {
    render() {
        return (
            <div>
                <div className="left404"><h1>404</h1></div>
                <div className="right404"><h1>Not Found</h1></div>
                <p className="text404">We weren&apos;t able to find that content.</p>
            </div>
        );
    }
}
