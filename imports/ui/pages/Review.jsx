import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import Books from '../../api/books';

class Review extends React.Component {
    async acceptTradeHandler(event, _id, userId) {
        event.preventDefault();
        await Meteor.call(
            'books.acceptTrade', _id, userId,
            (err) => {
                if (err) {
                    Bert.alert(err.reason, 'danger', 'growl-top-right');
                } else {
                    Bert.alert('Trade request accepted', 'success', 'growl-top-right');
                }
            }
        );
    }

    async rejectTradeHandler(event, _id, userId) {
        event.preventDefault();
        await Meteor.call(
            'books.rejectTrade', _id, userId,
            (err) => {
                if (err) {
                    Bert.alert(err.reason, 'danger', 'growl-top-right');
                } else {
                    Bert.alert('Trade request rejected', 'success', 'growl-top-right');
                }
            }
        );
    }

    renderBooks(books) {
        this.acceptTradeHandler = this.acceptTradeHandler.bind(this);
        this.rejectTradeHandler = this.rejectTradeHandler.bind(this);
        const userId = this.props.user._id;

        return (
            <div className="books-container">
                {books.map(book => (
                    <div key={book.bookId} className="book-display">
                        <button
                            className="main-button"
                            onClick={(e) => { this.acceptTradeHandler(e, book._id, userId); }}
                        >
                            Accept trade
                        </button>
                        <button
                            className="main-button remove-button"
                            onClick={(e) => { this.rejectTradeHandler(e, book._id, userId); }}
                        >
                            Reject trade
                        </button>
                        <img src={book.imageURL} alt="" />
                    </div>
                ))
                }
            </div>
        );
    }

    render() {
        this.renderBooks = this.renderBooks.bind(this);
        const myOffers = this.props.books.filter(book => (
            book.tradeOffers && this.props.user && (book.user === this.props.user._id)
        ));
        return (
            <div>
                <h2>Your trade requests</h2>
                {myOffers.length > 0 ? (
                    <div>
                        { this.renderBooks(myOffers) }
                    </div>
                ) : (
                    <p>You have no requests for any of your books at present</p>
                )}
            </div>
        );
    }
}

Review.propTypes = {
    user: PropTypes.shape(),
    books: PropTypes.arrayOf(PropTypes.shape())
};

Review.defaultProps = {
    user: null,
    books: []
};

export default withTracker(() => {
    Meteor.subscribe('books');

    return {
        user: Meteor.user(),
        books: Books.find({}).fetch()
    };
})(Review);
