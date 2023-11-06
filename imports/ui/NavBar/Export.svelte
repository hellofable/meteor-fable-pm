<script>
    export let _state;
</script>

<button
    on:click={() => ($_state.modal.name = "exportScript")}
    class="btn btn-x me-2"
    class:btn-dark={$_state.view.darkMode}
    class:btn-light={!$_state.view.darkMode}
>
    <i class="bi bi-download" /></button
>
