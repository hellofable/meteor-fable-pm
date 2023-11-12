<script>
    // stores
    export let _state;
    export let _url;

    // vendor
    import { Form, Message } from "svelte-yup";
    import * as yup from "yup";

    import { doAlert } from "../../code/alerts";
    import { router } from "tinro";

    // yup
    let schema = yup.object().shape({
        password: yup.string().required().max(30).label("password"),
    });
    let fields = { password: "" };
    let submitted = false;
    let isValid;

    function formSubmit() {
        submitted = true;
        isValid = schema.isValidSync(fields);
        if (isValid) {
            Accounts.resetPassword($_url.query.token, fields.password, function (e, r) {
                if (e && e.reason == "Token expired") {
                    console.log("t e");
                    doAlert("password.reset.expiredToken");
                }
                // router.goto("/");
            });
            console.log("is valid form");
        }
    }
</script>

<div class="sign-in-form">
    <div class="account-form">
        <Form class="form" {schema} {fields} submitHandler={formSubmit} {submitted}>
            <div class="h4 mb-3 font-weight-normal grey-text text-darken-2">
                <span>Fable</span>
                <span class=""> | </span>
                <span class="fw-light">Reset Password</span>
            </div>
            <div class="mb-3">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="form-label">New Password</label>
                <input type="password" class="form-control" bind:value={fields.password} />
                <Message name="password" />
            </div>

            <button disabled={$_state.loggingIn} class="btn btn-primary w-100 mb-2" type="submit">
                {#if $_state.loggingIn}
                    <div class="blinking">Logging In...</div>
                {/if}
                {#if !$_state.loggingIn}
                    Reset Password
                {/if}
            </button>
        </Form>
    </div>
</div>
