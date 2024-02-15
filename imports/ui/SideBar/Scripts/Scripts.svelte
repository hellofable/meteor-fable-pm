<script>
    import { onMount, onDestroy } from "svelte";
    import { ScriptsCollection } from "/imports/api/scripts";

    import NewScriptButton from "./NewScriptButton.svelte";
    import ScriptCard from "./ScriptCard.svelte";

    export let _state, meta;

    $m: Meteor.subscribe("scripts.project", meta.params.pid);
    $m: scripts = ScriptsCollection.find({});
</script>

<div id="scripts-wrapper" class="mx-2">
    {#each $scripts as script, i}
        <ScriptCard {script} {_state} {meta} />
    {/each}
    <div class="mt-2"><NewScriptButton {_state} {meta} /></div>
</div>

<style>
    .scripts-grid {
        display: grid;
        grid-gap: 7px;
        grid-auto-rows: 230px;
        grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    }
</style>
