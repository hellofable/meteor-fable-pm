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
    $: {
        const handle = Meteor.subscribe("cards.script", script._id);
    }

    // reactive statement to keep track of # of cards
    $m: cardsCount = CardsCollection.find().count();

    $m: cards = CardsCollection.find({ scriptId: script._id }, { sort: { index: 1 } }).fetch();

    // watch for changes to card.text and update views in other windows - DISABLED
    onMount(() => {
        observer = CardsCollection.find().observe({
            changed: function (newDocument, oldDocument) {
                if (newDocument.text == oldDocument.text) return;
                const _id = newDocument._id;
                if ($_state.sessionId != newDocument.sessionId) {
                    const editor = document.getElementById("pm-" + _id).instance;
                    updateEditor(newDocument.text, editor);
                    cardMetaHelpers.setMeta(newDocument);
                }
            },
            added: (doc) => {
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

<div class="grid">
    {#each cards as card (card._id)}
        <Card {card} {_state} {script} />
    {/each}
</div>

<NewCardButton {script} {cardsCount} />

<style>
    .grid {
        max-width: 800px;
        margin: auto;

        /* display: grid;
        grid-gap: 7px;
        grid-auto-rows: 230px;
        grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); */
    }
</style>
