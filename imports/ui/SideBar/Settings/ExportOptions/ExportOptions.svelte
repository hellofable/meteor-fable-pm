<script>
    export let _state;
</script>

<button class="btn mb-2" class:btn-light={!$_state.view.darkMode} class:btn-dark={$_state.view.darkMode}>
    <i class="bi bi-alphabet-uppercase" /> Export As Text / Fountain
</button>

<button class="btn" class:btn-light={!$_state.view.darkMode} class:btn-dark={$_state.view.darkMode}>
    <i class="bi bi-filetype-pdf" /> Export As PDF
</button>
