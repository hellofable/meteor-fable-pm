<script>
    export let script, _state, meta;
    // import ProjectCardDropdown from "./ProjectCardDropdown.svelte";
    import { router } from "tinro";

    function openScript(evt) {
        router.goto(`/project/${script.projectId}/script/${script._id}`);
    }
</script>

<span on:click={openScript} class="badge me-2 text-bg-secondary">{script.title}</span>

<style>
    .badge {
        cursor: pointer;
        color: rgb(195, 195, 195) !important;
    }
</style>
