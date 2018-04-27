import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import Books from '../../api/books.js';

const filterModes = ['All books', 'My books', 'My trades'];

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filterMode: 0 };
    }

    async removeHandler(event, _id) {
        event.preventDefault();
        await Meteor.call(
            'books.removeOne', _id, this.props.user._id,
            (err) => {
                if (err) {
                    Bert.alert(err.reason, 'danger', 'growl-top-right');
                } else {
                    Bert.alert('Book removed', 'success', 'growl-top-right');
                }
            }
        );
    }

    async proposeTradeHandler(event, _id) {
        event.preventDefault();
        await Meteor.call(
            'books.proposeTrade', _id, this.props.user._id,
            (err) => {
                if (err) {
                    Bert.alert(err.reason, 'danger', 'growl-top-right');
                } else {
                    Bert.alert('Trade proposal made', 'success', 'growl-top-right');
                }
            }
        );
    }

    addClickHandler(event) {
        event.preventDefault();
        this.props.history.push('/addbook');
    }

    filterHandler(e, idx) {
        e.preventDefault();
        this.setState({ filterMode: idx });
    }

    renderBooks() {
        this.removeHandler = this.removeHandler.bind(this);
        this.proposeTradeHandler = this.proposeTradeHandler.bind(this);
        return (
            <div className="books-container">
                {this.props.books
                    .filter((book) => {
                        if (this.state.filterMode === 1) {
                            return book.user === this.props.user._id;
                        } else if (this.state.filterMode === 2) {
                            // TODO - add filter for trades
                            return true;
                        }
                        return true;
                    })
                    .map(book => (
                        <div key={book.bookId} className="book-display">
                            {this.props.user && book.user !== this.props.user._id ? (
                                <button
                                    className="main-button"
                                    onClick={(e) => { this.proposeTradeHandler(e, book._id); }}
                                >
                                    Propose trade
                                </button>
                            ) : '' }
                            {this.props.user && book.user === this.props.user._id ? (
                                <button
                                    className="main-button remove-button"
                                    onClick={(e) => { this.removeHandler(e, book._id); }}
                                >
                                    Remove book
                                </button>
                            ) : ''}
                            <img src={book.imageURL} alt="" />
                            {book.tradeOffers && book.tradeOffers.length > 0 ? (
                                <div className="trade-count-wrapper">
                                    <div className="trade-count">
                                        <p>{book.tradeOffers.length}</p>
                                    </div>
                                </div>
                            ) : ''}
                        </div>
                    ))
                }
            </div>
        );
    }

    render() {
        this.renderBooks = this.renderBooks.bind(this);
        this.addClickHandler = this.addClickHandler.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
        return (
            <div>
                {this.props.user ? (
                    <div>
                        <div className="button-container">
                            <button
                                className="main-button space-below"
                                onClick={this.addClickHandler}
                            >
                                Add a book
                            </button>
                            <div className="dropdown">
                                <button id="which-books" className="main-button">
                                    {filterModes[this.state.filterMode]}
                                </button>
                                <div className="dropdown-content">
                                    {/* eslint-disable-next-line */}
                                    <li onClick={(e) => { this.filterHandler(e, 0); }}>
                                        {filterModes[0]}
                                    </li>
                                    {/* eslint-disable-next-line */}
                                    <li onClick={(e) => { this.filterHandler(e, 1); }}>
                                        {filterModes[1]}
                                    </li>
                                    {/* eslint-disable-next-line */}
                                    <li onClick={(e) => { this.filterHandler(e, 2); }}>
                                        {filterModes[2]}
                                    </li>
                                </div>
                            </div>
                        </div>
                        {this.renderBooks()}
                    </div>
                ) : (
                    <div>
                        <h2>Welcome</h2>
                        <p>Please <a href="/login">sign in</a> or <a href="/signup">create an&nbsp;
                            {/* eslint-disable-next-line react/jsx-closing-tag-location */}
                            account</a> to see what books are available and start trading!
                        </p>
                    </div>
                )}
            </div>
        );
    }
}

Home.propTypes = {
    user: PropTypes.shape(),
    books: PropTypes.arrayOf(PropTypes.shape()),
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired
};

Home.defaultProps = {
    user: null,
    books: []
};

export default withTracker(() => ({
    user: Meteor.user(),
    books: Books.find({}).fetch()
}))(Home);
