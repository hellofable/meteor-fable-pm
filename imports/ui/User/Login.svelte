<script>
    export let _state;
    import { Accounts } from "meteor/accounts-base";
    import { Meteor } from "meteor/meteor";

    let token = "";
    function login() {
        // const options = {
        //     selector: "demian.sdfsdf@gmaasdasdil.com",
        //     userData: {
        //         username: "asdasd.leclair@asd.com",
        //         email: "demian.sdfsdf@gmaasdasdil.com",
        //     },
        // };

        // Accounts.requestLoginTokenForUser(options, function (error, result) {
        //     if (error) {
        //         console.log("Error generating login token:", error);
        //     } else {
        //         console.log("Login token generated successfully:", result.token);
        //         token = result.token;
        //         console.log(result);
        //     }
        // });

        Meteor.call("createToken", function (err, res) {
            if (res) {
                token = res.token;
                Meteor.loginWithToken(token);
            }
        });
    }
</script>

<div class="p-2">
    {token}
    <button on:click={login} class="btn btn-secondary">LOGIN</button>
</div>
