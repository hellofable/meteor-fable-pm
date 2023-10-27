<script>
    export let _state, meta;

    function newScript() {
        $_state.modal.name = "newScript";
        $_state.modal.projectId = $meta.params.pid;
    }
</script>

<button on:click={newScript} class="btn btn-light project-card d-flex align-items-center shadow-x w-100">
    <div class="text-center w-100 create-project-text">
        <div><i class="bi bi-plus-circle" /></div>
    </div>
</button>

<style>
    .bi {
        font-size: 22px;
        opacity: 0.3;
    }
</style>
