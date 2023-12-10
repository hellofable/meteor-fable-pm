Meteor.methods({
    'createNewUser': function (username, email, password) {
        username = "demian.leclair@gmail.com"
        email = "demian.leclair@gmail.com"
        password = "cats"
        // Check for necessary input validations here
        const userId = Accounts.createUser({
            username: username,
            email: email,
            password: password
        });
        return userId;
    },
    'createToken': function () {
        const stampedLoginToken = Accounts._generateStampedLoginToken();
        Accounts._insertLoginToken("HvvGfDTT444QYSub4", stampedLoginToken);
        return stampedLoginToken;
    },
    'getSettings': function () {
        const user = Meteor.user()
        return (user.settings)
    }
});


