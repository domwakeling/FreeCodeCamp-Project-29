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

    Accounts.emailTemplates.resetPassword.text = (user, url) => {
        const newURL = url.replace('/#', '');
        let retStr = 'Hello,\n\nTo verify you account email, simply click the link below.\n\n';
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
