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
    }
});