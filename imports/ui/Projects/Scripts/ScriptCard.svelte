<script>
    export let script, _state, meta;
    // import ProjectCardDropdown from "./ProjectCardDropdown.svelte";
    import { router } from "tinro";

    function openScript(evt) {
        router.goto(`/project/${script.projectId}/script/${script._id}`);
    }
</script>

<a on:click={openScript} class="project-link me-2">{script.title}</a>

<style>
    a {
        text-decoration: none;
        cursor: pointer;
    }
</style>
