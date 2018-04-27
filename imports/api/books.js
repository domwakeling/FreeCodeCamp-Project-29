import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import { Promise } from 'meteor/promise';

const Books = new Mongo.Collection('books');
const API_KEY = Meteor.settings.GOOGLE_BOOKS_API_KEY;
const endPoint = 'https://www.googleapis.com/books/v1/volumes?q=';

async function apiCallGet(apiUrl) {
    return new Promise((resolve, reject) => {
        try {
            const response = HTTP.call('GET', apiUrl).data;
            resolve(response);
        } catch (error) {
            const errorCode = 500;
            const errorMessage = 'Error accessing the API';
            const myError = new Meteor.Error(errorCode, errorMessage);
            reject(myError);
        }
    });
}

// if (Meteor.isServer) {
//     Meteor.publish('books', () => Books.find({}));
// }

if (Meteor.isServer) {
    Meteor.methods({
        // 'books.doesUserHave': async function doesUserHave(bookId, )

        'books.addOne': function addBook(bookTitle, authors, imageURL, bookId, userId) {
            check(bookTitle, String);
            check(authors, [String]);
            check(imageURL, String);
            check(bookId, String);
            check(userId, String);

            const current = Books.find({ bookId, user: userId }).fetch();
            const myError = new Meteor.Error('999', 'Book already in your collection');

            if (current.length !== 0) {
                throw myError;
            }
            try {
                Books.insert({
                    bookTitle,
                    authors,
                    imageURL,
                    bookId,
                    user: userId,
                    createdAt: new Date()
                });
            } catch (err) {
                throw myError;
            }
        },

        'books.removeOne': async function removeOneBook(id, user) {
            check(id, String);
            check(user, String);

            const oopsError = new Meteor.Error('997', 'Oops, something went wrong!');
            const ownError = new Meteor.Error('998', 'You don\'t own that volume');
            const book = await Books.findOne({ _id: id });

            if (!book) {
                throw oopsError;
            } else if (book.user !== user) {
                throw ownError;
            } else {
                try {
                    Books.remove({
                        _id: id
                    });
                } catch (err) {
                    const myError = new Meteor.Error('999', 'Oops, something went wrong!');
                    throw myError;
                }
            }
        },

        'books.searchAPI': async function searchAPI(options) {
            check(options, { bookTitle: String, author: String });
            try {
                // build the url string
                const bookTitle = options.bookTitle && options.bookTitle !== '' ?
                    `+intitle:${options.bookTitle}` : '';
                const author = options.author && options.author !== '' ?
                    `+inauthor:${options.author}` : '';
                const searchQuery = `${bookTitle}${author}`;
                const url = `${endPoint}${searchQuery}&key=${API_KEY}`;

                // get search results from Google Books API
                const result = await apiCallGet(url);
                // parse results into an array of book title, authors (array) and image
                return result.totalItems > 0 ? result.items.map((item) => {
                    const info = item.volumeInfo;
                    const reducedItem = {
                        bookId: item.id,
                        bookTitle: info.title,
                        authors: info.authors ? info.authors : [],
                        /* eslint-disable-next-line no-mixed-operators */
                        imageURL: info.imageLinks && info.imageLinks.thumbnail || ''
                    };
                    return reducedItem;
                }) : [];
            } catch (error) {
                throw (error);
            }
        }
    });
}

export default Books;
