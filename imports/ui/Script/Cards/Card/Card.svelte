<script>
    import { onMount } from "svelte";
    export let card, _state, script, cardsCount;
    import Editor from "./Editor/Editor.svelte";
    import { CardsClientCollection } from "/imports/api/cardsClient";
    import CardDropdown from "./CardDropdown.svelte";

    let cardClient;
    $m: cardClient = CardsClientCollection.findOne(card._id);

    import CardClientJson from "./CardClientJSON.svelte";
    let hasFocus = false;
    $: {
        hasFocus = $_state.current.card._id === card._id ? true : false;
    }
</script>

<div class:has-focus={hasFocus} id="card-{card._id}" class:is-section={cardClient?.isSection} class="fable-card">
    <!-- <CardClientJson {cardClient} /> -->
    <!-- {cardClient.collapsed} - {cardClient.collapsedSidebar} -->
    <div class="card-anchor" id="card-anchor-{card._id}">&nbsp;</div>
    <Editor {card} {_state} {script} />
    <CardDropdown {card} {_state} />
</div>

<style>
    .card-anchor {
        position: absolute;
        top: -100px;
        border: 10px solid;
        width: 200px;
        opacity: 0;
        z-index: -2;
    }
</style>
