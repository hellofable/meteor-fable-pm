<script>
    export let _state, meta;
    import { Route, router } from "tinro";

    import { ProjectsCollection } from "/imports/api/projects";
    import Script from "../Script/Script.svelte";
    import { onMount, onDestroy } from "svelte";

    let project = {};
    $m: Meteor.subscribe("projects.one", meta.params.pid);
    $m: {
        project = ProjectsCollection.findOne(meta.params.pid);
        // $_state.current.project = project;
    }

    onDestroy(() => {
        // $_state.current.project.title = "";
    });
</script>

<div class="d-flex">
    <div class="d-flex flex-column w-100">
        <Route path="/script/:sid" let:meta>
            <Script {_state} {meta} />
        </Route>
    </div>
</div>
