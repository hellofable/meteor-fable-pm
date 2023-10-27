<script>
    export let _state, meta;

    import BrowserCard from "./BrowserCard/BrowserCard.svelte";
    import BrowserOptions from "./BrowserOptions/BrowserOptions.svelte";
    import BrowserOptionsToggle from "./BrowserOptionsToggle.svelte";
    import { CardsCollection } from "/imports/api/cards";

    $: cards = CardsCollection.find({}, { sort: { index: 1 } });

    // $: console.log($cards);
</script>

<div class="d-flex flex-column h-100">
    <BrowserOptions {_state} />
    <div class="mx-2"><BrowserOptionsToggle {_state} /></div>
    <!-- <CollapseToggles /> -->
    <div class="browser-cards flex-grow-1 px-2 pt-2">
        {#each $cards as card, i (card._id)}
            <BrowserCard {card} {_state} {meta} />
        {/each}
    </div>
</div>

<style>
    .d-flex {
        /* border: 5px solid green; */
    }
    .browser-cards {
        /* border: 5px solid blue; */
        overflow-y: auto;
        padding-bottom: 300px;
        /* padding-top: 150px; */
    }
</style>
