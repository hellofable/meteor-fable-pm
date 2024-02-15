<script>
    export let _state;
</script>

<a
    class:disabled={!$_state.savedStatus.saved}
    href="/"
    class="btn btn-light btn-sm"
    class:btn-dark={$_state.view.darkMode}
    ><i class="bi bi-chevron-compact-left" /> Projects
</a>
