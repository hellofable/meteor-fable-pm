<script>
    import { onMount, onDestroy } from "svelte";
    import { ScriptsCollection } from "/imports/api/scripts";

    import NewScriptButton from "./NewScriptButton.svelte";
    import ScriptCard from "./ScriptCard.svelte";

    export let _state, project;

    $m: Meteor.subscribe("scripts.project", project._id);
    $m: scripts = ScriptsCollection.find({ projectId: project._id });
</script>

<div id="scripts-wrapper" class="mx-2">
    {#each $scripts as script, i}
        <ScriptCard {script} {_state} />
    {/each}
</div>
