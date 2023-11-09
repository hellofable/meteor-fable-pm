<script>
    import { onMount, onDestroy } from "svelte";
    import { ScriptsCollection } from "/imports/api/scripts";

    import NewScriptButton from "./NewScriptButton.svelte";
    import ScriptCard from "./ScriptCard.svelte";

    export let _state, meta;

    $m: Meteor.subscribe("scripts.all");
    $m: scripts = ScriptsCollection.find({});

    $_state.sidebar.show = false;
</script>

<div class="m-2">
    <div class="scripts-grid">
        {#each $scripts as script, i}
            <ScriptCard {script} {_state} {meta} />
        {/each}
        <div class=""><NewScriptButton {_state} /></div>
    </div>
</div>

<style>
    .scripts-grid {
        display: grid;
        grid-gap: 7px;
        grid-auto-rows: 230px;
        grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    }
</style>
