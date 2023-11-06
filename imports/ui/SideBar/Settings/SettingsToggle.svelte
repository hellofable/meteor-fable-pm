<script>
    export let _state;

    function toggle() {
        $_state.sidebar.browserOptions.showOptions = !$_state.sidebar.browserOptions.showOptions;
    }
</script>

<button
    ID="browser-options-toggle"
    on:click={toggle}
    class="btn btn-sm toggle p-1 py-0 w-100 border-0 rounded-0 rounded-bottom"
>
    {#if $_state.sidebar.browserOptions.showOptions} <i class="bi bi-chevron-up" />{/if}
    {#if !$_state.sidebar.browserOptions.showOptions} <i class="bi bi-chevron-down" />{/if}
</button>

<style>
    .btn {
        position: relative;
        top: -5px;
    }
</style>
