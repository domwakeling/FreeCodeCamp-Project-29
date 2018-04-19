import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const Books = new Mongo.Collection('books');

/* TO CONSIDER:
 *
 * Do we have a document for each book which then can be offered by more than one user?
 * What's the difference between 'insert' and 'update' on Mongo? (does update immediately create?)
 * Are we going to have a schema?
 */

/* By the time we call addOne we must have ratified the ISBN ...
 * ... and know that user is logged in (only have button appear when user is active?)
 */
Meteor.methods({
    'books.addOne': function addBook(bookName, bookAuthor, bookISBN, bookImageURL, userId) {
        check(bookName, String);
        check(bookAuthor, String);
        check(bookISBN, String);
        check(bookImageURL, String);
        check(userId, String);

        Books.insert({
            bookName,
            bookAuthor,
            bookISBN,
            bookImageURL,
            user: userId,
            createdAt: new Date()
        });
    },

    'books.removeOne': function removeOneBook(_id) {
        check(_id, String);

        Books.remove({
            id: _id
        });
    }
});

export default Books;
