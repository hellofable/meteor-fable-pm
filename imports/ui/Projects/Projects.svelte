<script>
    import { onMount, onDestroy } from "svelte";
    import { ProjectsCollection } from "/imports/api/projects";
    import NavBar from "../NavBar/NavBar.svelte";
    import NewProjectButton from "./NewProjectButton.svelte";
    import ProjectCard from "./ProjectCard.svelte";

    export let _state;

    $m: Meteor.subscribe("projects.all");
    $m: projects = ProjectsCollection.find({});
</script>

<div class="mx-2">
    {#each $projects as project, i}
        <ProjectCard {project} {_state} />
    {/each}
    <div class=""><NewProjectButton {_state} /></div>
</div>

<style>
</style>
