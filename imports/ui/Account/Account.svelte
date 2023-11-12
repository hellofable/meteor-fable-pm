<script>
    import SignIn from "./SignIn/SignIn.svelte";
    import ResetPassword from "./ResetPassword.svelte";
    import { Meteor } from "meteor/meteor";

    export let _state;
    export let meta;
</script>

<div class="wrapper">
    <div class="container">
        <div class="row justify-content-center">
            <div id="signin-form-wrapper" class="form-wrapper border">
                {#if meta.page !== "resetPassword"}
                    <SignIn {meta} {_state} />
                {/if}

                {#if meta.page == "resetPassword"}
                    <ResetPassword {_state} {meta} />
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .wrapper {
        background-image: url(/Hexagon-2.svg);
        background-size: cover;
        background-repeat: no-repeat;
        height: 100vh;
        width: 100vw;
    }

    .form-wrapper {
        /* background: #191919; */
        margin: 0;
        position: absolute;
        top: 30%;
        max-width: 450px;
        transform: translateY(-30%);
        padding: 30px;
        border-radius: 10px;
    }
</style>
