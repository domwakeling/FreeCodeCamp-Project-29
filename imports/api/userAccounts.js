import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Books from './books.js';

if (Meteor.isServer) {
    Meteor.methods({
        'accounts.setProfile': function setProfile(userId, name, city, state, country) {
            check([userId, name, city, state, country], [Match.Maybe(String)]);
            const updateSet = {
                profile: {
                    userName: name,
                    userCity: city,
                    userState: state,
                    userCountry: country
                }
            };
            Meteor.users.update({ _id: userId }, { $set: updateSet });
        },

        'accounts.delete': function deleteAccount(userId) {
            check(userId, String);
            Books.update({ tradeOffers: userId }, { $set: { tradeOffers: '' } }, { multi: true });
            Books.remove({ user: userId });
            Meteor.users.remove(userId);
        }
    });
}
