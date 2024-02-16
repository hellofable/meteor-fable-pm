<script>
    export let _state, meta;
    import NavBar from "../NavBar/NavBar.svelte";
    import SideBar from "../SideBar/SideBar.svelte";
    import { ProjectsCollection } from "/imports/api/projects";
    import { onMount, onDestroy } from "svelte";

    let project = {};
    $m: Meteor.subscribe("projects.one", meta.params.pid);
    $m: {
        project = ProjectsCollection.findOne(meta.params.pid);
        $_state.current.project = project;
    }

    onDestroy(() => {
        $_state.current.project.title = "";
    });
</script>

<div class="d-flex">
    <SideBar {_state} {meta}></SideBar>
    <div class="d-flex flex-column w-100">
        <NavBar {_state} {meta}></NavBar>
        <div>I am the project - {project?.title}</div>
    </div>
</div>
