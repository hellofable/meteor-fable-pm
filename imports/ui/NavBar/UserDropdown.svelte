<script>
    import { Meteor } from "meteor/meteor";

    export let _state;
    function signOut() {
        Meteor.logout();
    }
</script>

<div class="dropdown me-1 p-2">
    <button
        class="btn border-0"
        class:btn-light={!$_state.view.darkMode}
        class:btn-dark={$_state.view.darkMode}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
    >
        <i class="bi bi-sliders2" />
    </button>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="/">Home</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href={null}>Account Info</a></li>

        <li><a on:click={signOut} class="dropdown-item" href={null}>Sign Out</a></li>
        <li><hr class="dropdown-divider" /></li>
        {#if !$_state.view.darkMode}
            <li>
                <a
                    on:click={() => {
                        $_state.view.darkMode = !$_state.view.darkMode;
                    }}
                    class="dropdown-item"
                    href={null}
                >
                    <i class="bi bi-moon-fill" /></a
                >
            </li>
        {/if}

        {#if $_state.view.darkMode}
            <li>
                <a
                    on:click={() => {
                        $_state.view.darkMode = !$_state.view.darkMode;
                    }}
                    class="dropdown-item"
                    href={null}><i class="bi bi-sun-fill" /></a
                >
            </li>
        {/if}
    </ul>
</div>

<style>
    a {
        cursor: pointer;
    }
</style>
