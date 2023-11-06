<script>
    export let _state;
</script>

<!-- <input
    on:click={() => {
        $_state.view.darkMode = !$_state.view.darkMode;
    }}
    checked={$_state.view.darkMode}
    type="checkbox"
    class="btn-check"
    id="btn-check"
    autocomplete="off"
/>
<label class="btn btn-light me-1" for="btn-check" class:btn-dark={$_state.view.darkMode}>
    {#if $_state.view.darkMode}
        <i class="bi bi-moon-fill" />
    {/if}
    {#if !$_state.view.darkMode}
        <i class="bi bi-sun-fill" />
    {/if}
</label> -->

{#if $_state.view.darkMode}
    <button
        on:click={() => {
            $_state.view.darkMode = !$_state.view.darkMode;
        }}
        class="btn btn-dark ms-1"
    >
        <i class="bi bi-moon-fill" />
    </button>
{/if}

{#if !$_state.view.darkMode}
    <button
        on:click={() => {
            $_state.view.darkMode = !$_state.view.darkMode;
        }}
        class="btn btn-light ms-1"
    >
        <i class="bi bi-sun-fill" /></button
    >
{/if}
