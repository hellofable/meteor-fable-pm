<script>
    import { onMount } from "svelte";
    export let card, _state, script, cardsCount;
    import Editor from "./Editor/Editor.svelte";
    import { CardsClientCollection } from "/imports/api/cardsClient";
    import CardDropdown from "./CardDropdown.svelte";

    let cardClient;
    $m: cardClient = CardsClientCollection.findOne(card._id);

    import CardClientJson from "./CardClientJSON.svelte";
</script>

<div class:is-section={cardClient?.isSection} class="card p-2 pb-3 border-0">
    <CardClientJson {cardClient} />
    <!-- {cardClient.collapsed} - {cardClient.collapsedSidebar} -->
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
        grid-column-start: 1;
        grid-column-end: -1;
    }
</style>
