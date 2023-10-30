<script>
    import { Meteor } from "meteor/meteor";

    import "../../../code/clientCards/collectionHooksClient.js";
    import { createObserver } from "/imports/code/clientCards/collectionHooksClient";
    // collections
    import { CardsCollection } from "../../../api/cards";
    import { CardsClientCollection } from "/imports/api/cardsClient";

    // vars
    export let script, _state;
    let cards, observer;

    // templates
    import Card from "./Card/Card.svelte";

    import { onMount, onDestroy } from "svelte";
    import NewCardButton from "./NewCardButton.svelte";

    CardsClientCollection.remove({});
    $m: handle = Meteor.subscribe("cards.script", script._id);

    // reactive statement to keep track of # of cards

    $m: cardsCount = CardsCollection.find({ scriptId: script._id }, { sort: { index: 1 } }).count();
    $m: cards = CardsCollection.find({ scriptId: script._id }, { sort: { index: 1 } }).fetch();

    // watch for changes to card.text and update views in other windows
    onMount(() => {
        observer = createObserver($_state.sessionId);
    });

    // DISABLED
    onDestroy(() => {
        observer.stop();
    });

    window.CardsCollection = CardsCollection;
</script>

<div class="wrapper">
    <div class="cards px-2 pt-2">
        {#each cards as card (card._id)}
            <Card {card} {_state} {script} {cardsCount} />
        {/each}
    </div>
    <div class="ps-2 mt-2">
        <NewCardButton {script} {cardsCount} />
    </div>
</div>

<style>
    .wrapper {
        width: 100%;
        height: 100%;
        overflow: scroll;
        /* border: 5px solid yellow !important; */
    }
    .cards {
        /* max-width: 800px;
        margin: auto;
        overflow: hidden !important; */
        /* border: 5px solid yellow; */

        /* display: grid;
        grid-gap: 7px;
        grid-auto-rows: 230px;
        grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); */
    }
</style>
