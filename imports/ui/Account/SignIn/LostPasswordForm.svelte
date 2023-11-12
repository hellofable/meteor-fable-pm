<script>
    // stores
    export let _state;
    export let _url;
    export let currentForm;

    // vendor
    import { Form, Message } from "svelte-yup";
    import * as yup from "yup";
    import { doAlert } from "/imports/code/alerts";

    // yup
    let schema = yup.object().shape({
        email: yup.string().required().email().label("Email address"),
    });
    let fields = { email: "admin@hellofable.com", password: "asdpop" };
    let submitted = false;
    let isValid;
    let emailSent = false;

    function formSubmit() {
        submitted = true;
        isValid = schema.isValidSync(fields);
        if (isValid) {
            Meteor.call("accounts.sendResetPasswordTokenByEmail", fields.email, "password-reset", function (e, r) {
                if (!e) {
                    emailSent = true;
                }
                if (e) {
                    if (e.error == "User not found") doAlert("password.lost.sendEmail.failure");
                    if (e.error == "locked") doAlert("auth.signIn.error");
                    submitted = false;
                }
            });
        }

        if (!isValid) {
            submitted = false;
        }
    }
</script>

<div class="sign-in-form">
    <div class="account-form">
        <Form class="form" {schema} {fields} submitHandler={formSubmit} {submitted}>
            <h1 class="h3 mb-3 font-weight-normal grey-text text-darken-2">
                <span>Fable</span>
                <span class=""> | </span>
                <span class="fw-light">Lost Password</span>
            </h1>
            {#if !emailSent}
                <div class="mb-3">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="form-label">Email Address</label>
                    <input autocomplete="email" class="form-control" type="text" bind:value={fields.email} />
                    <Message name="email" />
                </div>
                {#if submitted}
                    <button class="btn btn-primary w-100 mb-2 blinking" type="submit" disabled>...</button>
                {/if}
                {#if !submitted}
                    <button class="btn btn-primary w-100 mb-2" type="submit">Send E-mail</button>
                {/if}
            {/if}
            {#if emailSent}
                An email has been sent to <b>{fields.email}</b> with a link to reset your password.
            {/if}
        </Form>
        {#if !emailSent}
            <p class="text-left mt-4">
                <a on:click={() => (currentForm = "signIn")} href="#" class="grey-text">
                    <ion-icon name="arrow-back-circle-outline" />

                    <span class="text">Back</span>
                </a>
            </p>
        {/if}
    </div>
</div>

<style>
    ion-icon {
        display: inline-block;
        vertical-align: middle;
    }

    .text {
        display: inline-block;
        vertical-align: middle;
    }
</style>
