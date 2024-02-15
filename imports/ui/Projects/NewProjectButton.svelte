<script>
    export let _state;

    function newScript() {
        $_state.modal.name = "newProject";
    }
</script>

<button on:click={newScript} class="btn btn-light project-card d-flex align-items-center h-100 w-100">
    <div class="text-center w-100 create-project-text">
        <div class="d-flex align-items-center">
            <div />
            <div class="flex-grow-1"><i class="bi bi-plus-circle" /></div>
            <div />
        </div>
    </div>
</button>

<style>
    button {
        min-height: 100px;
        font-size: 22px;
        opacity: 0.4;
    }
</style>
