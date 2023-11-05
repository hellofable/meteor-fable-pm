<script>
    export let _state, meta;

    import BrowserCard from "./BrowserCard/BrowserCard.svelte";

    import { CardsClientCollection } from "/imports/api/cardsClient";

    $: cards = CardsClientCollection.find({}, { sort: { index: 1 } });

    // $: console.log($cards);
</script>

<div class="d-flex flex-column h-100">
    <!-- <CollapseToggles /> -->
    <div class="browser-cards flex-grow-1 px-2">
        {#each $cards as card, i (card._id)}
            <BrowserCard {card} {_state} {meta} />
        {/each}
    </div>
</div>

<style>
    .browser-cards {
        overflow-y: auto;
        padding-bottom: 300px;
    }
</style>
