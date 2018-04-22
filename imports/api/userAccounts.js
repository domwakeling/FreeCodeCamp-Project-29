import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';


if (Meteor.isServer) {
    Meteor.methods({
        'accounts.verify': function verifyEmail(userId, email) {
            check([userId, email], [String]);
            Accounts.sendVerificationEmail(userId, email);
        }
    });
}
