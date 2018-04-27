import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import Books from '../../api/books.js';

class Home extends React.Component {
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

    addClickHandler(event) {
        event.preventDefault();
        this.props.history.push('/addbook');
    }

    renderBooks() {
        this.removeHandler = this.removeHandler.bind(this);
        return (
            <div className="books-container">
                {this.props.books.map(book => (
                    <div key={book.bookId} className="book-display">
                        {this.props.user && book.user !== this.props.user._id ? (
                            <button
                                className="main-button"
                                onClick={e => console.log(e)}
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
                    </div>
                ))}
            </div>
        );
    }


    render() {
        this.renderBooks = this.renderBooks.bind(this);
        this.addClickHandler = this.addClickHandler.bind(this);
        return (
            <div>
                <h2>Home</h2>
                {this.props.user ? (
                    <div>
                        <button
                            className="main-button space-below"
                            onClick={this.addClickHandler}
                        >
                            Add a book
                        </button>
                    </div>
                ) : ''}
                {this.renderBooks()}
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
