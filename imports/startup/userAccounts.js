import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';
import { Accounts } from 'meteor/accounts-base';
// import history from './history.js';

// Server: Define a method that the client can call.
if (Meteor.isServer) {
    Meteor.methods({
        sendEmail(to, from, subject, text) {
            // Make sure that all arguments are strings.
            check([to, from, subject, text], [String]);

            // Let other method calls from the same client start running, without
            // waiting for the email sending to complete.
            this.unblock();

            Email.send({
                to, from, subject, text
            });
        }
    });

    // Accounts.emailTemplates.resetPassword.text = (user, url) => {
    //     const str = `
    //         Hello,\n
    //         \n
    //         To reset your password, simply click the link below.\n
    //         \n
    //         ${url.replace('/#/', '/')}\n
    //         \n
    //         Thanks
    //     `;
    //     return str;
    // };
}

if (Meteor.isClient) {
    Accounts.onResetPasswordLink((token, done) => {
        const url = '/reset-password/' + token;
        history.pushState({}, '', url);
        // done();
    });
}

/* eslint-disable-next-line no-undef */
AccountsTemplates.configure({
    // Behavior
    confirmPassword: false,
    // enablePasswordChange: true,
    // forbidClientAccountCreation: false,
    // overrideLoginErrors: true,
    sendVerificationEmail: true,
    // lowercaseUsername: false,
    // focusFirstInput: true,

    // Appearance
    // showAddRemoveServices: false,
    showForgotPasswordLink: true
    // showLabels: true,
    // showPlaceholders: true,
    // showResendVerificationEmailLink: false,

    // Client-side Validation
    // continuousValidation: false,
    // negativeFeedback: false,
    // negativeValidation: true,
    // positiveValidation: true,
    // positiveFeedback: true,
    // showValidating: true,

    // Privacy Policy and Terms of Use
    // privacyUrl: 'privacy',
    // termsUrl: 'terms-of-use',

    // Redirects
    // homeRoutePath: '/home',
    // redirectTimeout: 4000,

    // Hooks
    // onLogoutHook: myLogoutFunc,
    // onSubmitHook: mySubmitFunc,
    // preSignUpHook: myPreSubmitFunc,
    // postSignUpHook: myPostSubmitFunc,

    // Texts
    // texts: {
    //     button: {
    //         signUp: "Register Now!"
    //     },
    //     socialSignUp: "Register",
    //     socialIcons: {
    //         "meteor-developer": "fa fa-rocket"
    //     },
    //     title: {
    //         forgotPwd: "Recover Your Password"
    //     },
    // },
});
