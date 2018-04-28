import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check, Match } from 'meteor/check';
import Books from './books.js';

if (Meteor.isServer) {
    Meteor.methods({
        'accounts.verify': function verifyEmail(userId, email) {
            check([userId, email], [String]);
            Accounts.sendVerificationEmail(userId, email);
        },

        'accounts.reset': function resetPassword(email) {
            check(email, String);
            const user = Meteor.users.findOne({ 'emails.address': email });

            if (!user) {
                throw new Meteor.Error(403, 'User not found');
            }
            try {
                Accounts.sendResetPasswordEmail(user._id);
            } catch (error) {
                // Handle error when email already verified
                throw new Meteor.Error(403, 'Already verified');
            }
        },

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

    Accounts.emailTemplates.resetPassword.text = (user, url) => {
        const newURL = url.replace('/#', '');
        let retStr = 'Hello,\n\nTo reset your password, simply click the link below.\n\n';
        /* eslint-disable-next-line prefer-template */
        retStr = retStr + newURL + '\n\nThanks.';
        return retStr;
    };

    Accounts.emailTemplates.verifyEmail.text = (user, url) => {
        const newURL = url.replace('/#', '');
        let retStr = 'Hello,\n\nTo verify you account email, simply click the link below.\n\n';
        /* eslint-disable-next-line prefer-template */
        retStr = retStr + newURL + '\n\nThanks.';
        return retStr;
    };
}
