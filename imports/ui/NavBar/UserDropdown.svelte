<script>
    import { Meteor } from "meteor/meteor";

    export let _state;
    function signOut() {
        Meteor.logout();
    }
</script>

<div class="dropdown">
    <button
        class="btn"
        class:btn-light={!$_state.view.darkMode}
        class:btn-dark={$_state.view.darkMode}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
    >
        <i class="bi bi-person-arms-up" />
    </button>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" href={null}>Account Info</a></li>
        <li><a on:click={signOut} class="dropdown-item" href={null}>Sign Out</a></li>
    </ul>
</div>

<style>
    a {
        cursor: pointer;
    }
</style>
