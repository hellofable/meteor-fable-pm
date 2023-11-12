<script>
    export let _url;
    export let _state;
    import SignInForm from "./SignInForm.svelte";
    import LostPasswordForm from "./LostPasswordForm.svelte";
    let currentForm = "signIn";
</script>

{#if currentForm == "signIn"}
    <SignInForm {_url} {_state} bind:currentForm />
{/if}

{#if currentForm == "lostPassword"}
    <LostPasswordForm bind:currentForm />
{/if}
