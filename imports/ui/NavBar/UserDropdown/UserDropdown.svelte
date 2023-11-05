<script>
    import { Meteor } from "meteor/meteor";
    // export let _state;
    export let _currentUser;

    function logout() {
        Meteor.logout();
    }

    // $: console.log($_currentUser);
</script>

<div class="dropdown">
    <button
        class="btn btn-smx btn-link border-0 rounded-circle"
        type="button"
        id="userDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
    >
        <i class="bi bi-person-circle" />
    </button>
    <ul class="dropdown-menu" aria-labelledby="userDropdown">
        <li><a class="dropdown-item disabled" href={null}>{$_currentUser.username}</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li>
            <a on:click={logout} class="dropdown-item text-end" href={null}
                >Logout <i class="bi bi-box-arrow-right ms-2" /></a
            >
        </li>
    </ul>
</div>

<style>
    .btn-link {
        color: grey !important;
        font-size: 23px;
    }
</style>
