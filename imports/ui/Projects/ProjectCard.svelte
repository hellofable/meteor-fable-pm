<script>
    export let project, _state;
    import Scripts from "./Scripts/Scripts.svelte";
    import { router } from "tinro";
    // import ProjectCardDropdown from "./ProjectCardDropdown.svelte";

    function newScript() {
        $_state.modal.name = "newScript";
        $_state.modal.projectId = project._id;
    }

    function openScript(evt) {
        router.goto(`/project/${project._id}`);
    }
</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="project-card border-0 mb-2 card">
    <div class="card-body">
        <div class="d-flex w-100">
            <a on:click={openScript} class="card-title h4">
                {project.title}
            </a>
            <div class="flex-grow-1 text-end h4" />
        </div>
        <p class="card-text small">{project.synopsis}</p>
        <div class="text-end d-none">
            <a class="project-link" href="/project/project/{project._id}">
                <i class="bi bi-arrow-right-circle-fill" /></a
            >
        </div>
        <div class="text-end">
            <div on:click={newScript} class="btn btn-secondary btn-sm mt-2">
                <i class="bi bi-plus-circle"></i> Add Script
            </div>
        </div>
        <Scripts {project}></Scripts>
    </div>
    <!-- <ProjectCardDropdown {_state} {project} /> -->
</div>

<style>
    p {
        margin: 0;
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }
</style>
