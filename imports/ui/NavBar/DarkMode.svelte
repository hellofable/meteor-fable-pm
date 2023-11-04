<script>
    export let _state;
</script>

<input
    on:click={() => {
        $_state.view.darkMode = !$_state.view.darkMode;
    }}
    checked={$_state.view.darkMode}
    type="checkbox"
    class="btn-check"
    id="btn-check"
    autocomplete="off"
/>
<label class="btn btn-secondary" for="btn-check">
    {#if $_state.view.darkMode}
        <i class="bi bi-moon-fill" />
    {/if}
    {#if !$_state.view.darkMode}
        <i class="bi bi-sun-fill" />
    {/if}
</label>
