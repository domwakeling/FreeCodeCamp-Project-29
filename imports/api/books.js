import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import { Promise } from 'meteor/promise';

const Books = new Mongo.Collection('books');
const API_KEY = Meteor.settings.GOOGLE_BOOKS_API_KEY;
const endPoint = 'https://www.googleapis.com/books/v1/volumes?q=';
/* TO CONSIDER:
 *
 * Do we have a document for each book which then can be offered by more than one user?
 * What's the difference between 'insert' and 'update' on Mongo? (does update immediately create?)
 * Are we going to have a schema?
 */

/* By the time we call addOne we must have ratified the ISBN ...
 * ... and know that user is logged in (only have button appear when user is active?)
 */

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

        'books.removeOne': function removeOneBook(_id) {
            check(_id, String);

            Books.remove({
                id: _id
            });
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
