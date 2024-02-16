<script>
    import { onMount, onDestroy } from "svelte";
    import { ProjectsCollection } from "/imports/api/projects";
    import NavBar from "../NavBar/NavBar.svelte";
    import NewProjectButton from "./NewProjectButton.svelte";
    import ProjectCard from "./ProjectCard.svelte";

    export let _state, meta;

    $m: Meteor.subscribe("projects.all");
    $m: projects = ProjectsCollection.find({});
</script>

<NavBar {meta} {_state} />
<div id="projects-wrapper" class="m-2">
    <div class="projects-grid">
        {#each $projects as project, i}
            <ProjectCard {project} {_state} {meta} />
        {/each}
        <div class=""><NewProjectButton {_state} /></div>
    </div>
</div>

<style>
    .projects-grid {
        display: grid;
        grid-gap: 7px;
        grid-auto-rows: 230px;
        grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    }
</style>
