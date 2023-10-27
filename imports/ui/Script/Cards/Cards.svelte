<script>
    import { Meteor } from "meteor/meteor";

    import { updateEditor } from "./Card/Editor/editorHelpers/updateEditor";
    import { cardMetaHelpers } from "/imports/code/cardMetaHelpers";
    import { insertClientCard } from "/imports/code/insertClientCard";
    import "/imports/code/collectionHooksClient.js";

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

    // watch for changes to card.text and update views in other windows - DISABLED
    onMount(() => {
        observer = CardsCollection.find().observe({
            changed: function (newCard, oldCard) {
                if (newCard.text == oldCard.text) return;
                const _id = newCard._id;
                if ($_state.sessionId != newCard.sessionId) {
                    const editor = document.getElementById("pm-" + _id).instance;
                    updateEditor(newCard.text, editor);
                    cardMetaHelpers.setMeta(newCard);
                }
            },
            added: (doc) => {
                // console.log("add card");
                insertClientCard(doc);
            },
        });
    });

    // DISABLED
    onDestroy(() => {
        observer.stop();
    });

    window.CardsCollection = CardsCollection;
</script>

<div class="xx">
    <div class="grid p-3">
        {#each cards as card (card._id)}
            <Card {card} {_state} {script} {cardsCount} />
        {/each}
    </div>
</div>
<NewCardButton {script} {cardsCount} />

<style>
    .xx {
        width: 100%;
        height: 100%;
        overflow: scroll;
        /* border: 5px solid yellow !important; */
    }
    .grid {
        max-width: 800px;
        margin: auto;
        overflow: hidden !important;
        /* border: 5px solid yellow; */

        /* display: grid;
        grid-gap: 7px;
        grid-auto-rows: 230px;
        grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); */
    }
</style>
