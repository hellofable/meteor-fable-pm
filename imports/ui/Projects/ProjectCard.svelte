<script>
    export let project, _state, meta;
    // import ProjectCardDropdown from "./ProjectCardDropdown.svelte";
    import { router } from "tinro";

    function openScript(evt) {
        router.goto(`/project/${project._id}`);
    }
</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="project-card border-0 p-3">
    <div on:click={openScript} class="card-body">
        <div class="d-flex w-100">
            <div class="card-title h4">
                {project.title}
            </div>
            <div class="flex-grow-1 text-end h4" />
        </div>
        <p class="card-text small project-synopsis rounded mb-2">{project.synopsis}</p>
        <div class="text-end d-none">
            <a class="project-link" href="/project/project/{project._id}">
                <i class="bi bi-arrow-right-circle-fill" /></a
            >
        </div>
    </div>
    <!-- <ProjectCardDropdown {_state} {project} /> -->
</div>

<style>
    .project-synopsis {
        /* background: rgb(231, 245, 220); */
        color: rgb(55, 55, 55);
        box-shadow: none !important;
    }

    .project-link {
        font-size: 24px;
    }

    .card-text {
        height: 125px;
        overflow: auto;
    }

    .project-card {
        cursor: pointer;
    }

    p {
        margin: 0;
    }
</style>
