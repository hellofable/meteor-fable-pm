<script>
    import { onMount } from "svelte";
    export let card, _state, script;
    import Editor from "./Editor/Editor.svelte";
    import { CardsClientCollection } from "/imports/api/cardsClient";
    import CardDropdown from "./CardDropdown.svelte";

    let cardClient;
    $m: cardClient = CardsClientCollection.findOne(card._id);
</script>

<div class:is-section={cardClient?.isSection} class="card p-2 pb-3 mb-3 border-0 shadow-sm">
    <Editor {card} {_state} {script} />
    <CardDropdown {card} {_state} />
</div>

<style>
    .card {
        background: rgb(224, 223, 223) !important;
        /* overflow: auto; */

        position: relative;
    }

    .is-section {
        background: #b1cb95 !important;
    }
</style>
