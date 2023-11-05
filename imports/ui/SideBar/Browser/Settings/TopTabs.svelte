<script>
    export let _state;

    function clickButton(button) {
        $_state.sidebar.browserOptions.topTab = button;
    }
</script>

<div class="d-flex toggles">
    <div class="px-2 py-1">
        <button
            on:click={() => {
                clickButton("browserOptions");
            }}
            class:active={$_state.sidebar.browserOptions.topTab == "browserOptions"}
            class="btn btn-dark btn-sm"
        >
            <i class="bi bi-gear-fill" />
        </button>
        <button
            on:click={() => {
                clickButton("export");
            }}
            class:active={$_state.sidebar.browserOptions.topTab == "export"}
            class="btn btn-dark btn-sm"
        >
            <i class="bi bi-download" />
        </button>
    </div>
</div>

<style>
    .toggles {
        background: #3b3b3b;
    }
</style>
