import React, { Component } from 'react';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsButtonWrapper extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
    }
    componentDidMount() {
        this.view = Blaze.render(Template.atNavButton, this.container.current);
    }
    componentWillUnmount() {
        Blaze.remove(this.view);
    }
    render() {
        // return <span ref="container" />;
        return <span ref={this.container} />;
    }
}
