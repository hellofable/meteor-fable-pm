<script>
    import { log } from "svelte/compiler";

    export let _state;

    function toggleSidebar() {
        let amount;
        $_state.navbar.collapsed = !$_state.navbar.collapsed;

        // if ($_state.navbar.collapsed) moveLeft();
        // if (!$_state.navbar.collapsed) moveRight();
    }
</script>

<button on:click={toggleSidebar} class="btn ps-0" type="button" id="sidebar-dropdown">
    {#if !$_state.navbar.collapsed}
        <i class="bi bi-arrow-right" />
    {/if}
    {#if $_state.navbar.collapsed}
        <i class="bi bi-arrow-left" />
    {/if}
</button>

<style>
    .btn {
        color: rgb(125, 123, 123);
    }
</style>
