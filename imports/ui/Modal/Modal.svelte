<script>
    import { onMount } from "svelte";
    export let _state;
    import AddProjectForm from "../Forms/Project/AddProjectForm.svelte";
    import AddScriptForm from "../Forms/Script/AddScriptForm.svelte";
    import UpdateScriptForm from "../Forms/Script/UpdateScriptForm.svelte";
    import ExportScriptForm from "../Forms/ExportScriptForm.svelte";
    let modalTitle;

    let mainModal;

    onMount(() => {
        mainModal = new bootstrap.Modal("#main-modal", {
            keyboard: false,
        });

        const mainModalEl = document.querySelector("#main-modal");
        mainModalEl.addEventListener("hidden.bs.modal", (event) => {
            $_state.modal.name = null;
            $_state.modal.projectId = null;
            modalTitle = null;
        });
    });

    $: if ($_state.modal.name) {
        mainModal.show();
        if ($_state.modal.name == "newProject") {
            modalTitle = "New Project";
        }

        if ($_state.modal.name == "newScript") {
            modalTitle = "New Script";
        }

        if ($_state.modal.name == "updateScript") {
            modalTitle = "Rename Script";
        }
        if ($_state.modal.name == "exportScript") {
            modalTitle = "Export Script";
        }
    }

    $: if ($_state.modal.name === null) {
        mainModal.hide();
    }
</script>

<div id="main-modal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{modalTitle}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div class="modal-body">
                {#if $_state.modal.name == "newProject"}
                    <AddProjectForm />
                {/if}
                {#if $_state.modal.name == "newScript"}
                    <AddScriptForm />
                {/if}
                {#if $_state.modal.name == "updateScript"}
                    <UpdateScriptForm />
                {/if}

                {#if $_state.modal.name == "exportScript"}
                    <ExportScriptForm />
                {/if}
            </div>
        </div>
    </div>
</div>
