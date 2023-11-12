<script>
    // stores
    export let _state;
    export let _url;
    export let currentForm;

    // import { doAlert } from "../../../code/alerts";

    // vendor
    import { Form, Message } from "svelte-yup";
    import * as yup from "yup";
    import Swal from "sweetalert2";

    // yup
    let schema = yup.object().shape({
        password: yup.string().required().max(30).label("password"),
        email: yup.string().required().email().label("Email address"),
    });
    let fields = { email: "", password: "" };
    let submitted = false;
    let isValid;

    // currentForm = "x";
    function formSubmit() {
        submitted = true;
        isValid = schema.isValidSync(fields);
        // if (isValid) {
        Meteor.loginWithPassword(fields.email, fields.password, function (e, r) {
            if (e) console.log(fields.email, fields.password);
            Swal.fire({
                title: "Error!",
                text: e.message,
                icon: "error",
                position: "top-end",
                toast: true,
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            // if (!e) doAlert("auth.signIn.success");
        });
        // }
    }
</script>

<div class="sign-in-form">
    <div class="account-form">
        <Form class="form" {schema} {fields} submitHandler={formSubmit} {submitted}>
            <h1 class="h3 mb-3 font-weight-normal grey-text text-darken-2">
                <span>Fable</span>
                <span class=""> | </span>
                <span class="fw-light"> Please sign in </span>
            </h1>
            <div class="mb-3">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="form-label">Email Address</label>
                <input autocomplete="email" class="form-control" type="text" bind:value={fields.email} />
                <Message name="email" />
            </div>
            <div class="mb-3">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="form-label">Password</label>
                <input
                    autocomplete="current-password"
                    class="form-control"
                    type="password"
                    bind:value={fields.password}
                />
                <Message name="password" />
            </div>
            <button disabled={$_state.loggingIn} class="btn btn-primary w-100 mb-2" type="submit">
                {#if $_state.loggingIn}
                    <div id="loading-text">Logging In...</div>
                {/if}
                {#if !$_state.loggingIn}
                    Sign In
                {/if}
            </button>
        </Form>
        <p class="text-center mt-4">
            <a class="grey-text" on:click={() => (currentForm = "lostPassword")} href="#">Lost your password?</a>
        </p>
    </div>
</div>

<style>
    #loading-text {
        animation: blinker 1s linear infinite;
        /* font-size: 33px; */
    }

    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }
</style>
