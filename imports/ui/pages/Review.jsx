import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Books from '../../api/books';

class Review extends React.Component {
    acceptTradeHandler(event, _id, userId) {
        event.preventDefault();
        // TODO: add a method & call to check book is owned and accept the tradeOffer
    }

    renderBooks(books) {
        this.acceptTradeHandler = this.acceptTradeHandler.bind(this);
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

export default withTracker(() => ({
    user: Meteor.user(),
    books: Books.find({}).fetch()
}))(Review);
