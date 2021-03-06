/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default class About extends React.Component {
    render() {
        return (
            <div>
                <h2>About</h2>
                <p>This site is a <a href="/https:www.freecodecamp.org">freeCodeCamp</a> project
                    as part of the Back-End certification. Whilst it is hopefully fully
                    functional, don't expect any book trades that you make to be honored!
                </p>
                <p>The site uses email/password for login. The app is written to use
                    email-verifiation and password-resets, but since it is being hosted on a
                    'sandbox' (read: free) Heroku account, email only works for addresses that are
                    specified in advance ... so I've stripped that functionality out.</p>
                <p>Your email will only be used/stored for the purpose of site login and
                    will <strong>not</strong> be passed to any third parties.
                </p>
                <p>If you want to try the site but are not happy for your email to be stored, you
                    can always create an account and then delete it once you've had a look
                    around.
                </p>
                <p>Once you have created an account, you will have the option to provide further
                    details (your name, town/city, state and country). This information is
                    stored <strong>only</strong> for showing on the 'account' page,
                    is <strong>not</strong> made visible to other users, and can be deleted
                    (by editing) at any time. If you delete your account, this information will be
                    deleted at the same time.
                </p>
            </div>
        );
    }
}
