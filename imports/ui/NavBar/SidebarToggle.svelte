<script>
    export let _state;

    function toggleSidebar() {
        $_state.sidebar.show = !$_state.sidebar.show;
    }
</script>

<button on:click={toggleSidebar} class="btn" type="button" id="sidebar-dropdown">
    <i class="bi bi-list" />
</button>

<style>
    .btn {
        color: rgb(125, 123, 123);
    }
</style>
