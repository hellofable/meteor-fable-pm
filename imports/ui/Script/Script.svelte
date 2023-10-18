<script>
    export let scriptId, _state;
    import { ScriptsCollection } from "../../api/scripts";
    import Cards from "./Cards/Cards.svelte";
    import { onMount, onDestroy } from "svelte";

    let script;
    $m: Meteor.subscribe("scripts.one", scriptId);
    $m: script = ScriptsCollection.findOne(scriptId);

    Meteor.call("cards.getAll", scriptId, (error, result) => {
        if (error) {
            console.error("Error calling getValueFromServer:", error);
        } else {
            // createClientCards(result);
            // console.log("Value from server:", result);
        }
    });
</script>

{#if script}
    <Cards {script} {_state} />
{/if}
