<script>
    export let _state;

    function clickButton(button) {
        $_state.sidebar.browserOptions.topTab = button;
    }
</script>

<div class="d-flex top-tabs">
    <div class="px-2 py-1">
        <button
            on:click={() => {
                clickButton("browserOptions");
            }}
            class:active={$_state.sidebar.browserOptions.topTab == "browserOptions"}
            class="btn btn-light"
            class:btn-dark={$_state.view.darkMode}
        >
            <i class="bi bi-gear-fill" />
        </button>
        <button
            on:click={() => {
                clickButton("exportOptions");
            }}
            class:active={$_state.sidebar.browserOptions.topTab == "exportOptions"}
            class="btn btn-light"
            class:btn-dark={$_state.view.darkMode}
        >
            <i class="bi bi-download" />
        </button>
    </div>
</div>

<style>
</style>
