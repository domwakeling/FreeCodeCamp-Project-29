import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            authors: '',
            bookTitle: ''
        };
        this.addBook = this.addBook.bind(this);
    }

    async addBook(event, bookId) {
        event.preventDefault();
        const selected = this.state.books.filter(book => book.bookId === bookId);
        if (selected.length !== 1) {
            Bert.alert('Oops, something went wrong!', 'danger', 'growl-top-right');
        } else {
            const b = selected[0];
            await Meteor.call(
                'books.addOne', b.bookTitle, b.authors, b.imageURL, b.bookId, Meteor.userId(),
                (err) => {
                    if (err) {
                        Bert.alert(err.reason, 'danger', 'growl-top-right');
                    } else {
                        Bert.alert('Book added', 'success', 'growl-top-right');
                        this.setState({ books: [] });
                        document.getElementById('field-title').value = '';
                        document.getElementById('field-authors').value = '';
                    }
                }
            );
        }
    }

    searchHandler(event) {
        event.preventDefault();
        const options = {
            bookTitle: this.state.bookTitle,
            author: this.state.authors
        };
        if (!options.bookTitle && !options.author) {
            Bert.alert('What did you want to search?', 'warning', 'growl-top-right');
        } else {
            Meteor.call('books.searchAPI', options, (error, result) => {
                if (error) {
                    Bert.alert('Something went wrong', 'danger', 'growl-top-right');
                } else if (result) {
                    this.setState({
                        books: result
                    });
                }
            });
        }
    }

    handleChange(event, field) {
        const newValue = event.target.value ? event.target.value : '';
        this.setState({
            [field]: newValue
        });
    }

    renderBooks() {
        return this.state.books.map((book) => {
            const authors = book.authors.length !== 0 ? book.authors[0] : '';
            return (
                <div key={book.bookId} className="book-search-result">
                    <h3>{book.bookTitle}</h3>
                    <p>{authors }</p>
                    <button
                        className="main-button"
                        onClick={e => this.addBook(e, book.bookId)}
                    >
                        Add to my books
                    </button>
                    <img src={book.imageURL} alt="" />
                </div>
            );
        });
    }

    render() {
        this.searchHandler = this.searchHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderBooks = this.renderBooks.bind(this);
        return (
            <div>
                <h2>Home</h2>
                <form onSubmit={this.searchHandler}>
                    <div>
                        <input
                            type="text"
                            id="field-title"
                            className="form-control"
                            placeholder="book title"
                            onChange={e => this.handleChange(e, 'bookTitle')}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="field-authors"
                            className="form-control"
                            placeholder="book author"
                            onChange={e => this.handleChange(e, 'authors')}
                        />
                    </div>
                    <input
                        type="submit"
                        id="password-button"
                        className="main-button form-button"
                        value="Search"
                    />
                </form>
                { this.state.books.length > 0 ? this.renderBooks() : '' }
            </div>
        );
    }
}
