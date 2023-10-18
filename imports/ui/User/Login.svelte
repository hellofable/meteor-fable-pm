<script>
    export let _state;
    import { Accounts } from "meteor/accounts-base";

    function login() {
        const options = {
            selector: "demian.sdfsdf@gmaasdasdil.com",
            userData: {
                username: "asdasd.leclair@asd.com",
                email: "demian.sdfsdf@gmaasdasdil.com",
            },
        };

        Accounts.requestLoginTokenForUser(options, function (error, result) {
            if (error) {
                console.log("Error generating login token:", error);
            } else {
                console.log("Login token generated successfully:", result.token);
            }
        });
    }
</script>

<div class="p-2">
    <button on:click={login} class="btn btn-secondary">LOGIN</button>
</div>
